import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { HttpClientModule } from '@angular/common/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';

// Tabs
import { TabsPage } from '../pages/tabs/tabs';
// Pages
import { LoginPage } from '../pages/auth/login';
import { SignupPage } from '../pages/auth/signup';
import { AboutPage } from '../pages/about/about';
import { ProfileListPage } from '../pages/profile/profile-list';
import { ProfileDetailPage } from '../pages/profile/profile-detail';
import { FeedListPage } from '../pages/feed/feed-list';
import { FeedDetailPage } from '../pages/feed/feed-detail';
import { TeamListPage } from '../pages/team/team-list';
import { TeamDetailPage } from '../pages/team/team-detail';
import { ProjectListPage } from '../pages/project/project-list';
import { ProjectDetailPage } from '../pages/project/project-detail';
import { ConnectionListPage } from '../pages/connection/connection-list';
import { NotificationListPage } from '../pages/notification/notification-list';
import { NotificationDetailPage } from '../pages/notification/notification-detail';

// Header Menu
import { HeaderPageComponent } from '../components/header-page/header-page';
import { HeaderMenuPageComponent } from '../components/header-menu-page/header-menu-page';

// Providers
import { AuthServiceProvider } from '../providers/auth/auth-service';
import { DataServiceProvider } from '../providers/data/data-service';
import { GlobalServiceProvider } from '../providers/global/global-service';
// Forms
import { TeamDetailFormComponent } from '../components/team-detail-form/team-detail-form';
import { ProjectDetailFormComponent } from '../components/project-detail-form/project-detail-form';
import { FeedDetailFormComponent } from '../components/feed-detail-form/feed-detail-form';
import { NotificationDetailFormComponent } from '../components/notification-detail-form/notification-detail-form';
import { ProfileDetailFormComponent } from '../components/profile-detail-form/profile-detail-form';

// InMemoryDbService
import { InMemoryDbTestProvider } from '../providers/data/in-memory-db-test';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

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
    AboutPage,
    ProfileListPage,
    ProfileDetailPage,
    FeedListPage,
    FeedDetailPage,
    TeamListPage,
    TeamDetailPage,
    ProjectListPage,
    ProjectDetailPage,
    ConnectionListPage,
    NotificationListPage,
    NotificationDetailPage,
    TeamDetailFormComponent,
    ProjectDetailFormComponent,
    FeedDetailFormComponent,
    NotificationDetailFormComponent,
    ProfileDetailFormComponent,
    HeaderPageComponent,
    HeaderMenuPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDbTestProvider)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    LoginPage,
    SignupPage,
    AboutPage,
    ProfileListPage,
    ProfileDetailPage,
    FeedListPage,
    FeedDetailPage,
    TeamListPage,
    TeamDetailPage,
    ProjectListPage,
    ProjectDetailPage,
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
    GlobalServiceProvider,
    InMemoryDbTestProvider
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
