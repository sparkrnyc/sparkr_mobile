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

  currentUser: MemberModel = null;
  team: TeamModel = null;
  teamMembers: MemberModel[] = new Array<MemberModel>();
  requests: RequestModel[] = null;

  // state
  edit: boolean = false;
  areThereRequestsByCurrentUser: boolean = false;
  createNewTeam: boolean = false;
  isOwner: boolean = false;
  isMember: boolean = false;

  // permissions
  // team permissions
  canJoin: boolean = false;
  canInvite: boolean = false;
  // request permissions
  canAccept: boolean = false;
  canConfirm: boolean = false;
  canDelete: boolean = false;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dataService: DataServiceProvider,
              public authService: AuthServiceProvider,
              public viewCtrl: ViewController
            ) {

    this.team = navParams.get("team");
    this.currentUser = this.authService.getCurrentUser();

    // populate team
    if(this.team==null){
      // create new team
      this.createNewTeam = true;
      this.team = new TeamModel(
                    null, 
                    null, 
                    null, 
                    null, 
                    null,
                    null
                  );
      // add currentuser as default member and teamOwner
      this.team.members = [ this.currentUser.id ];
      this.team.teamOwnerId = this.currentUser.id; 

    }else{
      // existing team
      console.log("member with existing team");
    }

    this.loadTeamMembers();
    this.loadOpenRequestsForTeam(); 

    if(this.createNewTeam){
      this.isOwner=true;
      this.isMember=true;
      this.edit = true;
    }else{
      // isOwner, isMember, canJoin, areThereOpenRequestByCurrentUser
      console.log("constructor.checkPermissions for existing team");
      this.checkStates();
      this.checkPermissions();
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
          //this.viewCtrl.dismiss();
          this.goToMemberDetailPageForMemberId(this.team.teamOwnerId);
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
         this.currentUser,
         this.team,
         "join",
         "pending",
         new Date()
      );
    this.dataService.createRequest(request)
    .then( (request) => {
      console.log("new request:", request);
      this.canJoin=false;
      this.requests.push(request);
      this.navCtrl.setRoot(MemberDetailPage, { 'member' : this.currentUser });
    },
    (error) => {
      console.log("error: "+ error);
    }); 
  }  

  onAcceptRequestClicked(request: RequestModel) {
    console.log("onAcceptRequestClicked", request);
    // when a request is accepted to 2 things:
    // -(1) a pending invite can be accepted by invited user
    // -(2) an accepted invite can be confirmed by owner
    // -(3) a pending join can be confirmed by owner
    // - only owner can update team

    // add member to team
    this.team.members.push(request.member.id);


    // 
    if(request.requestType=='join' && 
      request.requestStatus=='pending' && 
      this.isOwner){
      // (3) a pending join can be confirmed by owner
      console.log("(3) a pending join can be confirmed by owner");
      request.requestStatus='confirmed';
      this.dataService.updateTeam(this.team) 
      .then( (updatedTeam) => {
        //console.log("updatedTeam:", updatedTeam);
        this.team = updatedTeam;
        // reload teamMembers
        this.loadTeamMembers();
        // 2. update request status to accepted 
        request.team = this.team;

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



    }else if(request.requestType=='invite' && 
      request.requestStatus=='pending' &&
      this.currentUser.id==request.member.id){
      // (1) a pending invite can be accepted by invited user
      console.log("(1) a pending invite can be accepted by invited user");
      request.requestStatus='accepted';

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


    }else if(request.requestType=='invite' && 
       request.requestStatus=='accepted' &&
       this.isOwner){
      // (2) an accepted invite can be confirmed by owner
      console.log("(2) an accepted invite can be confirmed by owner");
      request.requestStatus='confirmed';
      this.dataService.updateTeam(this.team) 
      .then( (updatedTeam) => {
        //console.log("updatedTeam:", updatedTeam);
        this.team = updatedTeam;
        // reload teamMembers
        this.loadTeamMembers();
        // update request status to accepted 
        request.team = this.team;

        this.dataService.createRequest(request)
        .then( (newRequest) => {
          //console.log("newRequest:", newRequest);
          // remove requests with status accepted
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
    }else{
      console.log("isOwner? "+this.isOwner+"; Request: ", request);
    }


  } 


  onCancelRequestClicked(request: RequestModel){
    console.log("onCancelRequestClicked");

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
        //console.log("loadTeamMembers.checkPermissions (1 member)")
        //this.checkPermissions();
      },
      (error) => {
        console.log("error: " + error);
      });     
    }else{
      console.log("More than 1 member");
      this.dataService.getMembersByIds(this.team.members)
      .then( (members) => {
        this.teamMembers = members;
        //console.log("loadTeamMembers.checkPermissions (> 1 member)")
        //this.checkPermissions();
      },
      (error) => {
        console.log("error: " + error);
      });
    }
  }


  loadOpenRequestsForTeam(){
    console.log("loadOpenRequestsForTeam:", this.team);

    this.requests = new Array<RequestModel>();
    this.dataService.getRequestsForTeam(this.team.id)
    .then( (requests: RequestModel[]) => {

      // create new temporary array with copied data
      var tmpRequests = requests.slice(0);

      
      // remove pending for invite.accepted 
      // remove * for any confirmed request
      if(requests && requests.length>0){
        console.log("Requests found for team: ", requests);
        console.log("Loop through requests1");
        requests.forEach( (req1)=>{
          if(req1.member.id==this.currentUser.id){
            this.areThereRequestsByCurrentUser = true;
          }
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
      console.log("1. After remove: ", this.requests);
      this.requests = tmpRequests;
      console.log("2. After remove: ", this.requests);
      this.checkStates();
      this.checkPermissions();

    },
    (error) => {
      console.log("error: "+ error);
    });

  }

  checkStates(){
    // isOwner?
    if(this.team.teamOwnerId==this.currentUser.id){
      this.isOwner=true;
    }else{
      this.isOwner=false;
    }
    console.log("this.isOwner",this.isOwner);

    // isMember?
    this.teamMembers.forEach( (m) => {
      if(this.authService.getCurrentUser().id==m.id){
        this.isMember = true;
      }
    });
    console.log("this.isMember",this.isMember);
  }

  checkPermissions(){
    console.log("CheckPermissions");
    // requests exist per team/member 
    // teamdetail has requests for currentUser and/or other users
    if(this.isOwner){
      this.canJoin = false;
      this.canAccept = true;
      this.canConfirm = true;
      this.canDelete = true;
      this.canInvite = true;

    }else{
      if(this.isMember){
        this.canJoin = false;
        this.canAccept = false;

      }else{
        // !isOwner && !isMember

        if(this.requests && this.requests.length>0){
          this.canJoin = false;
          var isConfirmed = false;
          this.requests.forEach( (r) => {
            if(this.currentUser.id==r.member.id && r.requestStatus=='confirmed'){
              isConfirmed = true;
            }
          });
          if(isConfirmed){
            this.canAccept = false;
          }else{
            var isAccepted = false;
            // a request is either a join or an invite
            //var isAcceptedJoin = false;
            var isAcceptedInvite = false;
            this.requests.forEach( (r) => {
              if(this.currentUser.id==r.member.id && r.requestStatus=='accepted'){
                isAccepted = true;
                if(r.requestType=='invite'){
                  isAcceptedInvite = true; 
                }
              }
            });

            if(isAccepted){
              if(isAcceptedInvite){
                // then the Request needs to be confirmed still
              }else{
                // it's an acceptedJoin

              }
            }else{
              // invitee needs to accept, or owner needs to confirm
            }  
          }
        }else{
          this.canJoin = true;
          this.canAccept = false;
        }
      }
    }
  }

  goToMemberDetailPageForMemberId(memberId: string){
    var member = null;
    this.teamMembers.forEach( (m) => {
      if(m.id==memberId){
        member = m;
        this.navCtrl.setRoot(MemberDetailPage, { 'member' : member });
      }
    });
  }
}
