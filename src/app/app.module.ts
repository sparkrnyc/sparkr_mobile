import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { HttpModule } from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { LoginPage } from '../pages/auth/login';
import { SignupPage } from '../pages/auth/signup';

import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';

import { Object1ListPage } from '../pages/object1/object1-list';
import { Object1DetailPage } from '../pages/object1/object1-detail';
import { Object2ListPage } from '../pages/object2/object2-list';
import { Object2DetailPage } from '../pages/object2/object2-detail';

import { User1ListPage } from '../pages/user1/user1-list';
import { User1DetailPage } from '../pages/user1/user1-detail';
import { User2ListPage } from '../pages/user2/user2-list';
import { User2DetailPage } from '../pages/user2/user2-detail';

import { ConnectionListPage } from '../pages/connection/connection-list';
import { NotificationListPage } from '../pages/notification/notification-list';
import { NotificationDetailPage } from '../pages/notification/notification-detail';

import { AuthServiceProvider } from '../providers/auth/auth-service';
import { DataServiceProvider } from '../providers/data/data-service';
import { GlobalServiceProvider } from '../providers/global/global-service';
import { User1DetailFormComponent } from '../components/user1-detail-form/user1-detail-form';
import { User2DetailFormComponent } from '../components/user2-detail-form/user2-detail-form';
import { Object1DetailFormComponent } from '../components/object1-detail-form/object1-detail-form';
import { Object2DetailFormComponent } from '../components/object2-detail-form/object2-detail-form';
import { NotificationDetailFormComponent } from '../components/notification-detail-form/notification-detail-form';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '2a4f9309'
  }
};

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LoginPage,
    SignupPage,
    HomePage,
    AboutPage,
    Object1ListPage,
    Object1DetailPage,
    Object2ListPage,
    Object2DetailPage,
    User1ListPage,
    User1DetailPage,
    User2ListPage,
    User2DetailPage,
    ConnectionListPage,
    NotificationListPage,
    NotificationDetailPage,
    User1DetailFormComponent,
    User2DetailFormComponent,
    Object1DetailFormComponent,
    Object2DetailFormComponent,
    NotificationDetailFormComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    LoginPage,
    SignupPage,
    HomePage,
    AboutPage,
    Object1ListPage,
    Object1DetailPage,
    Object2ListPage,
    Object2DetailPage,
    User1ListPage,
    User1DetailPage,
    User2ListPage,
    User2DetailPage,
    ConnectionListPage,
    NotificationListPage,
    NotificationDetailPage
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
