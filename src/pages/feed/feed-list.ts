import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data/data-service';
import { FeedDetailPage } from './feed-detail';
@Component({
  selector: 'page-feed-list',
  templateUrl: 'feed-list.html'
})
export class FeedListPage {
  feedList: any = null;
  constructor(public navCtrl: NavController,
              public dataService: DataServiceProvider) {

    this.feedList = this.dataService.getFeedList()
    .then( (feed) => {  
      this.feedList = feed;
    },
    (error) => {
      console.log("error: "+ error);
    });
  }
  onSelect(item) {
    this.navCtrl.push(FeedDetailPage, { feed: item });
  }
}
