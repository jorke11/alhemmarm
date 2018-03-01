import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { ConfigProvider } from '../../providers/config/config';

import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public data:any
  public email:string
  public password:string
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public config:ConfigProvider,public http:Http, private app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    let headers = new Headers();
    headers.append("Content-Type","application/x-www-form-urlencoded");
    headers.append("Content-Type","application/json");
    headers.append("Accept","application/json");
    headers.append("Access-Control-Allow-Origin","*");
    
    let param={email:this.email,password:this.password};
   
    this.http.post(this.config.SERVER_IP+"/user/login",param,{headers:headers})
    .map(res=>res.json())
    .subscribe(
      data=>{
        this.data =data;
        window.localStorage.setItem("token",data.token)
        this.app.getRootNav().setRoot(HomePage)
        //this.navCtrl.setRoot(HomePage);
        //this.navCtrl.push(HomePage);
      },
      err=>{
        console.log("llego a error:");
        alert(JSON.stringify(err))
      }
    );
  }

}
