import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data/data-service';
import { Object1DetailPage } from './object1-detail';
@Component({
  selector: 'page-object1-list',
  templateUrl: 'object1-list.html'
})
export class Object1ListPage {
  object1List: any = null;
  constructor(public navCtrl: NavController,
              public dataService: DataServiceProvider) {
    this.object1List = this.dataService.getObject1List()
    .then( (object1List) => {
      this.object1List = object1List;
    },
    (error) => {
      console.log("error: "+ error);
    });
  }
  onSelect(item) {
    this.navCtrl.push(Object1DetailPage, { object1: item });
  }
}
