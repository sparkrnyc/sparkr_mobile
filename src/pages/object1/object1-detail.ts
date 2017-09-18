import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Object1Model } from '../../components/object1-model';
@IonicPage()
@Component({
  selector: 'page-object1-detail',
  templateUrl: 'object1-detail.html',
})
export class Object1DetailPage {
  selectedObject1: Object1Model = null;
  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    this.selectedObject1 = navParams.get("object1");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Object1DetailPage');
  }
}
