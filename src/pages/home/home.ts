import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  title: string = null;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController) {

      this.title = "Home";

  }
}
