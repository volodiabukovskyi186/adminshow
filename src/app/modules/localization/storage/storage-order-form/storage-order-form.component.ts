import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-storage-order-form',
  templateUrl: './storage-order-form.component.html',
  styleUrls: ['./storage-order-form.component.scss']
})
export class StorageOrderFormComponent implements OnInit {
  @Input()selectedOrder;

  ordersForm: FormGroup  = new FormGroup({
    status: new FormControl(''),
  });


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

  constructor() { }

  ngOnInit(): void {
  }

}
