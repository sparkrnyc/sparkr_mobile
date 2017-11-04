import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController,
         LoadingController, ModalController, AlertController } from 'ionic-angular';
import { MemberModel } from '../../components/member-model';
import { TeamModel } from '../../components/team-model';
import { DataServiceProvider } from '../../providers/data/data-service';
import { AuthServiceProvider } from '../../providers/auth/auth-service';

@IonicPage()
@Component({
  selector: 'page-member-detail',
  templateUrl: 'member-detail.html',
})

export class MemberDetailPage {

  member: MemberModel = null;
  roleOptions: string[] = [
    "Developer", "Designer", "Marketer", "Business"
    ]
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

    if(this.member==null && currentUser!=null) {
      // currentUser member
      this.member = currentUser;
    } else {
      // non-currentuser member
      if(this.member!=null){
        this.loadTeam();
      }
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
    this.dataService.getTeamByMemberId(this.member.id)
    .then( (t) => {
      console.log("TeamFound: ",t);
      this.team = t;
      if(this.team != null){
        this.dataService.getMembersByIds(this.team.members)
        .then( (members) => {
          this.members = members;
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

  onMemberSelect(member){
    this.navCtrl.push(MemberDetailPage, { member: member });
  }
  ionViewCanEnter() {
    console.log("ionViewCanEnter.team", this.team);
  }
  ionViewDidLoad() { 
    console.log("ionViewDidLoad.team", this.team);
  }
  ionViewDidEnter() {
    console.log("ionViewDidEnter.team", this.team)
  }
  
}
