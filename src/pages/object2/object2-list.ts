import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data/data-service';
import { Object2DetailPage } from './object2-detail';
@Component({
  selector: 'page-object2-list',
  templateUrl: 'object2-list.html'
})
export class Object2ListPage {
  object2List: any = null;
  constructor(public navCtrl: NavController,
              public dataService: DataServiceProvider) {
    this.object2List = this.dataService.getObject2List()
    .then( (object2List) => {
      this.object2List = object2List;
    },
    (error) => {
      console.log("error: "+ error);
    });
  }
  onSelect(item) {
    this.navCtrl.push(Object2DetailPage, { object2: item });
  }
}
