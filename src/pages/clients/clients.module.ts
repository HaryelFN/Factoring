import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientsPage } from './clients';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    ClientsPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientsPage),
    BrMaskerModule
  ],
})
export class ClientsPageModule {}
