import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
})
export class ForgotPage {

  private user: FormGroup;
  private loading: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private afAuth: AngularFireAuth,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController) {
    this.user = this.formBuilder.group({
      email: ['', Validators.email]
    });
  }

  ionViewDidLoad() {
    
  }

  resetPassword() {
    this.presentLoading();
    this.afAuth.auth.sendPasswordResetEmail(this.user.value.email).then(() => {
      this.loading.dismiss();
      this.showMessage("Um email foi enviado para resetar sua senha, caso não encontre verifique na caixa de spam.");
    }).catch(error => {
      this.loading.dismiss();
      this.showMessage(error);
    });
  }

  showMessage(m) {
    let toast = this.toastCtrl.create({
      message: m,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Carregando..',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

}
