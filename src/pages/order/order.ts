import { Http,Headers } from '@angular/http';
import { ConfigProvider } from './../../providers/config/config';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  form:any
  data:any

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,
    public config:ConfigProvider,public viewCtrl:ViewController) {
    this.form={}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }

  newOrder(){
    console.log(this.form);

    let headers = new Headers();
    headers.append("Content-Type","application/json");
    headers.append("Accept","application/json");
    
    headers.append("Authorization","Bearer " + window.localStorage.getItem("token"));
    console.log(window.localStorage.getItem("token"))
    this.http.post(this.config.SERVER_IP+"/store",this.form,{headers:headers})
    .map(res=>res.json())
    .subscribe(
      data=>{
        if(data.success==true){
          this.viewCtrl.dismiss(data.data);
        }
      },
      err=>{
        console.log("llego a error:");
        console.log(JSON.stringify(err))
      }
    );
  }

  close(){
    this.navCtrl.pop();
  }

}
