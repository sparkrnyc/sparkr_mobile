import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';

import { TeamModel } from '../../components/team-model';
import { MemberModel } from '../../components/member-model';

import { MemberDetailPage } from '../member/member-detail';
 
import { DataServiceProvider } from '../../providers/data/data-service';
import { AuthServiceProvider } from '../../providers/auth/auth-service';

@IonicPage()
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})

export class TeamDetailPage {
  team: TeamModel = null;
  teamMembers: MemberModel[] = new Array<MemberModel>();
  edit: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dataService: DataServiceProvider,
              public authService: AuthServiceProvider,
              public viewCtrl: ViewController
            ) {

    this.team = navParams.get("team");
    // populate team
    if(this.team==null){
      // a new team is being created
      this.team = new TeamModel(
                            null, 
                            null, 
                            null, 
                            null, 
                            null,
                            null
                          );
      // add currentuser as default member and teamOwner
      this.team.members = [ this.authService.loggedInUser.id ];
      this.team.teamOwnerId = this.authService.loggedInUser.id;
      this.edit = true;
    }else{
      // existing team
      console.log("member with existing team");
      this.edit = false;
    }
    // 
    this.displayMembersNames();
  }

  displayMembersNames(){

    console.log("displayMembersNames");
    console.log("this.selectedTeam.members:", this.team.members);
    if(this.team.members==null || this.team.members.length==0){
      console.log("No members found");
    }else if(this.team.members.length==1){
      
      console.log("1 member");
      this.dataService.getMemberById(this.team.members[0])
      .then( (m) => {
        this.teamMembers.push(m);
        console.log("teamMembers",this.teamMembers);
      },
      (error) => {
        console.log("error: " + error);
      });
      
    }else{
      console.log("More than 1 member, gives error");
      // ERROR
      this.dataService.getMembersByIds(this.team.members)
      .then( (members) => {
        this.teamMembers = members;
      },
      (error) => {
        console.log("error: " + error);
      });
    }

  }

  onSaveEditButtonClicked(toggle){
    if(this.edit==true){
      console.log("Team", this.team);
      if(this.team.id==null){
        console.log("Create Team");
        this.dataService.createTeam(this.team)
        .then( (team) => {
          this.team = team;
          this.viewCtrl.dismiss();
        },
        (error) => {
          console.log("error: "+ error);
        }); 
      }else{
        console.log("Update Team");
        this.dataService.updateTeam(this.team)
        .then( (team) => {
          this.team = team;
        },
        (error) => {
          console.log("error: "+ error);
        }); 
      }
      

    }else{
      console.log("Edit Team");
    }
    this.edit = toggle;
  }

  onMemberDetailSelect(member){
    var navLength = this.navCtrl.length();
    if(navLength>0){
      this.navCtrl.remove(0, navLength-1);
    }
    console.log("navLength", navLength);
    this.navCtrl.setRoot(MemberDetailPage, { 'member' : member });
  }
}
