import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GlobalService } from '../../providers/global/global.service';
import { ClienteService } from './../../providers/cliente.service';
import { Client } from '../../models/client.model';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html',
})
export class ClientsPage {

  private segment: string;
  private clientForm: FormGroup;
  private uid: string;
  clients$: Observable<Client[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private global: GlobalService,
    public toastCtrl: ToastController,
    private clientService: ClienteService) {

    this.segment = 'list';

    this.clientForm = this.formBuilder.group({
      cpf: ['', Validators.required],
      nome: ['', Validators.required],
      telefone: [''],
      email: [''],
      endereco: [''],
      obs: ['']
    });

    if (typeof this.navParams.get("user") == "undefined") {
      this.global.getCurrentUser().then((user) => {
        if (user) {
          this.uid = user.uid;
          this.clients$ = this.clientService.getCollection$(this.uid, ref =>(ref.orderBy('nome')));
        } else {
          this.navCtrl.setRoot('HomePage');
        }
      });
    } else {
      var user = this.navParams.get("user");
      this.uid = user.uid;
      this.clients$ = this.clientService.getCollection$(this.uid);
    }
  }

  ionViewDidLoad() {

  }

  add() {
    const id = this.uid;
    const cpf = this.clientForm.get('cpf').value;
    const nome = this.clientForm.get('nome').value;
    const telefone = this.clientForm.get('telefone').value;
    const email = this.clientForm.get('email').value;
    const endereco = this.clientForm.get('endereco').value;
    const obs = this.clientForm.get('obs').value;

    this.clientService.add(this.uid, { cpf, nome, telefone, email, endereco, obs }).then(t => {
      this.clientForm.reset();
      this.showMessage("Cliente salvo com sucesso.");
    });
  }

  detailClient(c: Client) {
    if (this.uid != null && c != null) {
      this.navCtrl.push("ClientDetailPage", {
        uid: this.uid,
        clientDetail: c
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

  hideButton(): boolean {
    if (this.segment === "list") {
      return true;
    }
  }

}
