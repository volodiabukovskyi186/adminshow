import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { OrderService } from './services/order.service';
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orderSideStatus = false;
  ordersForm: FormGroup;

  public statusCodes = {
    "1": {
      name: 'statusCodes.done',
      color: '#42996F'
    },
    "2": {
      name: 'statusCodes.inProgress',
      color: '#ffff00'
    },
    "3": {
      name: 'statusCodes.canceled',
      color: '#ff0000'
    },
    "4": {
      name: 'statusCodes.sent',
      color: '#636363'
    }
  }

  constructor(
    protected ngxService: NgxUiLoaderService,
    public orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.generateOrdersForm();
    this.getList();
    console.log(this.getList());
    console.log(this.ordersForm.value);
    
  }

  generateOrdersForm(): void {
    this.ordersForm = new FormGroup({
      status: new FormControl(""),
    });
  }

  getList() {
    this.ngxService.start();
    this.orderService.getList().subscribe(this.getListHandler);
  }

  getListHandler = (data) => {
    this.ngxService.stopAll();
    this.orderService.order = data;

    this.orderService.order.data.forEach((val) => {
      this.ordersForm.get('status').setValue(this.statusCodes[val.status_id]);
    })
  };
}
