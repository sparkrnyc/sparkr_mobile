import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, ModalController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { SignupPage } from './signup';

import { AuthServiceProvider } from '../../providers/auth/auth-service';

import { LoginDetailsModel } from '../../components/login-details-model';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  showLogin: boolean = true;
  password: string = '';
  username: string = '';
  loginErrors: string = '';

  constructor(public navCtrl: NavController,
              public authService: AuthServiceProvider,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public modalCtrl: ModalController) {

    if (this.authService.isLoggedIn) {
      //this.navCtrl.push(TabsPage);
    }
  }

	login(type) {

    var loader = this.loadingCtrl.create({
        content: "Logging in..."
    });
    loader.present();
    setTimeout(() => {
      loader.dismiss();
    }, 5000);

    console.log('process login');
    this.showLogin = true;

    var loginDetails = new LoginDetailsModel(
      'loopback',
      this.username,
      this.password
    );
   
    this.authService.login(loginDetails)
    .then(m => {
      if(this.authService.isLoggedIn){
        console.log('user successfully logged in');
        this.syncRequests();
        loader.dismissAll();
        this.navCtrl.setRoot(TabsPage);
        
      }
    }, (err) => {
      console.log("Login error:", err);
      let e1 = err.error.error;
      let e2 = JSON.parse(e1);
      let errorMessage = ""+e2.error.message;
      let errorStatusCode = ""+e2.error.statusCode;
      let errorName = ""+e2.error.name;
      this.loginErrors = errorName + ": " + errorStatusCode + " " + errorMessage;
      console.log("Error message:", this.loginErrors );
      loader.dismissAll();
    });
	}

	signup() {
    console.log('process signup');
    /**
    const signupModal = this.modalCtrl.create(SignupPage);
    signupModal.onDidDismiss(m => {
      console.log("login.signup.newmember:", m);
			this.showLogin = true;    
    });
    signupModal.present();
    */
    this.navCtrl.push(SignupPage);
	}

  syncRequests(){
    // accepted requests have 2 requests in the database:
    // one with status 'pending' and one with 'accepted'
    // cause ot $owner ACL rights
    // so remove pending requests if it was accepted for currentUser who is owner
    
  }

}
