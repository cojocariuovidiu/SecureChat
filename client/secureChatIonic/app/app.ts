import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

//Import our pages
import { Home } from './pages/home/home';
import { AllMessagesPage } from './pages/all-messages/all-messages';
import { AuthLoginPage } from './pages/auth-login/auth-login';

//Import our providers (services)
import { AppSettings } from './providers/app-settings/app-settings';
import { AppAuth } from './providers/app-auth/app-auth';

@Component({
  templateUrl: 'build/app.html',
  providers: [AppAuth, AppSettings]
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  //Our Home Page
  rootPage: any = Home;

  //Our Array of pages depending on state
  alwaysPages: Array<{ title: string, component: any }>;
  noAuthPages: Array<{ title: string, component: any }>;
  authPages: Array<{ title: string, component: any }>;

  //Our Auth Provider
  authProvider: AppAuth;

  constructor(public platform: Platform, private injectedAuth: AppAuth) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.alwaysPages = [
      { title: 'Home', component: Home }
    ];
    this.noAuthPages = [
      { title: 'Login', component: AuthLoginPage }
    ];
    this.authPages = [
      { title: 'Messages', component: AllMessagesPage }
    ];

    //Set our auth provider
    this.authProvider = injectedAuth;

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  //Check if we are logged in
  isLoggedIn() {
    this.authProvider.authStatus();
  }
}

ionicBootstrap(MyApp);
