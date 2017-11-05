import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data/data-service';
import { TeamDetailPage } from './team-detail';

@IonicPage()
@Component({
  selector: 'page-team-list',
  templateUrl: 'team-list.html',
})

export class TeamListPage {
  
  teams: Object = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dataService: DataServiceProvider,
              public platform: Platform) {

    this.dataService.getTeams()
      .then( (teams) => {
        this.teams = teams;
      },
      (error) => {
        console.log("error: "+ error);
      });
  }

  onTeamDetailClicked(team){
    console.log("onTeamDetailClicked");
    this.navCtrl.push(TeamDetailPage, { team: team });  
  }
  onJoinTeamClicked(team){
    console.log("onJoinTeamClicked");
  }
  addTeamClicked(){
    this.navCtrl.push(TeamDetailPage, { team: null });    
  }
}
