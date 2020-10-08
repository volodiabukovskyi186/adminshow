import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-unit-weight-form',
  templateUrl: './unit-weight-form.component.html',
  styleUrls: ['./unit-weight-form.component.scss']
})
export class UnitWeightFormComponent implements OnInit {

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
