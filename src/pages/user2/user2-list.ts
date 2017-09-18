import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data/data-service';
import { User2DetailPage } from './user2-detail';
@IonicPage()
@Component({
  selector: 'page-user2-list',
  templateUrl: 'user2-list.html',
})
export class User2ListPage {
  user2List: Object = null;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dataService: DataServiceProvider) {
      this.user2List = this.dataService.getUser2List()
      .then( (user2List) => {
        this.user2List = user2List;
      },
      (error) => {
        console.log("error: "+ error);
      });
  }
  onSelect(item) {
    this.navCtrl.push(User2DetailPage, { user2: item });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessListPage');
  }
}
