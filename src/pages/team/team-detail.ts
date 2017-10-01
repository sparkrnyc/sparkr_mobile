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
  edit: boolean = false;
  
  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    this.selectedTeam = navParams.get("team");
    if(this.selectedTeam==null){
      this.selectedTeam = new TeamModel(null, null, null, null, null);
      this.edit = true;
    }else{
      this.edit = false;
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamDetailPage');
  }
}
