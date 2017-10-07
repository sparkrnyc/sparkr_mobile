import { Component } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';
import { Auth, User } from '@ionic/cloud-angular';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})

export class SignupPage {

  showLogin:boolean = true;
  email:string = '';
  password:string = '';
  name:string = '';

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public auth: Auth,
              public user: User) {}

  signupClicked() {
    console.log('process signup');
    let data = { 'email': this.email, 'password': this.password };
    this.viewCtrl.dismiss(data);
  }

}
