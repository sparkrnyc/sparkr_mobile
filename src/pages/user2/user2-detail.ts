import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User2Model } from '../../components/user2-model';
@IonicPage()
@Component({
  selector: 'page-user2-detail',
  templateUrl: 'user2-detail.html',
})
export class User2DetailPage {
  selectedUser2: User2Model = null;
  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    this.selectedUser2 = navParams.get("user2");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad User2DetailPage');
  }
}
