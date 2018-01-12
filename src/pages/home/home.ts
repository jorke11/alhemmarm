import { OrderPage } from './../order/order';
import { Component } from '@angular/core';
import { NavController,ModalController,ViewController,ToastController } from 'ionic-angular';

import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { ConfigProvider } from '../../providers/config/config';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data:any

  constructor(public navCtrl: NavController,public http:Http,public config:ConfigProvider,
    public modalCtrl:ModalController,public viewCtrl:ViewController,public toastCtrl:ToastController) {
    this.data=[]
    
  }
  ionViewDidLoad(){
    this.loadOrder()
  }

  loadOrder(){
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    headers.append("Accept","application/json");
    
    headers.append("Authorization","Bearer " + window.localStorage.getItem("token"));
    console.log(window.localStorage.getItem("token"))
    this.http.get(this.config.SERVER_IP+"/getOrders",{headers:headers})
    .map(res=>res.json())
    .subscribe(
      data=>{
        this.data=data;
      },
      err=>{
        console.log("llego a error:");
        console.log(JSON.stringify(err))
      }
    );

  }

  itemSelected(item){

  }

  cancelOrder(row){
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    headers.append("Accept","application/json");
    
    headers.append("Authorization","Bearer " + window.localStorage.getItem("token"));
    console.log(window.localStorage.getItem("token"))

    this.http.get(this.config.SERVER_IP+"/cancelOrders/"+row.id,{headers:headers})
    .map(res=>res.json())
    .subscribe(
      data=>{
        
        this.data=data;
      },
      err=>{
        console.log("llego a error:");
        console.log(JSON.stringify(err))
      }
    );
  }

  openModalOrder(){
    
    let modalGuard = this.modalCtrl.create(OrderPage);
    modalGuard.present();
    
    modalGuard.onDidDismiss(data=>{
      
      if(data!=undefined){
        let toast=this.toastCtrl.create({
          message:'Has creado una nueva Orden',
          duration:2500
        })
        this.data.push(data);
        
        toast.present()
        }
    }
    )
  }

}
