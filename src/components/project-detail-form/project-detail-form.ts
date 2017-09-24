import { Component, Input } from '@angular/core';
import { ProjectModel } from '../project-model';
@Component({
  selector: 'project-detail-form',
  templateUrl: 'project-detail-form.html'
})
export class ProjectDetailFormComponent {
  @Input() project: ProjectModel = null;
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
