import { Component } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';
import { Auth, User } from '@ionic/cloud-angular';
import { DataServiceProvider } from '../../providers/data/data-service';
import { ProfileModel } from '../../components/profile-model';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})

export class SignupPage {

  showLogin:boolean = true;
  profile: ProfileModel = null;
  password: string = null;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public auth: Auth,
              public user: User,
              public dataService: DataServiceProvider
    ) {
      this.profile = new ProfileModel(
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      );
    }

  signupClicked() {
    console.log('process signup');
    let data = { 'email': this.profile.email, 'password': this.password };
    //
    var newId = null;
    this.dataService.genProfileId()
    .then( (nid) => {
      newId = nid;
      console.log("newId:",newId);
    },
    (error) => {
      console.log("error: "+ error);
    });

    let profile = new ProfileModel(
      newId,
      this.profile.name,
      'assets/imgs/roles/'+this.profile.role+'.png',
      this.profile.email,
      '',
      this.profile.college,
      this.profile.major,
      '',
      this.profile.role
    );

    this.dataService.createProfile(profile)
    .then( (p) => {
      this.profile = p;
      console.log("new profile:",this.profile);
    },
    (error) => {
      console.log("error: "+ error);
    });
    
    this.viewCtrl.dismiss(data);
  }

}
