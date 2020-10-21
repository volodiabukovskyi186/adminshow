import { Component, OnInit, SimpleChanges } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { OrderService } from './services/order.service';
import { FormControl, FormGroup } from "@angular/forms";
import { BasePage } from "../../pages/@core";
import { PagesService } from '../pages.service';
import { LanguageService } from "src/app/modules/localization/language/language.service";
import { LanguageService as Lang } from "src/app/core/language.service";
import { BreadcrumbsService } from "src/app/core/breadcrumbs.service";
import { LocalizationServicesService } from '../localization/services/localization-services.service';

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
  status:any;
  userOrders:any;

  public statusCodes = {
    "1": {
      name: 'statusCodes.new',
      //color: '#42996F'
    },
    "2": {
      name: 'statusCodes.approved',
      //color: '#ffff00'
    },
    "3": {
      name: 'statusCodes.canceled',
      //color: '#ff0000'
    }
  }

  constructor(
    protected ngxService: NgxUiLoaderService,
    public orderService: OrderService,
    public pages: PagesService,
    public langService: LanguageService,
    public lang: Lang,
    public breadcrumbs: BreadcrumbsService,
    public localizationService: LocalizationServicesService,
  ) { 
    super(pages);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.pages.panelButtonSettings.save = false;
    this.pages.panelButtonSettings.plus = false;
  }

  ngOnInit(): void {
    super.initPagesSettings();
    super.initPanelButton();
    this.initTranslate();
    this.generateOrdersForm();
    this.getList();
    this.getStatus()
    this.getClient()
    // console.log(this.getList());
    // console.log(this.ordersForm.value);
    // this.pages.panelButtonSettings.save = false;
    this.pages.panelButtonSettings.plus = false;
    this.pages.panelButtonSettings.rightToggle = true;
  }
  getStatus(): void {
    this.localizationService.getOrderStatus().subscribe(
        data => {
        this.status = data.data;
        // console.log(this.status)
    })
  }
  getClient():void{
    this.orderService.getList().subscribe(data=>{
      // this.userOrders=data;
      // console.log(this.userOrders)
    })
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
  seveStatus(OrderStatus):void{
  this.userOrders=OrderStatus
  }
  save=()=>{
    const userOrde={
      sort_order: this.selectedClientOrder.sort_order,
      costumer:  this.selectedClientOrder.costumer, 
      currency_id: this.selectedClientOrder.currency_id,
      first_name: this.selectedClientOrder.first_name, 
      last_name: this.selectedClientOrder.last_name,
      email: this.selectedClientOrder.email,
      city: this.selectedClientOrder.city,
      user_id: this.selectedClientOrder.user_id,
      country: this.selectedClientOrder.country,
      telephone: this.selectedClientOrder.telephone,
      status_id: this.userOrders,
      recipient: this.selectedClientOrder.recipient,
      recipientLastName: this.selectedClientOrder.recipientLastName,
      recipientFirstName: this.selectedClientOrder.recipientFirstName,
      recipientPhone: this.selectedClientOrder.recipientPhone,
      checkoutDelivery: this.selectedClientOrder.checkoutDelivery,
      checkoutDeliveryAddress: this.selectedClientOrder.checkoutDeliveryAddress,
      checkoutPayment: this.selectedClientOrder.checkoutPayment,
      manufactured_id: this.selectedClientOrder.manufactured_id,
      total: this.selectedClientOrder.total 
    }
    console.log('orderStatus+==>',userOrde)
    this.orderService.UpdateUserOrder(this.selectedClientOrder.id,userOrde).subscribe(data=>{
    })
    this.closeForm();
  
  }


  reviewOrder(selectedOrder) {
    console.log(selectedOrder.status_id);
    this.selectedClientOrder = selectedOrder;
    this.userOrders=selectedOrder.status_id
    this.openForm();
  }

  sendOrdersFormData(event) {
    this.ordersFormData = event;
    console.log(event);
    // this.sendOrdersEditableData = {
    // }
    // console.log(this.sendOrdersEditableData);
  }

  closeForm = () => {
    this.pages.panelSettings.form = false;
    this.pages.panelButtonSettings.plus = false;
    // this.pages.panelButtonSettings.save = false;
    this.pages.panelButtonSettings.cancel = false;
    this.pages.panelButtonSettings.rightToggle = true;
  }  

  openForm = () => {
    this.pages.panelSettings.form = true;
    this.pages.panelButtonSettings.plus = false;
    this.pages.panelButtonSettings.save = true;
    this.pages.panelButtonSettings.cancel = true;
    this.pages.panelButtonSettings.rightToggle = false;
  };
}
