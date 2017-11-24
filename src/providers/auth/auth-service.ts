import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { AlertController } from 'ionic-angular';

import { DataServiceProvider } from '../data/data-service';

import { LoginDetailsModel } from '../../components/login-details-model';
import { MemberModel } from '../../components/member-model';

@Injectable()
export class AuthServiceProvider {

  loggedInUser: MemberModel = null;
  
  constructor(public alertCtrl: AlertController,
              public http: HttpClient,
              public dataService: DataServiceProvider
            ) {
    //console.log('Hello AuthServiceProvider Provider');
  }

  isLoggedIn(): boolean {
    if(this.loggedInUser && this.dataService.getAccessToken){
      return true;
    }else{
      return false;
    }
  }
  
  /**
   * http://legacy.docs.ionic.io/docs/user-authentication
   */
  /** 
  isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }
  */
  /**
   * Replaced Ionic Auth by Loopback Auth
   */


  login(loginDetails: LoginDetailsModel): Promise<any> {
    return new Promise( (resolve, reject) => {

      if(loginDetails.loginType == 'loopback'){
        
        console.log('auth-service.login:', loginDetails);
        // login input validation
        if(loginDetails.username === '' && loginDetails.password === '') {
          let alert = this.alertCtrl.create({
              title:'Login Error',
              subTitle:'Username and Password are required to login',
              buttons:['OK']
          });
          alert.present();
          reject({'error': 'Login error: Username and Password are required to login.'});
        }

        this.dataService.login(loginDetails.username, loginDetails.password)
        .then((loggedInUser: MemberModel) => {
          this.loggedInUser = loggedInUser;
          console.log("logged in,loggedInUser:", this.loggedInUser);
          resolve(loggedInUser);

        }, (err) => {
          console.log("Login error:", err);
          reject({'error': err});
        });

      } else {

        var alert = this.alertCtrl.create({
          title:'Login Error',
          subTitle:'Only Loopback is supported to login',
          buttons:['OK']
        });
        alert.present();
        reject({'error': 'Login error: Only Loopback is supported to login.'});
      }

    });
  }

  signup(member: MemberModel): Promise<MemberModel> {   
    return new Promise(resolve => {
      this.dataService.createMember(member)
      .then((loggedInUser: MemberModel) => {
        console.log("signed up, loggedInUser:", this.loggedInUser);
        resolve(loggedInUser);
      }, (err) => {
        console.log("Signup error:", err);
      });
    });
  }

  logout(): any {
    this.loggedInUser = null;
    this.dataService.clearAccessToken();
    console.log("logged out,loggedInUser:", this.loggedInUser);
    return;
  }

  currentUser(): MemberModel {
    if(this.isLoggedIn() && this.loggedInUser){
      console.log("currentUser,loggedInUser: ", this.loggedInUser);
      return this.loggedInUser;
    }else{
      return null;
    }
  }

}
