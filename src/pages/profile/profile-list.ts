import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data/data-service';
import { ProfileDetailPage } from './profile-detail';

@Component({
  selector: 'page-profile-list',
  templateUrl: 'profile-list.html'
})
export class ProfileListPage {
  profiles: any = null;
  constructor(public navCtrl: NavController,
              public dataService: DataServiceProvider) {
                
    this.profiles = this.dataService.getProfileList()
    .then( (profiles) => {
      this.profiles = profiles;
      console.log("profiles:", profiles);
    },
    (error) => {
      console.log("error: "+ error);
    });
  }
  onSelect(item) {
    this.navCtrl.push(ProfileDetailPage, { profile: item });
  }
}