import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data/data-service';
import { MemberDetailPage } from './member-detail';

@Component({
  selector: 'page-member-list',
  templateUrl: 'member-list.html'
})
export class MemberListPage {
  members: any = null;
  constructor(public navCtrl: NavController,
              public dataService: DataServiceProvider) {
                
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
    this.navCtrl.push(MemberDetailPage, { member: item });
  }
}