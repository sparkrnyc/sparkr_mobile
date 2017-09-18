import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationDetailFormComponent } from './notification-detail-form';

@NgModule({
  declarations: [
    NotificationDetailFormComponent,
  ],
  imports: [
    IonicPageModule.forChild(NotificationDetailFormComponent),
  ],
  exports: [
    NotificationDetailFormComponent
  ]
})
export class NotificationDetailFormComponentModule {}
