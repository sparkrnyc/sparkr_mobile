import { Component, Input } from '@angular/core';
import { User2Model } from '../user2-model';
@Component({
  selector: 'user2-detail-form',
  templateUrl: 'user2-detail-form.html'
})
export class User2DetailFormComponent {
  @Input() user2: User2Model = null;
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
