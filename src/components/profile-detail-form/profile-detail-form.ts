import { Component, Input } from '@angular/core';
import { ProfileModel } from '../profile-model';
import { TeamModel } from '../team-model';

@Component({
  selector: 'profile-detail-form',
  templateUrl: 'profile-detail-form.html'
})

export class ProfileDetailFormComponent {
  @Input() profile: ProfileModel = null;
  @Input() team: TeamModel = null;
  edit: boolean = null;

  constructor( ){ 
    console.log("constructor.team: ", this.team);
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad.team: ", this.team);
  }

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

}
