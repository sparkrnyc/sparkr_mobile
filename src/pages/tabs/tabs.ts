import { Component, ViewChild } from '@angular/core';
import { Tabs } from 'ionic-angular';
import { Platform } from 'ionic-angular';

import { ProfileListPage } from '../profile/profile-list';
import { TeamListPage } from '../team/team-list';
import { ProfileDetailPage } from '../profile/profile-detail';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  private isAndroid: boolean = false;
  @ViewChild('myTabs') myTabs: Tabs;

  tab1Root = ProfileDetailPage;//MyProfile
  tab2Root = TeamListPage;//Teams
  tab3Root = ProfileListPage;//Profiles

  constructor(public platform: Platform) {
    this.isAndroid = this.platform.is('android');
  }

  ionViewDidEnter() {}

}
