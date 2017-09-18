import { Component, Input } from '@angular/core';
import { User1Model } from '../user1-model';
@Component({
  selector: 'user1-detail-form',
  templateUrl: 'user1-detail-form.html'
})
export class User1DetailFormComponent {
  @Input() user1: User1Model = null;
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
