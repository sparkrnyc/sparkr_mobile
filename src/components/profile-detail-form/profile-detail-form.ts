import { Component, Input } from '@angular/core';
import { ProfileModel } from '../profile-model';

@Component({
  selector: 'profile-detail-form',
  templateUrl: 'profile-detail-form.html'
})
export class ProfileDetailFormComponent {
  @Input() profile: ProfileModel = null;
  @Input() edit: boolean = null;
  constructor() {
    if(this.profile==null || this.profile.id==null){
      // create new profile
    } else {

    } 
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
