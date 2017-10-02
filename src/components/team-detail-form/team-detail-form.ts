import { Component, Input } from '@angular/core';
import { TeamModel } from '../team-model';
@Component({
  selector: 'team-detail-form',
  templateUrl: 'team-detail-form.html'
})
export class TeamDetailFormComponent {
  @Input() team: TeamModel = null;
  @Input() edit: boolean = null;
  constructor() {
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
    }
    this.edit = toggle;
  }
  onSubmit(formValue: any){
    console.log(formValue);
  }
}
