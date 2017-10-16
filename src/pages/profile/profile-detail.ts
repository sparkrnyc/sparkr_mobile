import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, MenuController } from 'ionic-angular';
import { ProfileModel } from '../../components/profile-model';
import { DataServiceProvider } from '../../providers/data/data-service';
import { AuthServiceProvider } from '../../providers/auth/auth-service';

@IonicPage()
@Component({
  selector: 'page-profile-detail',
  templateUrl: 'profile-detail.html',
})

export class ProfileDetailPage {
  selectedProfile: ProfileModel = null;
  activeMenu: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dataService: DataServiceProvider,
              public authService: AuthServiceProvider,
              public modalCtrl: ModalController,
              public menuCtrl: MenuController
            ) {

    menuCtrl.enable(true);

    this.selectedProfile = navParams.get("profile");
    let currentUser = authService.currentUser();  
    if(this.selectedProfile==null && currentUser!=null){ 
      dataService.getProfileByEmail(currentUser.details.email)
      .then( (profile) => {
        this.selectedProfile = new ProfileModel(
          profile['id'],
          profile['username'],
          profile['thumbnail'],
          profile['email'],
          profile['linkedin'],
          profile['firstname'],
          profile['lastname'],
          profile['city'],
          profile['state'],
          profile['country'],
          profile['college'],
          profile['degree'],
          profile['company'],
          profile['bio'],
          profile['role']
        );
      },
      (error) => {
        console.log("error: "+ error);
      });
    }else{
      console.log("view selected user");
    }
  }

  ionViewDidLoad() { }
  
}
