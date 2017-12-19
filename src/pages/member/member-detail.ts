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

import * as _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-member-detail',
  templateUrl: 'member-detail.html',
})

export class MemberDetailPage {
  
  roleOptions: string[] = [
    "Developer", "Designer", "Marketer", "Business"
    ];
  currentUser: MemberModel = null;
  member: MemberModel = null;
  team: TeamModel = null;
  teamMates: MemberModel[] = null;
  
  edit: boolean = null;
  isCurrentUser: boolean = false;
  // join another team requests
  requests: RequestModel[] = null;
  // invite to join this member's team
  //inviterequests: RequestModel[] = null;
  request: RequestModel = null;

  // permissions
  canBeInvited: boolean = true;
  canAddTeam: boolean = false;

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
    this.currentUser = this.authService.getCurrentUser(); 

    if(this.member==null && this.currentUser==null){
      // never happens because new users are created only via signup, 
      // not via MemberDetail page
    }else if(this.member==null && this.currentUser!=null) {
      // this.member is currentuser, entered via homepage tab
      this.member = this.currentUser;
      if(this.member.id==this.currentUser.id){
        this.isCurrentUser = true;
      }
      this.canAddTeam = true;
      this.loadTeam();
    }else if(this.member!=null && this.currentUser!=null) {
      // this.member is currentuser , entered via member link
      if(this.member.id==this.currentUser.id){
        this.isCurrentUser = true;
        this.canAddTeam = true;
      }else{
        this.canAddTeam = false;
      }
      this.loadTeam();
    }else{
      // this.member is not currentuser, entered via member link
      this.canAddTeam = false;
      this.loadTeam();
    }


    if(this.request){
      console.log("request:", this.request);
      if(this.request.member==null){
        // request has no member, hence someone is finding members to invite
        // finding members

      }
    }
    
