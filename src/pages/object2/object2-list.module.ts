import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { Object2ListPage } from './object2-list';

@NgModule({
  declarations: [
    Object2ListPage,
  ],
  imports: [
    IonicPageModule.forChild(Object2ListPage),
  ],
  exports: [
    Object2ListPage
  ]
})

export class Object2ListPageModule {}
