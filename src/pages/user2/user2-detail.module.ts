import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { User2DetailPage } from './user2-detail';

@NgModule({
  declarations: [
    User2DetailPage,
  ],
  imports: [
    IonicPageModule.forChild(User2DetailPage),
  ],
  exports: [
    User2DetailPage
  ]
})
export class User2DetailPageModule {}
