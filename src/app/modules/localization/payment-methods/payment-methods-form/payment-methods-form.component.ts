import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-payment-methods-form',
  templateUrl: './payment-methods-form.component.html',
  styleUrls: ['./payment-methods-form.component.scss']
})
export class PaymentMethodsFormComponent implements OnInit {

  @Input()selectedOrder;
  ordersForm: FormGroup  = new FormGroup({
    status: new FormControl(''),
  });

  // this.selectedOrder.descriptions.length.order_status_id

  constructor() {}
  ngOnInit(): void {

  }

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

}
