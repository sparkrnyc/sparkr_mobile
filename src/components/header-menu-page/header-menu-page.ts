import { Component, ViewChild } from '@angular/core';
import { App, Nav, MenuController } from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth/auth-service';

import { LoginPage } from '../../pages/auth/login';

@Component({
  selector: 'header-menu-page',
  templateUrl: 'header-menu-page.html'
})

export class HeaderMenuPageComponent {
  @ViewChild(Nav) nav: Nav;

  constructor(public authService: AuthServiceProvider,
              public menuCtrl: MenuController,
              public app: App
             ) {
    console.log('Hello HeaderMenuPageComponent Component');
  }

  logoutClicked() {
    console.log("Logout");
    this.authService.logout();
    this.menuCtrl.close();
    var nav = this.app.getRootNav();
    nav.setRoot(LoginPage);
  }

}
