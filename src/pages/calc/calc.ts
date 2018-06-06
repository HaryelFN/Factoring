import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GlobalService } from '../../providers/global/global.service';
import { ClienteService } from './../../providers/cliente.service';
import { Observable } from 'rxjs/Observable';
import { Icheque } from '../../models/icheque.model';
import { Cheque } from './../../models/cheque.model';
import { Iemprestimo } from './../../models/iemprestimo.model';
import { Emprestimo } from './../../models/emprestimo.model';

@IonicPage()
@Component({
  selector: 'page-calc',
  templateUrl: 'calc.html',
})
export class CalcPage {

  private segment: string;
  private chequeForm: FormGroup;
  private uid: string;

  private tx_juros: number;
  private cheques: Array<Icheque>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    private global: GlobalService) {

    this.segment = 'list';
    this.cheques = [];
    this.tx_juros = 0;

    this.chequeForm = this.formBuilder.group({
      valor: ['', Validators.required],
      bom_para: ['', Validators.required],
      cruzado: [false]
    });


    if (typeof this.navParams.get("user") == "undefined") {

      this.global.getCurrentUser().then((user) => {
        if (user) {
          //LOGICA APOS LOGIN...

        } else {
          this.navCtrl.setRoot('HomePage');
        }
      });

    } else {
      var user = this.navParams.get("user");
      this.uid = user.uid;

      //LOGICA APOS LOGIN...

    }
  }

  ionViewDidLoad() {
    this.cheques = [];
  }

  addCheque() {

    let cheque = new Cheque();

    cheque.valor = this.chequeForm.get('valor').value;
    cheque.data = this.chequeForm.get('bom_para').value;
    cheque.cruzado = this.chequeForm.get('cruzado').value;
    cheque.descontado = false;

    this.cheques.push(cheque);
    this.chequeForm.reset();
    this.showMessage('Cheque adicionado a lista.');
    this.segment = 'list';

  }

  save() {

    //TESTE CALC.:

    this.tx_juros = 5;

    let qtd_dias = 10;

    let valor_cheque = 1000;

    let aux = qtd_dias * (this.tx_juros / 30);

    let valor = valor_cheque - aux;

    console.log('TESTE: ' +  valor);
    

  }

  calcCheques(cheques: Array<Cheque>){
    if(cheques.length != 0){
        cheques.forEach(c =>{

        });
    }
  }

  detail(c) {

  }

  delete(id: string) {

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
    if (this.segment === "add") {
      return true;
    }

    if (this.cheques.length == 0) {
      return true;
    }
  }

}
