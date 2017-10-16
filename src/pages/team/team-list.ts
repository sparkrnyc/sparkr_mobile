import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data/data-service';
import { TeamDetailPage } from './team-detail';

@IonicPage()
@Component({
  selector: 'page-team-list',
  templateUrl: 'team-list.html',
})

export class TeamListPage {
  teamList: Object = null;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dataService: DataServiceProvider) {
    this.teamList = this.dataService.getTeamList()
      .then( (teamList) => {
        this.teamList = teamList;
      },
      (error) => {
        console.log("error: "+ error);
      });
  }
  onSelect(item) {
    this.navCtrl.push(TeamDetailPage, { team: item });
  }
  addTeamClicked(){
    this.navCtrl.push(TeamDetailPage, { project: null });    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamListPage');
  }
}
