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
import { RoleService } from 'src/app/core/auth/models/role.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent extends BasePage implements OnInit, OnChanges {
  public orderSideStatus = false;
  public ordersForm: FormGroup;
  public selectedClientOrder: any;
  public ordersFormData: any;
  public sendOrdersEditableData: any;
  public status: any;
  public userOrders: any;

  public showFilters: boolean = false;
  public currentUserRoleId: number;
  public totalSum: string;
  public isOpenEditOrderForm: boolean = false;
  public editedOrder: any;
  public userRoleId:number;
  public userRoleStatus:boolean=false;
  public orderhistory: Array <any>;
  public statusCodes = {
    "1": {
      name: 'statusCodes.new'
    },
    "2": {
      name: 'statusCodes.approved'
    },
    "3": {
      name: 'statusCodes.canceled'
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
    public userService: UserService,
    public roleService: RoleService
    
  ) { 
    super(pages);

    this.translate.onLangChange.subscribe(lang => {
      // this.getList();
      this.getUserByTokin()
    })
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.pages.panelButtonSettings.plus = false;
    this.getList();
  }

  public ngOnInit(): void {
    super.initPagesSettings();
    super.initPanelButton();
    this.initTranslate();
    this.generateOrdersForm();
    this.getUserByTokin()
  
    this.pages.panelButtonSettings.plus = false;
    this.pages.panelButtonSettings.rightToggle = true;
    this.pages.panelButtonSettings.save = false;
    this.pages.panelButtonSettings.toggleFilter = false;
    this.pages.onTogleFilterClick = () => {    
      this.showFilters = true;      
      this.openForm();      
    }

    this.getClient();
    this.getUserRoleId();
  }
  
  public getUserByTokin(): void {
    this.roleService.getByToken().subscribe(data=>{
      this.userRoleId = data.data.user.role_id;

      if (this.userRoleId === 1) {
        this.userRoleStatus = true;
      }
      this.getList(this.userRoleId);
    })
  }

  public uodateAllItems(): void {
    this.orderService.getList(this.userRoleId).subscribe(data => {
      this.orderService.order = data;
    })
  }

  public getClient(): void {
    this.orderService.getList(this.userRoleId).subscribe(data => {
      this.userOrders = data;
    })
  }

  public getUserRoleId(): void {
    this.userService.getByToken().subscribe((res) => {
      this.currentUserRoleId = res.data.user.role_id;
    });
  }

  public initTranslate(): void {
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


  public generateOrdersForm(): void {
    this.ordersForm = new FormGroup({
      status: new FormControl(""),
    });
  }

  public getList(role_id?): void {
    this.ngxService.start();
    this.orderService.getList(role_id).subscribe((res) => {
      console.log(res);
      this.getListHandler(res);
    });
  }

  getListHandler = (data) => {
    this.ngxService.stopAll();
    this.orderService.order = data;
    console.log('order00000===>', this.orderService.order);
    this.totalSum = '\xa0' + this.orderService.order.sum + '\xa0';
    this.orderService.order.data.forEach((val) => {
      this.ordersForm.get('status').setValue(this.statusCodes[val.status_id]);
    })
  };

  initPagesSettings = () =>{
    super.initPagesSettings();
    this.pages.panelButtonSettings.toggleFilter = false;
  }

  public orderFiltersFormData(event): void {
    this.orderService.order.data = event.data;
    this.totalSum = event.sum;
    this.closeForm();
  }

  public seveStatus(OrderStatus): void {
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
      total: this.selectedClientOrder.total ,
    };

    this.orderService.updateUserOrder(this.selectedClientOrder.id, userOrde).subscribe((data) => {
      this.uodateAllItems();
    });
    this.closeForm();
  }


  public reviewOrder(selectedOrder): void {

    this.selectedClientOrder = selectedOrder;
    this.userOrders = selectedOrder.status_id;
    this.openForm();
    this.orderHistory(selectedOrder.id)
  }
  orderHistory(orderId): void {
    this.orderService.getHistoryById(orderId).subscribe(data => {
      this.orderhistory = data.data;
      console.log('history====>', this.orderhistory[0]);
    });
  }

  public sendOrdersFormData(event): void {
    this.ordersFormData = event;
  }

  public openEditOrder(orderToEdit): void {

    this.editedOrder = orderToEdit;
    this.isOpenEditOrderForm = true;
    this.openForm();
  }


  closeForm = () => {
    this.pages.panelSettings.form = false;
    this.pages.panelButtonSettings.plus = false;
    this.pages.panelButtonSettings.save = false;
    this.pages.panelButtonSettings.cancel = false;
    this.pages.panelButtonSettings.rightToggle = true;
    this.showFilters = false;
    this.isOpenEditOrderForm = false;
  }  ;

  openForm = () => {
    this.pages.panelSettings.form = true;
    this.pages.panelButtonSettings.plus = false;
    this.pages.panelButtonSettings.save = true;
    this.pages.panelButtonSettings.cancel = true;
    this.pages.panelButtonSettings.rightToggle = false;
  };

  pageEvent(event): void {
    this.orderService.order.count = event.length;
    this.orderService.order.take = event.pageSize;
    this.orderService.order.skip = event.pageSize * event.pageIndex;
    this.getList(this.userRoleId);
  }

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
