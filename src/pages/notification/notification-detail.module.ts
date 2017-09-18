import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationDetailPage } from './notification-detail';

@NgModule({
  declarations: [
    NotificationDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationDetailPage),
  ],
  exports: [
    NotificationDetailPage
  ]
})
export class NotificationDetailPageModule {}