    // checkpermissions
    this.checkPermissions(); 
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
    if(this.request.team==null){
      console.log("Error: a team is required to create an invite request. ");
      return;
    }
    var request = new RequestModel(
         null,
         this.member,
         this.request.team,
         "invite",
         "pending",
         new Date()
      );
    this.dataService.createRequest(request)
    .then( (request) => {
      console.log("new request:", request);
      this.requests.push(request);
      this.navCtrl.setRoot(MemberDetailPage, { 'member' : this.currentUser });
    },
    (error) => {
      console.log("error: "+ error);
    }); 
  }

  loadTeam() {
    console.log("loadTeam() for member", this.member.id);
    
    this.dataService.getTeamByMemberId(this.member.id)
    .then( (team) => {
      // if there's a team, then there's no pending join requests by other teams
      // but there can still be pending invite requests to join this members team
      if(team){
        console.log("Team found for member.id: "+this.member.id,team);     
        this.team = team;
        this.canBeInvited = false;
        console.log("Team Members: "+ this.team.members.length);
        
        // if team then load members
        if(this.team.members.length==1){
          if(team.teamOwnerId!=this.team.members[0]){
            console.log("Error: single member must always be owner, but is not.");
          }else{
            // owner is the only member]
            console.log("TeamOwner is the only member");
          }
        }else if(this.team.members.length>1){
          this.dataService.getMembersByIds(this.team.members)
          .then( (teamMates) => {
            console.log("teamMates",teamMates);
            // remove self
            _.remove(teamMates, this.member);
            this.teamMates = teamMates;
          },
          (error) => {
            console.log("error: "+ error);
          });
        }else{
          // no members
          console.log("Error: no teamMates found, but a team should always have an owner.");
        }

        // load requests of type 'invite'
        this.dataService.getRequestsForTeam(this.team.id)
        .then( (requests) => {
          console.log("Requests found for Team: ", requests);

          // create new temporary array with copied data
          let tmpRequests = requests.slice(0);
          // remove pending for invite.accepted 
          // remove * for any confirmed request
          if(requests && requests.length>0){
            requests.forEach( (req1)=>{
              if((req1.requestStatus=='confirmed')) {
                // remove all requests for this request
                for(let i1=0; i1<tmpRequests.length; i1++){
                  let tmpRequest: RequestModel = tmpRequests[i1];
                  if(req1.member.id==tmpRequest.member.id){
                    // removes item from array
                    tmpRequests.splice(i1, 1);
                    i1-=1;
                  }
                }
              }else if(req1.requestType=='invite' && req1.requestStatus=='accepted'){
                // remove pending for this request
                for(let i1=0; i1<tmpRequests.length; i1++){
                  let tmpRequest: RequestModel = tmpRequests[i1];
                  if(req1.member.id==tmpRequest.member.id && 
                     tmpRequest.requestStatus=='pending'){
                    // removes item from array
                    tmpRequests.splice(i1, 1);
                    i1-=1;
                  }
                }
              }
            });
          }else{
            console.log("No requests found for team");
          }
          this.requests = tmpRequests;

          console.log("Requests for Team after removing confirmed requests:", this.requests);
        },
        (error) => {
          console.log("error: "+ error);
        });

      }else{
        console.log("No team found for member.id: "+this.member.id);
        // for now, allow multiple requests      
        // check requests if there's no team
        this.dataService.getRequestsByMemberId(this.member.id)
        .then( (requests) => {
          console.log("Requests found for member: ",this.member, requests);
          // create new temporary array with copied data
          let tmpRequests = requests.slice(0);
          // remove pending for invite.accepted 
          // remove * for any confirmed request
          var userHasAcceptedInvite = false;
          if(requests && requests.length>0){
            requests.forEach( (req1)=>{
              if((req1.requestStatus=='confirmed')) {
                // remove all requests for this request
                for(let i1=0; i1<tmpRequests.length; i1++){
                  let tmpRequest: RequestModel = tmpRequests[i1];
                  if(req1.member.id==tmpRequest.member.id){
                    // removes item from array
                    tmpRequests.splice(i1, 1);
                    i1-=1;
                  }
                }
              }else if(req1.requestType=='invite' && req1.requestStatus=='accepted'){
                // remove pending for this request
                userHasAcceptedInvite = true;
                for(let i1=0; i1<tmpRequests.length; i1++){
                  let tmpRequest: RequestModel = tmpRequests[i1];
                  if(req1.member.id==tmpRequest.member.id && 
                     tmpRequest.requestStatus=='pending'){
                    // removes item from array
                    tmpRequests.splice(i1, 1);
                    i1-=1;
                  }
                }
              }
            });
          }else{
            console.log("No requests found for member");
          }
          if(userHasAcceptedInvite){
            this.canAddTeam = false;
          }
          this.requests = tmpRequests;
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

  onPendingRequestSelect(request: RequestModel){
    var navLength = this.navCtrl.length();   
    this.navCtrl.remove(0, navLength-1); 
    this.navCtrl.setRoot(TeamDetailPage, { 'team' : request.team });  
  }

  onTeamMateSelect(teamMate){
    this.navCtrl.push(MemberDetailPage, { member: teamMate });
  }

  removeTeamMateClicked(teamMate){
    _.remove(this.team.members, teamMate.id);
    console.log("removeTeamMateClicked", this.team.members);
    this.dataService.updateTeam(this.team)
    .then( (team) => {
      console.log("Team updated: ", team);
    },
    (error) => {
      console.log("error: "+ error);
    });
  }

  checkPermissions() {

    // canInvite
    if(this.isCurrentUser){
      // you cannot invite yourself
      console.log("member is currentUser");
      this.canBeInvited=false;
    }else{
      // for now: if memberDetail.hasTeam you cannot invite, member can only join 1 team
      // determined in this.loadTeam() method
      // if currentUser.team is same as memberDetail.team you cannot invite
    } 

  }
  
}
