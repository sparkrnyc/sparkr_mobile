import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data/data-service';
import { NotificationDetailPage } from './notification-detail';

@Component({
  selector: 'page-notification-list',
  templateUrl: 'notification-list.html'
})

export class NotificationListPage {
  notificationList: any = null;
  constructor(public navCtrl: NavController,
              public dataService: DataServiceProvider) {
    this.notificationList = this.dataService.getNotificationList()
    .then( (notificationList) => {
      this.notificationList = notificationList;
      console.log("notificationList",this.notificationList);
    },
    (error) => {
      console.log("error: "+ error);
    });
  }
  onSelect(item) {
    this.navCtrl.push(NotificationDetailPage, { notification: item });
  }
}
