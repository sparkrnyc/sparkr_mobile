import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { User1ListPage } from './user1-list';

@NgModule({
  declarations: [
    User1ListPage,
  ],
  imports: [
    IonicPageModule.forChild(User1ListPage),
  ],
  exports: [
    User1ListPage
  ]
})

export class User1ListPageModule {}
