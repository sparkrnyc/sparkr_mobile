import { Component } from '@angular/core';
import { ViewController, ModalController, NavController, LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth/auth-service';
import { MemberModel } from '../../components/member-model';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})

export class SignupPage {

  showLogin:boolean = true;
  member: MemberModel = null;
  password: string = null;
  signupErrors: string = '';

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public authService: AuthServiceProvider,
              public loadingCtrl: LoadingController,
              public viewCtrl: ViewController
    ) {
    this.member = new MemberModel(
      null,
      'loopback',
      '',
      '',
      '',
      '',
      false,
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      ''
    );
  }

  signupClicked() {
    console.log('signupClicked');

    var loader = this.loadingCtrl.create({
      content: "Signing up..."
    });
    loader.present();
    setTimeout(() => {
      loader.dismiss();
    }, 5000);
   
    this.authService.signup(this.member)
    .then((newMember) => {
      if(newMember){
        loader.dismissAll();
        this.viewCtrl.dismiss(newMember);
      }
    }, (err) => {
      console.log("Signup error:", err);
      let e1 = err.error;
      let e2 = JSON.parse(e1);
      let errorMessage = ""+e2.error.message;
      let errorStatusCode = ""+e2.error.statusCode;
      let errorName = ""+e2.error.name;
      this.signupErrors = errorName + ": " + errorStatusCode + " " + errorMessage;
      console.log("Error message:", this.signupErrors );  
      loader.dismissAll();
    });  
  }

  cancelSignup(){
    this.navCtrl.pop();
  }

}
