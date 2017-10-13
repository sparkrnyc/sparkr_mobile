import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TeamModel } from '../../components/team-model';
import { DataServiceProvider } from '../../providers/data/data-service';

@IonicPage()
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {
  selectedTeam: TeamModel = null;
  edit: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dataservice: DataServiceProvider
            ) {

    this.selectedTeam = navParams.get("team");
    console.log("this.selectedTeam.members:", this.selectedTeam.members);

    // TODO this.selectedTeam.members SHOULD NEVER BE NULL
    if(this.selectedTeam.members!=null){
       (this.selectedTeam as any).names = "";
       this.dataservice.getProfiles(this.selectedTeam.members)
         .then( (profiles) => {
           let firstMember = (profiles as any)[0];
           (this.selectedTeam as any).names += firstMember.firstname + " " + firstMember.lastname;
           for (let i = 1; i < (profiles as any).length; i++) {
             let currentMember = (profiles as any)[i];
             (this.selectedTeam as any).names += ", " + currentMember.firstname + " " + currentMember.lastname;
           }
         },
         (error) => {
           console.log("error: " + error);
         }
       )
     }

    if(this.selectedTeam==null){
      this.selectedTeam = new TeamModel(null, null, null, null, null);
      this.edit = true;
    }else{
      this.edit = false;
    }
  }
  ionViewDidLoad() {

  }
}
