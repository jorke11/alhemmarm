import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigProvider {

  SERVER_IP:any

  constructor(public http: HttpClient) {
    //this.SERVER_IP='http://192.168.1.4';
    //this.SERVER_IP='http://192.168.1.19';
    this.SERVER_IP='http://alhemmar.com';
    //this.SERVER_IP='http://localhost';
    
  }

}
