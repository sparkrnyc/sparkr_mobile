import { Component, Input } from '@angular/core';
import { FeedModel } from '../feed-model';
@Component({
  selector: 'feed-detail-form',
  templateUrl: 'feed-detail-form.html'
})
export class FeedDetailFormComponent {
  @Input() feed: FeedModel = null;
  edit: boolean = null;
  constructor() {
    this.edit = false;
  }
  onClicked(toggle){
    if(this.edit==true){
    }
    this.edit = toggle;
  }
  onSubmit(formValue: any){
    console.log(formValue);
  }
}
