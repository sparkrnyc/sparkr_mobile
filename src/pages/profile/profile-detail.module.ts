import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileDetailPage } from './profile-detail';

@NgModule({
  declarations: [
    ProfileDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileDetailPage),
  ],
  exports: [
    ProfileDetailPage
  ]
})
export class ProfileDetailPageModule {}
