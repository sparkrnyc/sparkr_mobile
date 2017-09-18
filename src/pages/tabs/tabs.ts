import { Component, ViewChild } from '@angular/core';
import { Tabs } from 'ionic-angular';
import { Platform } from 'ionic-angular';

import { Object1ListPage } from '../object1/object1-list';
import { User1ListPage } from '../user1/user1-list';
import { User2ListPage } from '../user2/user2-list';
import { NotificationListPage } from '../notification/notification-list';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  private isAndroid: boolean = false;
  @ViewChild('myTabs') myTabs: Tabs;

  tab1Root = Object1ListPage;
  tab2Root = User1ListPage;
  tab3Root = User2ListPage;
  tab4Root = NotificationListPage;

  constructor(public platform: Platform) {
    this.isAndroid = this.platform.is('android');
  }

  ionViewDidEnter() {}

}
