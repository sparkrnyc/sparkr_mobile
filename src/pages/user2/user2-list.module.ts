import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { User2ListPage } from './user2-list';

@NgModule({
  declarations: [
    User2ListPage,
  ],
  imports: [
    IonicPageModule.forChild(User2ListPage),
  ],
  exports: [
    User2ListPage
  ]
})

export class User2ListPageModule {}
