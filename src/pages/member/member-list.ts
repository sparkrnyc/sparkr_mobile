import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DataServiceProvider } from '../../providers/data/data-service';

import { MemberDetailPage } from './member-detail';

import { RequestModel } from '../../components/request-model';

@Component({
  selector: 'page-member-list',
  templateUrl: 'member-list.html'
})

export class MemberListPage {
  members: any = null;
  request: RequestModel = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dataService: DataServiceProvider) {
                
    this.request = navParams.get("request");
    if(this.request){
      console.log("request:", this.request);
      if(this.request.member==null){
        // request has no member, hence someone is finding members to invite
        // finding members

      }
    }

    this.dataService.getMembers()
    .then( (members) => {
      this.members = members;
      console.log("members:", members);
    },
    (error) => {
      console.log("error: "+ error);
    });
  }

  onSelect(item) {
    this.navCtrl.push(MemberDetailPage, { member: item, request: this.request });
  }


}