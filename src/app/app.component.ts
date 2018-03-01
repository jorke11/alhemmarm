import { Component,ViewChild } from '@angular/core';
import { Platform,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('NAV') nav: Nav;
  public rootPage:any;
  public _token:any
  public pages: Array<{ titulo:string,component:any,icon:string}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    this._token=null
      
        if ( window.localStorage.getItem("token") === null || window.localStorage.getItem("token")=="undefined") {
          //this.rootPage = LoginPage;
          this.rootPage = TabsPage;
        }else{
          this.rootPage = HomePage;
        }
    
        platform.ready().then(() => {
          // Okay, so the platform is ready and our plugins are available.
          // Here you can do any higher level native things you might need.
          statusBar.styleDefault();
          splashScreen.hide();
        });
    
        this.pages=[
          {titulo:"Inicio",component: HomePage , icon: "home"},
          {titulo:"Perfil",component: ProfilePage , icon: "person"},
          
        ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }  
  goToPage(page){
    this.nav.setRoot(page);
  }

  closeSession(){
    window.localStorage.removeItem("token");
    this.nav.setRoot(LoginPage);
  }
 
}

