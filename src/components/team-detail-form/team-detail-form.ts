import { Component, Input } from '@angular/core';

import { TeamModel } from '../team-model';

import { DataServiceProvider } from '../../providers/data/data-service';

@Component({
  selector: 'team-detail-form',
  templateUrl: 'team-detail-form.html'
})

export class TeamDetailFormComponent {
  @Input() team: TeamModel = null;
  @Input() edit: boolean = null;

  constructor(public dataService: DataServiceProvider
             ) {
    if(this.team==null || this.team.id==null){
      // create new project
    } else {
      
    } 
  }
  addMemberClicked(teamId){
    console.log("team.id: ", teamId);
  }
  addProjectClicked(teamId){
    console.log("team.id: ", teamId);
  }
  
  onClicked(toggle){
    if(this.edit==true){
      console.log("1.Save Team");

    }
    this.edit = toggle;
  }

  onSubmit(formValue: any){
    console.log(formValue);
  }
}
