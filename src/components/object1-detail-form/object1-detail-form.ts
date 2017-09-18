import { Component, Input } from '@angular/core';
import { Object1Model } from '../object1-model';
@Component({
  selector: 'object1-detail-form',
  templateUrl: 'object1-detail-form.html'
})
export class Object1DetailFormComponent {
  @Input() object1: Object1Model = null;
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
