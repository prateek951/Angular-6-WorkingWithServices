import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  orders:any[];

  constructor(private service: OrderService) { }

  ngOnInit() {
    this.service.getOrders()
    .subscribe(orders => this.orders = orders);
  }

}