import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashBordPage } from './dash-bord';

@NgModule({
  declarations: [
    DashBordPage,
  ],
  imports: [
    IonicPageModule.forChild(DashBordPage),
  ],
})
export class DashBordPageModule {}
