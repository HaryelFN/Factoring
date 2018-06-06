import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  private signinForm: FormGroup;
  private loading: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private afAuth: AngularFireAuth,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
  ) {

    this.signinForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }

  ionViewDidLoad() {

  }

  onSignup(): void {
    this.openPage('SignupPage');
  }

  signInWithEmailAndPass() {
    this.presentLoading();
    this.afAuth.auth.signInWithEmailAndPassword(this.signinForm.value.email, this.signinForm.value.password)
      .then(res => {
        this.loading.dismiss();
      }).catch(error => {
        this.loading.dismiss();
        console.log(error);
        this.showMessage("Usuário ou senha não reconhecidos, por favor, tente novamente. ");
      });
  }

  signInWithFacebook() {
    this.presentLoading();
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res => {
        this.loading.dismiss();
      }).catch(error => {
        this.loading.dismiss();
        console.log(error);
        this.showMessage("Falha na autenticação com o facebook, por favor, tente novamente.");
      });
  }

  signInWithGoogle() {
    this.presentLoading();
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
