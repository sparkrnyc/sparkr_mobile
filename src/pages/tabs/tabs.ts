import { Component, ViewChild } from '@angular/core';
import { Tabs } from 'ionic-angular';
import { Platform } from 'ionic-angular';

import { MemberListPage } from '../member/member-list';
import { TeamListPage } from '../team/team-list';
import { MemberDetailPage } from '../member/member-detail';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  private isAndroid: boolean = false;
  @ViewChild('myTabs') myTabs: Tabs;

  tab1Root = MemberDetailPage;//MyMember
  tab2Root = TeamListPage;//Teams
  tab3Root = MemberListPage;//Members

  constructor(public platform: Platform
             ) {
    this.isAndroid = this.platform.is('android');

  }

  ionViewDidEnter() {}

}
