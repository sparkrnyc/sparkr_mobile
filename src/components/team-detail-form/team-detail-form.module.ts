import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeamDetailFormComponent } from './team-detail-form';

@NgModule({
  declarations: [
    TeamDetailFormComponent,
  ],
  imports: [
    IonicPageModule.forChild(TeamDetailFormComponent),
  ],
  exports: [
    TeamDetailFormComponent
  ]
})
export class TeamDetailFormComponentModule {}
