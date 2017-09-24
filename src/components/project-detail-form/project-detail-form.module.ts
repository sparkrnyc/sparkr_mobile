import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectDetailFormComponent } from './project-detail-form';

@NgModule({
  declarations: [
    ProjectDetailFormComponent,
  ],
  imports: [
    IonicPageModule.forChild(ProjectDetailFormComponent),
  ],
  exports: [
    ProjectDetailFormComponent
  ]
})
export class ProjectDetailFormComponentModule {}
