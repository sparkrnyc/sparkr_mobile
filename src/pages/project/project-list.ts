import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data/data-service';
import { ProjectDetailPage } from './project-detail';
@IonicPage()
@Component({
  selector: 'page-project-list',
  templateUrl: 'project-list.html',
})
export class ProjectListPage {
  projectList: Object = null;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dataService: DataServiceProvider) {
      this.projectList = this.dataService.getProjectList()
      .then( (projectList) => {
        this.projectList = projectList;
      },
      (error) => {
        console.log("error: "+ error);
      });
  }
  onSelect(item) {
    this.navCtrl.push(ProjectDetailPage, { project: item });
  }
  addClicked(){
    this.navCtrl.push(ProjectDetailPage, { project: null });    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectListPage');
  }
}
