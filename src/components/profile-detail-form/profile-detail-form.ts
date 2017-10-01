import { Component, Input } from '@angular/core';
import { ProfileModel } from '../profile-model';

@Component({
  selector: 'profile-detail-form',
  templateUrl: 'profile-detail-form.html'
})
export class ProfileDetailFormComponent {
  @Input() profile: ProfileModel = null;
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
