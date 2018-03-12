import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { Http,Headers } from '@angular/http';

/**
 * Generated class for the ModalservicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modalservice',
  templateUrl: 'modalservice.html',
})
export class ModalservicePage {

  data:any
  row:any

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,public config:ConfigProvider,public viewCtrl:ViewController) {
    this.getSchedules()
    this.data=[]
    this.row={}
  }

  getSchedules(){
    
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    headers.append("Accept","application/json");
    headers.append("Authorization","Bearer " + window.localStorage.getItem("token"));

    this.http.get(this.config.SERVER_IP+"/getServices",{headers:headers})

    .map(res=>res.json())
    .subscribe(
      data=>{
        this.data=data
      },
      err=>{
        console.log("llego a error:");
        console.log(JSON.stringify(err))
      }
    );
  }

  ionViewDidLoad() {
    

  }

  itemSelected(row){
      this.data.forEach((element,index) => {
          if(row.id==element.id){
            this.viewCtrl.dismiss(element);
          }
      });

      
      
  }

}
