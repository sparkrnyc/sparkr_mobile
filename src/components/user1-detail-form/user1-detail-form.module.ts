import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { User1DetailFormComponent } from './user1-detail-form';

@NgModule({
  declarations: [
    User1DetailFormComponent,
  ],
  imports: [
    IonicPageModule.forChild(User1DetailFormComponent),
  ],
  exports: [
    User1DetailFormComponent
  ]
})
export class User1DetailFormComponentModule {}
