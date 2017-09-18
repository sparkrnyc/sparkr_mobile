import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotificationModel } from '../../components/notification-model';
@IonicPage()
@Component({
  selector: 'page-notification-detail',
  templateUrl: 'notification-detail.html',
})
export class NotificationDetailPage {
  selectedNotification: NotificationModel = null;
  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    this.selectedNotification = navParams.get("notification");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationDetailPage');
  }
}
