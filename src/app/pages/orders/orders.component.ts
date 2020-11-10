import { Component, OnInit, SimpleChanges,OnChanges } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { OrderService } from './services/order.service';
import { FormControl, FormGroup } from "@angular/forms";
import { BasePage } from "../../pages/@core";
import { PagesService } from '../pages.service';
import { LanguageService } from "src/app/modules/localization/language/language.service";
import { LanguageService as Lang } from "src/app/core/language.service";
import { BreadcrumbsService } from "src/app/core/breadcrumbs.service";
import { LocalizationServicesService } from '../localization/services/localization-services.service';
import { TranslateService } from "@ngx-translate/core";
import { UserService } from '../../modules/user/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent extends BasePage implements OnInit,OnChanges {
  orderSideStatus = false;
  ordersForm: FormGroup;
  selectedClientOrder: any;
  ordersFormData: any;
  sendOrdersEditableData: any;
  status:any;
  userOrders:any;

  public showFilters: boolean = false;
  public currentUserRoleId: number;
  public totalSum: string;

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
    private translate: TranslateService,
    public localizationService: LocalizationServicesService,
    public userService: UserService
  ) { 
    super(pages);

    this.translate.onLangChange.subscribe(lang => {
       this.getList()
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.pages.panelButtonSettings.save = false;
    this.pages.panelButtonSettings.plus = false;
    // console.log('updateItems=====>',this.orderService.order)
    this.getList()
    
  }


  ngOnInit(): void {
    super.initPagesSettings();
    super.initPanelButton();
    this.initTranslate();
    this.generateOrdersForm();
    this.getList();
    this.getClient()
   
    this.pages.panelButtonSettings.plus = false;
    this.pages.panelButtonSettings.rightToggle = true;
    this.pages.panelButtonSettings.save = false;

    this.pages.panelButtonSettings.toggleFilter = false;
    this.pages.onTogleFilterClick = () => {    
      this.showFilters = true;      
      this.openForm();      
    }

    this.getUserRoleId();
  }

  uodateAllItems(): void{
    this.orderService.getList().subscribe(data => {
      this.orderService.order = data;
    })
  }

  getClient():void {
    this.orderService.getList().subscribe(data => {
      this.userOrders = data;
      console.log(this.userOrders);
    })
  }

  getUserRoleId(): void {
    this.userService.getByToken().subscribe((res) => {
      this.currentUserRoleId = res.data.user.role_id;

      console.log(this.currentUserRoleId);
    });
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
    this.orderService.getList().subscribe(
      this.getListHandler
    );
  }

  getListHandler = (data) => {
    this.ngxService.stopAll();
    this.orderService.order = data;
    this.totalSum = '\xa0' + this.orderService.order.sum + '\xa0';

    console.log(this.orderService.order);

    this.orderService.order.data.forEach((val) => {
      this.ordersForm.get('status').setValue(this.statusCodes[val.status_id]);
    })
  };

  initPagesSettings = () =>{
    super.initPagesSettings();
    this.pages.panelButtonSettings.toggleFilter = false;
  }

  orderFiltersFormData(event): void {
    this.orderService.order.data = event.data;

    console.log(event);

    this.closeForm();
  }

  seveStatus(OrderStatus): void{
    this.userOrders = OrderStatus;
  }

  save = () => {
    const userOrde = {
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

    this.orderService.UpdateUserOrder(this.selectedClientOrder.id,userOrde).subscribe(data=>{
      // this.getStatus();
      this.uodateAllItems()
    })

    this.closeForm();
  
  }


  reviewOrder(selectedOrder) {
    console.log(selectedOrder.status_id);
    this.selectedClientOrder = selectedOrder;
    this.userOrders = selectedOrder.status_id
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
    this.pages.panelButtonSettings.save = false;
    this.pages.panelButtonSettings.cancel = false;
    this.pages.panelButtonSettings.rightToggle = true;
    this.showFilters = false;
  }  

  openForm = () => {
    this.pages.panelSettings.form = true;
    this.pages.panelButtonSettings.plus = false;
    this.pages.panelButtonSettings.save = false;
    this.pages.panelButtonSettings.cancel = true;
    this.pages.panelButtonSettings.rightToggle = false;
  };

  //#region pagination

  pageToHandler(page: number): void {
    this.orderService.page = page;
  }
  pagePrevHandler(): void {
    this.orderService.page--;
  }
  pageNextHandler(): void {
    this.orderService.page++;
  }
  pageChangedHandler(): void {
    this.getList();
    window.scrollTo(0, 0);
  }
  Math = Math;
}
