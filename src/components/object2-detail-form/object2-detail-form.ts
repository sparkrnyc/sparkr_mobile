import { Component, Input } from '@angular/core';
import { Object2Model } from '../object2-model';
@Component({
  selector: 'object2-detail-form',
  templateUrl: 'object2-detail-form.html'
})
export class Object2DetailFormComponent {
  @Input() object2: Object2Model = null;
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
