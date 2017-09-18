import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data/data-service';
import { User1DetailPage } from './user1-detail';
@IonicPage()
@Component({
  selector: 'page-user1-list',
  templateUrl: 'user1-list.html',
})
export class User1ListPage {
  user1List: Object = null;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dataService: DataServiceProvider) {
      this.user1List = this.dataService.getUser1List()
      .then( (user1List) => {
        this.user1List = user1List;
      },
      (error) => {
        console.log("error: "+ error);
      });
  }
  onSelect(item) {
    this.navCtrl.push(User1DetailPage, { user1: item });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessListPage');
  }
}
