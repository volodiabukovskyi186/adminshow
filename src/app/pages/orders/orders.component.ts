import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { OrderService } from './services/order.service';
import { FormControl, FormGroup } from "@angular/forms";
import { BasePage } from "../../pages/@core";
import { PagesService } from '../pages.service';
import { LanguageService } from "src/app/modules/localization/language/language.service";
import { LanguageService as Lang } from "src/app/core/language.service";
import { BreadcrumbsService } from "src/app/core/breadcrumbs.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent extends BasePage implements OnInit {
  orderSideStatus = false;
  ordersForm: FormGroup;
  selectedClientOrder: any;
  ordersFormData: any;
  sendOrdersEditableData: any;

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
    public orderService: OrderService,
    public pages: PagesService,
    public langService: LanguageService,
    public lang: Lang,
    public breadcrumbs: BreadcrumbsService
  ) { 
    super(pages);
  }

  ngOnInit(): void {
    super.initPagesSettings();
    super.initPanelButton();

    this.initTranslate();
    this.generateOrdersForm();
    this.getList();
    console.log(this.getList());
    console.log(this.ordersForm.value);
    
  }

  initTranslate() {
    this.lang.translate
      .get([
        "dashboard.dashboard",
        "MENU.orders.orders",
      ])
      .subscribe((tr: any) => {
        this.breadcrumbs.breadcrumbs = [
          { link: "", title: tr["dashboard.dashboard"] },
          { link: "orders", title: tr["MENU.orders.orders"] },
        ];
      });
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

  edit(selectedOrder) {
    this.selectedClientOrder = selectedOrder;
    console.log(selectedOrder);
    this.openForm();
  }

  sendOrdersFormData(event) {
    this.ordersFormData = event;
    console.log(event);

    this.sendOrdersEditableData = {
      
    }

    console.log(this.sendOrdersEditableData);
  }
}
