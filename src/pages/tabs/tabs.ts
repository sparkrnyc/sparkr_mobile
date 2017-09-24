import { Component, ViewChild } from '@angular/core';
import { Tabs } from 'ionic-angular';
import { Platform } from 'ionic-angular';

import { FeedListPage } from '../feed/feed-list';
import { TeamListPage } from '../team/team-list';
import { ProjectListPage } from '../project/project-list';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  private isAndroid: boolean = false;
  @ViewChild('myTabs') myTabs: Tabs;

  tab1Root = FeedListPage;//MySparkr
  tab2Root = TeamListPage;//Teams
  tab3Root = ProjectListPage;//Projects
  tab4Root = ProfilePage;//Profile

  constructor(public platform: Platform) {
    this.isAndroid = this.platform.is('android');
  }

  ionViewDidEnter() {}

}
