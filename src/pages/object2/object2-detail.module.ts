import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { Object2DetailPage } from './object2-detail';

@NgModule({
  declarations: [
    Object2DetailPage,
  ],
  imports: [
    IonicPageModule.forChild(Object2DetailPage),
  ],
  exports: [
    Object2DetailPage
  ]
})

export class Object2DetailPageModule {}
