import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { User1DetailPage } from './user1-detail';

@NgModule({
  declarations: [
    User1DetailPage,
  ],
  imports: [
    IonicPageModule.forChild(User1DetailPage),
  ],
  exports: [
    User1DetailPage
  ]
})

export class User1DetailPageModule {}
