import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config/config';

import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage {

  data:any

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,public config:ConfigProvider) {
    this.getProfile();
    this.data={}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  
  getProfile(){
    let headers = new Headers();
    headers.append("Accept","application/json");
    headers.append("Content-Type","application/json");
    headers.append("Authorization","Bearer " + window.localStorage.getItem("token"));

    this.http.get(this.config.SERVER_IP + "/getUser",{headers: headers})
    .map(res=>res.json())
    .subscribe(
      data=>{
        this.data = data;
      },
      err=>{
        console.log("error");
      }
    );


  }
}
