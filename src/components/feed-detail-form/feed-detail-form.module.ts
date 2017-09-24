import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedDetailFormComponent } from './feed-detail-form';

@NgModule({
  declarations: [
    FeedDetailFormComponent,
  ],
  imports: [
    IonicPageModule.forChild(FeedDetailFormComponent),
  ],
  exports: [
    FeedDetailFormComponent
  ]
})
export class FeedDetailFormComponentModule {}
