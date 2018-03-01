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
  departments:any
  cities:any
  schedules:any

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,
    public config:ConfigProvider,public viewCtrl:ViewController) {
    this.getDepartments()
    this.getSchedules()
    this.form={}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }

  getSchedules(){
    console.log("scgedyke")
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    headers.append("Accept","application/json");
    headers.append("Authorization","Bearer " + window.localStorage.getItem("token"));
    this.http.get(this.config.SERVER_IP+"/getServices",{headers:headers})
    .map(res=>res.json())
    .subscribe(
      data=>{
        console.log(data)
        this.schedules = data;
      },
      err=>{
        console.log("llego a error:");
        console.log(JSON.stringify(err))
      }
    );
  }

  getDepartments(){
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    headers.append("Accept","application/json");
    headers.append("Authorization","Bearer " + window.localStorage.getItem("token"));
    this.http.get(this.config.SERVER_IP+"/getDepartments",{headers:headers})
    .map(res=>res.json())
    .subscribe(
      data=>{
        this.departments = data;
      },
      err=>{
        console.log("llego a error:");
        console.log(JSON.stringify(err))
      }
    );
  }

  optionSelected(event){

    let headers = new Headers();
    headers.append("Content-Type","application/json");
    headers.append("Accept","application/json");
    headers.append("Authorization","Bearer " + window.localStorage.getItem("token"));
    this.http.get(this.config.SERVER_IP+"/getCities/"+event.id,{headers:headers})
    .map(res=>res.json())
    .subscribe(
      data=>{
        this.cities = data;
      },
      err=>{
        console.log("llego a error:");
        console.log(JSON.stringify(err))
      }
    );
  }

  newOrder(){
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    headers.append("Accept","application/json");
    
    headers.append("Authorization","Bearer " + window.localStorage.getItem("token"));
    
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

}
