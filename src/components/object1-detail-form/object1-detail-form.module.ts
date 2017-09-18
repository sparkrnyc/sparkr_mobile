import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Object1DetailFormComponent } from './object1-detail-form';

@NgModule({
  declarations: [
    Object1DetailFormComponent,
  ],
  imports: [
    IonicPageModule.forChild(Object1DetailFormComponent),
  ],
  exports: [
    Object1DetailFormComponent
  ]
})
export class Object1DetailFormComponentModule {}
