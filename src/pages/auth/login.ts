import { Component } from '@angular/core';
import { ModalController, NavController, AlertController, LoadingController } from 'ionic-angular';
import { User, UserDetails, AuthModuleId  } from '@ionic/cloud-angular';

import { TabsPage } from '../tabs/tabs';
import { SignupPage } from './signup';

import { AuthServiceProvider } from '../../providers/auth/auth-service';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  showLogin:boolean = true;
  email:string = '';
  password:string = '';
  name:string = '';

  constructor(public navCtrl: NavController,
              public authService: AuthServiceProvider,
              public user: User,
              public alertCtrl: AlertController,
              public loadingCtrl:LoadingController,
              public modalCtrl: ModalController) {

    if (this.authService.isAuthenticated()) {
      //this.navCtrl.push(TabsPage);
    }
  }

	login(type) {
    let loader = this.loadingCtrl.create({
        content: "Logging in..."
    });
    loader.present();
    setTimeout(() => {
      loader.dismiss();
    }, 5000);

    console.log('process login');
    this.showLogin = true;
    let moduleId: AuthModuleId = type;
    let details: UserDetails = { 'email':this.email, 'password':this.password };
    this.authService.login(moduleId, details)
    .then( (user) => {
      console.log('user successfully logged in');
      loader.dismissAll();
      this.navCtrl.setRoot(TabsPage);
    }, (errors) => {
      console.log(errors);
    });
	}

	signup() {
    console.log('process signup');
    const signupModal = this.modalCtrl.create(SignupPage);
    signupModal.onDidDismiss(data => {
      console.log("data:", data);
      let details: UserDetails = {
	  		'email': data.email,
	  		'password': data.password
      };
      console.log("details:", details);
		  this.authService.signup(details).then( () => {
			  // 'this.user' is now registered
			  this.showLogin = true;    
      }, (errors) => {});
    });
    signupModal.present();
	}

}
