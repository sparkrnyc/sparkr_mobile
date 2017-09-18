import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Object2DetailFormComponent } from './object2-detail-form';

@NgModule({
  declarations: [
    Object2DetailFormComponent,
  ],
  imports: [
    IonicPageModule.forChild(Object2DetailFormComponent),
  ],
  exports: [
    Object2DetailFormComponent
  ]
})
export class Object2DetailFormComponentModule {}
