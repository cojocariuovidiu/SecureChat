import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

//Import our providers (services)
import { AppSettings } from './providers/app-settings/app-settings';
import { AppNotify } from './providers/app-notify/app-notify';
import { AppAuth } from './providers/app-auth/app-auth';
import { AppMessaging } from './providers/app-messaging/app-messaging';

//Import our pages
import { Home } from './pages/home/home';
import { AllConversationsPage } from './pages/all-conversations/all-conversations';
import { AuthLoginPage } from './pages/auth-login/auth-login';
import { ConversationPage } from './pages/conversation/conversation';

@Component({
  templateUrl: 'build/app.html',
  providers: [AppSettings, AppAuth, AppMessaging, AppNotify]
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  //Our Home Page
  rootPage: any;

  //Our Array of pages depending on state
  alwaysPages: Array<{ title: string, component: any }>;
  noAuthPages: Array<{ title: string, component: any }>;
  authPages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public authProvider: AppAuth) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.alwaysPages = [
      { title: 'Home', component: Home }
    ];
    this.noAuthPages = [
      { title: 'Login', component: AuthLoginPage }
    ];
    this.authPages = [
      { title: 'Messages', component: AllConversationsPage }
    ];

    //Set our root page
    if (this.isLoggedIn()) this.rootPage = AllConversationsPage;
    else this.rootPage = Home;

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      //Initialize facebook
      this.authProvider.initFacebook();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  //Check if we are logged in
  isLoggedIn() {
    return this.authProvider.authStatus();
  }

  //Logout the user
  logout() {
    this.authProvider.logout();
  }
}

ionicBootstrap(MyApp);
