import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User1Model } from '../../components/user1-model';
@IonicPage()
@Component({
  selector: 'page-user1-detail',
  templateUrl: 'user1-detail.html',
})
export class User1DetailPage {
  selectedUser1: User1Model = null;
  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    this.selectedUser1 = navParams.get("user1");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad User1DetailPage');
  }
}
