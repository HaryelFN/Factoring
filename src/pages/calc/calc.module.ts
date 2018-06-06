import { NgModule } from '@angular/core';
import { IonicPageModule, Option } from 'ionic-angular';
import { CalcPage } from './calc';

import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    CalcPage,
  ],
  imports: [
    IonicPageModule.forChild(CalcPage),
    BrMaskerModule
  ],
})
export class CalcPageModule { }
