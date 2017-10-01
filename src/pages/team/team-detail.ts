import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TeamModel } from '../../components/team-model';

@IonicPage()
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {
  selectedTeam: TeamModel = null;
  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    this.selectedTeam = navParams.get("team");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamDetailPage');
  }
}
