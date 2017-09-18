import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { Object1ListPage } from './object1-list';

@NgModule({
  declarations: [
    Object1ListPage,
  ],
  imports: [
    IonicPageModule.forChild(Object1ListPage),
  ],
  exports: [
    Object1ListPage
  ]
})

export class Object1ListPageModule {}
