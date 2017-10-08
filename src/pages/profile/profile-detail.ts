import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dataService: DataServiceProvider,
              public authService: AuthServiceProvider
            ) {

    this.selectedProfile = navParams.get("profile");
    if(this.selectedProfile==null){
      console.log("view logged in user");
      // TODO get this.user from Auth
      let currentUser = authService.currentUser();
      console.log("currentUser: ",currentUser);
      //dataService.getProfileByEmail(this.selectedProfile.email);
      // currently logged in user
      this.selectedProfile = new ProfileModel(
        1, 
        "remkohdev", 
        "assets/imgs/profiles/remkohdev.jpg", 
        "remkohdev@email.com", 
        "https://linkedin.com/in/remkohdev/", 
        "Remko", 
        "de Knikker", 
        "New York", 
        "NY", 
        "US", 
        "Amsterdam University", 
        "CS", 
        "IBM", 
        "", 
        "Developer"
      );

    }else{
      console.log("view selected user");
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad profileDetailPage');
  }
}
