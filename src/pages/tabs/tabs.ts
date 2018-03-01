import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AboutPage } from '../about/about';
import { ServicesPage } from '../services/services';
import { ContactPage } from '../contact/contact';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = LoginPage;
  tab2Root = AboutPage;
  tab3Root = ServicesPage;
  tab4Root = ContactPage;

  constructor() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
