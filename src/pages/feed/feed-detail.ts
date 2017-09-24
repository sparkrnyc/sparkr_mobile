import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FeedModel } from '../../components/feed-model';
@IonicPage()
@Component({
  selector: 'page-feed-detail',
  templateUrl: 'feed-detail.html',
})
export class FeedDetailPage {
  selectedFeed: FeedModel = null;
  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    this.selectedFeed = navParams.get("feed");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedDetailPage');
  }
}
