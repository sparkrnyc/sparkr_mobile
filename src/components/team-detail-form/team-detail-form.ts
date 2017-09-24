import { Component, Input } from '@angular/core';
import { TeamModel } from '../team-model';
@Component({
  selector: 'team-detail-form',
  templateUrl: 'team-detail-form.html'
})
export class TeamDetailFormComponent {
  @Input() team: TeamModel = null;
  edit: boolean = null;
  constructor() {
    this.edit = false;
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
