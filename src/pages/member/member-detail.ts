import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams, MenuController,
         LoadingController, ModalController, AlertController } from 'ionic-angular';

import { MemberModel } from '../../components/member-model';
import { TeamModel } from '../../components/team-model';
import { RequestModel } from '../../components/request-model';

import { TeamListPage } from '../team/team-list';
import { TeamDetailPage } from '../team/team-detail';

import { DataServiceProvider } from '../../providers/data/data-service';
import { AuthServiceProvider } from '../../providers/auth/auth-service';

@IonicPage()
@Component({
  selector: 'page-member-detail',
  templateUrl: 'member-detail.html',
})

export class MemberDetailPage {
  
  roleOptions: string[] = [
    "Developer", "Designer", "Marketer", "Business"
    ];
  member: MemberModel = null;
  team: TeamModel = null;
  teamMates: MemberModel[] = new Array<MemberModel>();
  
  edit: boolean = null;
  isCurrentUser: boolean = false;
  // join another team requests
  jointeamrequests: RequestModel[] = null;
  // invite to join this member's team
  inviterequests: RequestModel[] = null;
  request: RequestModel = null;

  // permissions
  canInvite: boolean = true;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams,
              public dataService: DataServiceProvider,
              public authService: AuthServiceProvider,
              public menuCtrl: MenuController,
              public loadingCtrl: LoadingController,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController
            ) {

    this.member = navParams.get("member");
    this.request = navParams.get("request");

    menuCtrl.enable(true);
    
    // if a user is logged in
    var currentUser = authService.currentUser();  

    if(this.member==null && currentUser==null){
    // never happen because new users are created only via signup
    }else if(this.member==null && currentUser!=null) {
      // currentUser member, via homepage tab
      this.isCurrentUser = true;
      this.member = currentUser;
      this.loadTeam();
    }else if(this.member!=null && currentUser!=null) {
      // currentuser member, via member link
      if(this.member.id==currentUser.id){
        this.isCurrentUser = true;
      }
      this.loadTeam();
    }else{
      // non-currentuser via member link
      this.loadTeam();
    }

    if(this.request){
      console.log("request:", this.request);
      if(this.request.member==null){
        // request has no member, hence someone is finding members to invite
        // finding members

      }
    }
    
    // canInvite
    if(this.isCurrentUser){
      // you cannot invite yourself
      this.canInvite=false;
    }else{
      // for now: if memberDetail.hasTeam you cannot invite, member can only join 1 team
      // determined in this.loadTeam() method
      // if currentUser.team is same as memberDetail.team you cannot invite
    }  
  }

  onSaveEditButtonClicked(toggle){
    if(this.edit==true){
      console.log("Save Member");
      let passwordPrompt = this.alertCtrl.create({
        title: 'Enter password to confirm edits',
        inputs: [
          {
            name: 'password',
            placeholder: 'Password',
            type: 'password'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
              this.reloadMember();
            }
          },
          {
            text: 'Ok',
            handler: data => {
              console.log("Confirm password");
              this.member.password = data.password;
              this.dataService.updateMember(this.member)
              .then( (member) => {
                this.member = member;
              },
              (error) => {
                console.log("error: "+ error);
              });  
            }
          }
        ]
      });
      passwordPrompt.present();
    }
    this.edit = toggle;
  }

  addTeamClicked(){
    console.log("addTeamClicked");
  }

  onFindTeamButtonClicked(){
    console.log("onFindTeamButtonClicked");
    this.navCtrl.setRoot( TeamListPage );
  }

  onCreateTeamButtonClicked(){
    console.log("onCreateTeamButtonClicked");
    //this.navCtrl.push(TeamDetailPage, { 'team' : null, 'member' : this.member } );
    this.navCtrl.setRoot(TeamDetailPage, { 'team' : null, 'member' : this.member });
  }

  inviteClicked(){
    console.log("inviteClicked");
  }

  loadTeam() {
    console.log("getTeamByMemberId()", this.member.id);
    this.dataService.getTeamByMemberId(this.member.id)
    .then( (team) => {
      // if there's a team, then there's no pending join requests by other teams
      // but there can still be pending invite requests to join this members team
      if(team){
        console.log("Team found for member.id: "+this.member.id,team);     
        this.team = team;
        this.canInvite = false;

        // if team then load members
        if(this.team.members.length==1){
          if(team.teamOwnerId!=this.team.members[0]){
            this.dataService.getMemberById(this.team.members[0])
            .then( (teamMate: MemberModel) => {
              console.log("teamMate",teamMate);
              this.teamMates.push(teamMate);
             },
            (error) => {
              console.log("error: "+ error);
            });
          }else{
            // owner is the only member]
            console.log("TeamOwner is the only member");
          }
        }else if(this.team.members.length>1){
          this.dataService.getMembersByIds(this.team.members)
          .then( (teamMates) => {
            console.log("teamMates",teamMates);
            this.teamMates = teamMates;
           },
          (error) => {
            console.log("error: "+ error);
          });
        }else{
          // no members
          console.log("No teamMates");
        }
        // load requests of type 'invite'
        // invites are initiated by the teamOwner to non-members to join the team
        this.dataService.getRequestsForTeam(this.team.id)
        .then( (inviterequests) => {
          var tmpInviterequests = inviterequests;
          var removeInviteRequestsForMembers = [];
          tmpInviterequests.forEach((req)=>{
            if(req.requestStatus=='accepted'){
              // for an accepted request
              // remove both pending and accepted requests
              removeInviteRequestsForMembers.push(req.member.id);             
            }
          });
          // remove requests for members
          this.inviterequests = new Array<RequestModel>();
          tmpInviterequests.forEach( (req) => {
            var remove = false;
            removeInviteRequestsForMembers.forEach( (memberId) => {
              if(req.member.id == memberId){
                remove=true;
              }
            });
            if(!remove){
              this.inviterequests.push(req);
            }
          });
            
        },
        (error) => {
          console.log("error: "+ error);
        });

      }else{
        console.log("No team found for member.id: "+this.member.id);
        // for now, allow multiple requests
        
        // check requests if there's no team
        this.dataService.getRequestsByMemberId(this.member.id)
        .then( (jointeamrequests) => {
          console.log("jointeamrequests for member: ",this.member, jointeamrequests);
          this.jointeamrequests = jointeamrequests;
          // if currentTeam already created a request
          this.jointeamrequests.forEach((req)=>{

            if( (this.request!=null) && (req.team.id == this.request.team.id) ){
              console.log("This user has already a pending request from this team");
              this.canInvite = false;
            }

            if(req.requestStatus=='accepted'){
              // for an accepted request
              // remove both pending and accepted requests
              for(var i=0; i<this.jointeamrequests.length; i++){
                var req2: RequestModel = this.jointeamrequests[i];
                if(req.member.id==req2.member.id){
                  var deleted = this.jointeamrequests.splice(i, 1);
                  console.log("deletedRequest", deleted);
                }
              }
            }

          });

        },
        (error) => {
          console.log("error: "+ error);
        });
      }
    },
    (error) => {
      console.log("error: "+ error);
    });
  }

  roleSelected(newRole) {
    console.log("roleSelected:",newRole);
    this.member.role=newRole;
  }

  reloadMember(){
    console.log("Reload Member");
  }

  onTeamDetailSelect(team){
    var navLength = this.navCtrl.length();   
    this.navCtrl.remove(0, navLength-1);   
    this.navCtrl.setRoot(TeamDetailPage, { 'team' : team });  
  }

  onTeamMateSelect(teamMate){
    this.navCtrl.push(MemberDetailPage, { member: teamMate });
  }

  removeTeamMateClicked(teamMate){
    console.log("removeTeamMateClicked");
  }
  
}
