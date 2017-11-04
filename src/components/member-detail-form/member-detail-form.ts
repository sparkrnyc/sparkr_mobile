import { Component, Input } from '@angular/core';
import { MemberModel } from '../member-model';
import { TeamModel } from '../team-model';

@Component({
  selector: 'member-detail-form',
  templateUrl: 'member-detail-form.html'
})

export class MemberDetailFormComponent {
  @Input() member: MemberModel = null;
  @Input() team: TeamModel = null;
  
  constructor( ){ 
    console.log("constructor.team: ", this.team);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad.team: ", this.team);
  }
  
  /**
   * Handle form clicks in the parent component
   * See pages/member/member-detail.ts
   */
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
