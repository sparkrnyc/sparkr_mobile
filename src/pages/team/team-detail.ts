import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';

import { TeamModel } from '../../components/team-model';
import { MemberModel } from '../../components/member-model';
import { RequestModel } from '../../components/request-model';

import { MemberDetailPage } from '../member/member-detail';
import { MemberListPage } from '../member/member-list';

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
  requests: RequestModel[] = null;
  // state
  edit: boolean = false;
  areThereRequestsByCurrentUser: boolean = false;
  // permissions
  isOwner: boolean = false;
  isMember: boolean = false;
  canJoin: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dataService: DataServiceProvider,
              public authService: AuthServiceProvider,
              public viewCtrl: ViewController
            ) {

    this.team = navParams.get("team");

    // populate team
    if(this.team==null){
      // create new team
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
    }else{
      // existing team
      console.log("member with existing team");
    }

    this.loadTeamMembers();
    this.loadOpenRequestsForTeam(); 

    if(this.team==null){
      this.isOwner=true;
      this.isMember=true;
      this.edit = true;
    }else{
      // isOwner, isMember, canJoin, areThereOpenRequestByCurrentUser
      this.checkPermissions();
    }
  }

  loadTeamMembers(){

    console.log("loadTeamMembers");
    //console.log("this.selectedTeam.members:", this.team.members);

    if(this.team.members==null || this.team.members.length==0){
      console.log("No members found");
      this.teamMembers = new Array<MemberModel>();
    }else if(this.team.members.length==1){    
      console.log("1 member");
      this.dataService.getMemberById(this.team.members[0])
      .then( (m) => {
        this.teamMembers = new Array<MemberModel>();
        this.teamMembers.push(m);
        //console.log("teamMembers",this.teamMembers);
        this.checkPermissions();
      },
      (error) => {
        console.log("error: " + error);
      });     
    }else{
      console.log("More than 1 member");
      this.dataService.getMembersByIds(this.team.members)
      .then( (members) => {
        this.teamMembers = members;
        this.checkPermissions();
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


  addMemberClicked(teamId){
    console.log("addMemberClicked", teamId);
    var request = new RequestModel(
         null,
         null,
         this.team,
         "invite",
         "pending",
         new Date()
      );
    this.navCtrl.setRoot(MemberListPage, { 'request' : request });
  }

  onMemberDetailSelect(member){
    var navLength = this.navCtrl.length();
    if(navLength>0){
      this.navCtrl.remove(0, navLength-1);
    }
    //console.log("navLength", navLength);
    this.navCtrl.setRoot(MemberDetailPage, { 'member' : member });
  }


  onJoinTeamButtonClicked() {
    console.log("onJoinTeamButtonClicked");
    var request = new RequestModel(
         null,
         this.authService.loggedInUser,
         this.team,
         "join",
         "pending",
         new Date()
      );
    this.dataService.createRequest(request)
    .then( (request) => {
      //console.log("new request:", request);
      this.canJoin=false;
      this.requests.push(request);
    },
    (error) => {
      console.log("error: "+ error);
    }); 
  }  

  onAcceptRequestClicked(request: RequestModel) {
    console.log("onAcceptRequestClicked", request);
    // when a request is accepted to 2 things:
    // only teamOwner can update, but the Accept button
    // is only enabled for a teamOwner, so this authorization
    // is already checked.

    // 1. add member to team 
    this.team.members.push(request.member.id);
    this.dataService.updateTeam(this.team) 
    .then( (updatedTeam) => {
      //console.log("updatedTeam:", updatedTeam);
      this.team = updatedTeam;
      // reload teamMembers
      this.loadTeamMembers();

      // 2. update request status to accepted 
      request.team = this.team;
      request.requestStatus = "accepted";
      this.dataService.createRequest(request)
      .then( (newRequest) => {
        //console.log("newRequest:", newRequest);
        // 3. remove requests with status accepted
        //    or re-load requests for this team
        this.loadOpenRequestsForTeam();
        
      },
      (error) => {
        console.log("error: "+ error);
      });

    },
    (error) => {
      console.log("error: "+ error);
    });
  } 

  onCancelRequestClicked(request: RequestModel){
    console.log("onCancelRequestClicked");

  }


  loadOpenRequestsForTeam(){
    console.log("loadOpenRequestsForTeam:", this.team);

    this.requests = new Array<RequestModel>();
    this.dataService.getRequestsForTeam(this.team.id)
    .then( (requests: RequestModel[]) => {

      var tmpRequests = requests.slice(0);
      // remove all requests for memberId+teamId if 'accepted'  
      requests.forEach( (req1)=>{
        if(req1.member.id==this.authService.loggedInUser.id){
          this.areThereRequestsByCurrentUser = true;
        }
        if(req1.requestStatus=='accepted'){
          // for the accepted request
          var acceptedMemberId = req1.member.id;
          for(var i1=0; i1<tmpRequests.length; i1++){
            var req2: RequestModel = tmpRequests[i1];
            if(acceptedMemberId==req2.member.id){
              tmpRequests.splice(i1, 1);
              i1-=1;
            }
          }
        }
      });
      this.requests = tmpRequests;
      this.checkPermissions();
    },
    (error) => {
      console.log("error: "+ error);
    });
  }

  
  checkPermissions(){
    console.log("checkPermissions");

    // isOwner?
    if(this.team.teamOwnerId==this.authService.loggedInUser.id){
      this.isOwner=true;
    }else{
      this.isOwner=false;
    }

    // isMember?
    this.teamMembers.forEach( (m) => {
      if(this.authService.loggedInUser.id==m.id){
        this.isMember = true;
      }
    });

    // if currentUser has no Requests AND is not owner AND is not member
    // then canJoin
    this.canJoin=false;
    //console.log("this.isOwner",this.isOwner);
    //console.log("this.isMember",this.isMember);
    //console.log("this.areThereRequestsByCurrentUser",this.areThereRequestsByCurrentUser);
    if(!this.areThereRequestsByCurrentUser && !this.isOwner && !this.isMember){
      this.canJoin = true;
      //console.log("this.canJoin",this.canJoin);
    }
    
  }
}
