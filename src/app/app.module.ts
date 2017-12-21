import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { HttpClientModule } from '@angular/common/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Sparkr } from './app.component';

// Tabs
import { TabsPage } from '../pages/tabs/tabs';
// Pages
import { LoginPage } from '../pages/auth/login';
import { SignupPage } from '../pages/auth/signup';
import { MemberListPage } from '../pages/member/member-list';
import { MemberDetailPage } from '../pages/member/member-detail';
import { TeamListPage } from '../pages/team/team-list';
import { TeamDetailPage } from '../pages/team/team-detail';

// Header Menu
import { HeaderPageComponent } from '../components/header-page/header-page';
import { HeaderMenuPageComponent } from '../components/header-menu-page/header-menu-page';

// Providers
import { AuthServiceProvider } from '../providers/auth/auth-service';
import { DataServiceProvider } from '../providers/data/data-service';
import { GlobalServiceProvider } from '../providers/global/global-service';
// Forms
import { TeamDetailFormComponent } from '../components/team-detail-form/team-detail-form';
import { MemberDetailFormComponent } from '../components/member-detail-form/member-detail-form';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '2a4f9309'
  }
};

@NgModule({
  declarations: [
    Sparkr,
    TabsPage,
    LoginPage,
    SignupPage,
    MemberListPage,
    MemberDetailPage,
    TeamListPage,
    TeamDetailPage,
    TeamDetailFormComponent,
    MemberDetailFormComponent,
    HeaderPageComponent,
    HeaderMenuPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(Sparkr),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Sparkr,
    TabsPage,
    LoginPage,
    SignupPage,
    MemberListPage,
    MemberDetailPage,
    TeamListPage,
    TeamDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    DataServiceProvider,
    GlobalServiceProvider
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
