import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { Object1DetailPage } from './object1-detail';

@NgModule({
  declarations: [
    Object1DetailPage,
  ],
  imports: [
    IonicPageModule.forChild(Object1DetailPage),
  ],
  exports: [
    Object1DetailPage
  ]
})

export class Object1DetailPageModule {}
