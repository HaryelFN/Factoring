import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController, Platform, IonicPage } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { UserService } from './../../../providers/user.service';
import { User } from './../../../models/user.model';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  private form: FormGroup;
  private loading: any;

  constructor(
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private platform: Platform,
    private fb: Facebook,
    private googlePlus: GooglePlus,
    private userService: UserService
  ) {

    this.form = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
      password_confirm: ['', Validators.required],
    });
  }

  createUserWithEmailAndPass() {
    this.presentLoading();
    this.afAuth.auth.createUserWithEmailAndPassword(this.form.value.email, this.form.value.password).then(res => {

      let user = new User();

      //user.tipo = 'free';

      this.userService.add(res.uid, user).then(() => {
        this.showMessage('Usuário cadastrado com sucesso!');
        this.loading.dismiss();

        this.openPage('CalcPage');

      }).catch(error => {
        console.log('Error ao inserir usuario na base de dados');
      });

    }).catch(error => {
      this.loading.dismiss();
      this.showMessage(error);
      console.log(error);
    });
  }

  signInWithFacebook() {
    if (this.platform.is('cordova')) {
      this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebookCredential);
      })
    }
    else {
      this.presentLoading();
      this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(res => {
        this.loading.dismiss();
      }).catch(error => {
        this.loading.dismiss();
        console.log(error);
        this.showMessage("Falha na autenticação com o facebook, por favor, tente novamente.");
      });
    }
  }

  signInWithGoogle() {
    this.presentLoading();
    if (this.platform.is('cordova')) {
      this.googlePlus.login({
        'webClientId': '140194066788-evp1fmu00njk39jg6q5gegilfvoiqski.apps.googleusercontent.com',
        'offline': true
      }).then(res => {
        this.loading.dismiss();
        const googleCredential = firebase.auth.GoogleAuthProvider.credential(res.idToken);
        firebase.auth().signInWithCredential(googleCredential);
      }).catch(err => {
        this.loading.dismiss();
        this.showMessage("Falha na autenticação com o google, por favor, tente novamente.");
      });

    } else {
      this.afAuth.auth
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(res => {
          this.loading.dismiss();
        }).catch(error => {
          this.loading.dismiss();
          console.log(error);
          this.showMessage("Falha na autenticação com o google, por favor, tente novamente.");
        });
    }
  }

  showMessage(m) {
    let toast = this.toastCtrl.create({
      message: m,
      showCloseButton: true,
      closeButtonText: 'Ok',
      duration: 3000
    });
    toast.present();
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  openPage(page) {
    this.navCtrl.push(page);
  }
}