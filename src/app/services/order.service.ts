import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthHttp } from 'angular2-jwt';
@Injectable({
  providedIn: 'root'
})
export class OrderService {



  constructor(private ahttp: AuthHttp) { }

  getOrders(){
    return this.ahttp.get('/api/orders').map(response => response.json());
  }
}
