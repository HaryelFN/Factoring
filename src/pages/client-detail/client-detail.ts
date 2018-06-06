import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { ClienteService } from '../../providers/cliente.service';
import { Client } from './../../models/client.model';

@IonicPage()
@Component({
  selector: 'page-client-detail',
  templateUrl: 'client-detail.html',
})
export class ClientDetailPage {

  private uid: string;
  private clientForm: FormGroup;
  client: Client;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    private clientService: ClienteService,
    private alertCtrl: AlertController) {

    this.uid = this.navParams.get('uid');

    this.client = this.navParams.get("clientDetail");

    this.clientForm = this.formBuilder.group({
      cpf: [this.client.cpf, Validators.required],
      nome: [this.client.nome, Validators.required],
      telefone: [this.client.telefone],
      email: [this.client.email],
      endereco: [this.client.endereco],
      obs: [this.client.obs]
    });
  }

  ionViewDidLoad() {

  }

  ionViewDidLeave() {
    this.client = null;
    this.clientForm.reset();
  }

  update() {
    this.client.cpf = this.clientForm.get('cpf').value;
    this.client.nome = this.clientForm.get('nome').value;
    this.client.telefone = this.clientForm.get('telefone').value;
    this.client.email = this.clientForm.get('email').value;
    this.client.endereco = this.clientForm.get('endereco').value;
    this.client.obs = this.clientForm.get('obs').value;

    this.clientService.update(this.uid, this.client.id, this.client).then(t => {
      this.showMessage("Cliente atualizado com sucesso.");
      this.navCtrl.pop();
    });
  }

  remove() {
    let alert = this.alertCtrl.create({
      title: 'Atenção',
      message: `Deseja excluir cliente?`,
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => { }
        },
        {
          text: 'Sim',
          handler: () => {
            this.clientService.remove(this.uid, this.client.id).then(t => {
              this.showMessage("Cliente excluido com sucesso.");
              this.navCtrl.pop();
            }).catch(error => {
              this.showMessage("Erro ao excluir cliente.");
            });
          }
        }
      ]
    });
    alert.present();
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
}
