import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController,
         LoadingController, ModalController, AlertController } from 'ionic-angular';
import { MemberModel } from '../../components/member-model';
import { TeamModel } from '../../components/team-model';
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
  members: MemberModel[] = new Array<MemberModel>();
  edit: boolean = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dataService: DataServiceProvider,
              public authService: AuthServiceProvider,
              public menuCtrl: MenuController,
              public loadingCtrl: LoadingController,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController
            ) {

    menuCtrl.enable(true);
    // if a member was selected from the members
    this.member = navParams.get("member");
    // if a user is logged in
    var currentUser = authService.currentUser();  

    if(this.member==null && currentUser==null) {
      // should never happen
    } else if(this.member==null && currentUser!=null) {
      // currentUser member
      this.member = currentUser;

    } else {
      // non-currentuser member
      
    }
    if(this.member!=null){
      this.loadTeam();
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

  removeMemberClicked(){
    console.log("removeMemberClicked");
  }

  loadTeam() {
    console.log("loadTeam()");
    this.dataService.getTeams()
    .then( (teams) => {
      console.log("TeamsFound: ",teams);
      teams.forEach( (t) => {
        t.members.forEach( (mid) => {
          if(mid==this.member.id){
            this.team = t;
          }
        });
      });
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

  onMemberSelect(member){
    this.navCtrl.push(MemberDetailPage, { member: member });
  }
  
}
