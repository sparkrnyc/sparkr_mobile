import { Component, Input } from '@angular/core';
import { ProfileModel } from '../profile-model';

@Component({
  selector: 'profile-detail-form',
  templateUrl: 'profile-detail-form.html'
})
export class ProfileDetailFormComponent {
  @Input() profile: ProfileModel = null;
  @Input() edit: boolean = null;
  constructor( ){  }

  onClicked(toggle){
    if(this.edit==true){
    }
    this.edit = toggle;
  }
  inviteClicked(){
    // get currentUser, 
    // create an invitations table w 'id, invitor, invitee, team, status'
    console.log("inviteClicked");
  }
  teamDetailClicked(){
    console.log("teamDetailClicked");
  }
  connectionListClicked(){
    console.log("connectionListClicked");
  }
  onSubmit(formValue: any){
    console.log(formValue);
  }
}
