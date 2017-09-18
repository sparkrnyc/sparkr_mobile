import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Object2Model } from '../../components/object2-model';
@IonicPage()
@Component({
  selector: 'page-object2-detail',
  templateUrl: 'object2-detail.html',
})
export class Object2DetailPage {
  selectedObject2: Object2Model = null;
  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    this.selectedObject2 = navParams.get("object2");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Object2DetailPage');
  }
}
