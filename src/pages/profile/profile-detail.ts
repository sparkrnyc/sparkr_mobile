import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController,
         LoadingController } from 'ionic-angular';
import { ProfileModel } from '../../components/profile-model';
import { TeamModel } from '../../components/team-model';
import { DataServiceProvider } from '../../providers/data/data-service';
import { AuthServiceProvider } from '../../providers/auth/auth-service';

@IonicPage()
@Component({
  selector: 'page-profile-detail',
  templateUrl: 'profile-detail.html',
})

export class ProfileDetailPage {
  profile: ProfileModel = null;
  team: TeamModel = null;
  members: ProfileModel[] = new Array<ProfileModel>();
  edit: boolean = null;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dataService: DataServiceProvider,
              public authService: AuthServiceProvider,
              public menuCtrl: MenuController,
              public loadingCtrl: LoadingController
            ) {

    menuCtrl.enable(true);
    // if a profile was selected from the profileList
    this.profile = navParams.get("profile");
    // if a user is logged in
    let currentUser = authService.currentUser();  
    if(this.profile==null && currentUser!=null) {
      // currentUser profile
      this.loadProfile(currentUser);
    } else {
      // non-currentuser profile
      if(this.profile!=null){
        this.loadTeam();
      }
    }
  }

  onClicked(toggle){
    if(this.edit==true){
    }
    this.edit = toggle;
  }

  addTeamClicked(){
    console.log("addTeamClicked");
  }

  removeMemberClicked(){
    console.log("removeMemberClicked");
  }

  loadProfile(currentUser){
    console.log("currentUser profile", currentUser.details);
    this.dataService.getProfileByEmail(currentUser.details.email)
    .then( (p) => {
      this.profile = p;
      console.log("profileByEmail:", this.profile);
      // add team
      this.loadTeam();
    },
    (error) => {
      console.log("error: "+ error);
    });
  }

  loadTeam() {
    this.dataService.getTeamByProfileId(this.profile.id)
    .then( (t) => {
      console.log("TeamFound: ",t);
      this.team = t;
      if(this.team != null){
        this.team.members.forEach( mid => {
          this.dataService.getProfileById(mid)
          .then( (m) => {
            this.members.push(m);
          },
          (error) => {
            console.log("error: "+ error);
          });
        });
      }
    },
    (error) => {
      console.log("error: "+ error);
    });
  }

  onMemberSelect(member){
    this.navCtrl.push(ProfileDetailPage, { profile: member });
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
