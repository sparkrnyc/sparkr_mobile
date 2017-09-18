import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { User2DetailFormComponent } from './user2-detail-form';

@NgModule({
  declarations: [
    User2DetailFormComponent,
  ],
  imports: [
    IonicPageModule.forChild(User2DetailFormComponent),
  ],
  exports: [
    User2DetailFormComponent
  ]
})
export class User2DetailFormComponentModule {}
