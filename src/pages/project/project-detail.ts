import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProjectModel } from '../../components/project-model';
@IonicPage()
@Component({
  selector: 'page-project-detail',
  templateUrl: 'project-detail.html',
})
export class ProjectDetailPage {
  selectedProject: ProjectModel = null;
  edit: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    this.selectedProject = navParams.get("project");
    if(this.selectedProject==null){
      this.selectedProject = new ProjectModel(null, null, null, null, null, null, null);
      this.edit = true;
    }else{
      this.edit = false;
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectDetailPage');
  }
}
