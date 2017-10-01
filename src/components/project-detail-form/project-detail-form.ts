import { Component, Input } from '@angular/core';
import { ProjectModel } from '../project-model';
@Component({
  selector: 'project-detail-form',
  templateUrl: 'project-detail-form.html'
})
export class ProjectDetailFormComponent {
  @Input() project: ProjectModel = null;
  @Input() edit: boolean = null;
  constructor() {
    if(this.project==null || this.project.id==null){
      // create new project
    } else {

    } 
  }
  onClicked(toggle){
    if(this.edit==true){
      // save was clicked
      
    }else{
      // edit was clicked
    }
    this.edit = toggle;
  }
  onSubmit(formValue: any){
    console.log(formValue);
  }
}
