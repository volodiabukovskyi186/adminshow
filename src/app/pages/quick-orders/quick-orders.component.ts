import { Component, OnInit } from '@angular/core';
import { BasePage } from "../../pages/@core";
import { PagesService } from '../pages.service';
import { LanguageService as Lang } from "src/app/core/language.service";
import { BreadcrumbsService } from "src/app/core/breadcrumbs.service";
import { TranslateService } from "@ngx-translate/core";
import { OrderService } from '../../pages/orders/services/order.service';
import { UserService } from 'src/app/modules/user/user.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-quick-orders',
  templateUrl: './quick-orders.component.html',
  styleUrls: ['./quick-orders.component.scss']
})
export class QuickOrdersComponent extends BasePage implements OnInit {
  public showFilters: boolean = false;
  public currentUserRoleId: number;
  public selectedClientOrder: any;
  public userQuickOrders: any;
  public orderhistory: Array<any>;
  public isOpenEditOrderForm: boolean = false;
  public editedOrder: any;
  public userRoleStatus: boolean = false;
  public statusToReview: any;

  constructor(
    public pages: PagesService,
    public lang: Lang,
    public breadcrumbs: BreadcrumbsService,
    public orderService: OrderService,
    public userService: UserService,
    public toastr: ToastrService,
    private translate: TranslateService,
  ) {
    super(pages);
  }

  public ngOnInit(): void {
    super.initPagesSettings();
    super.initPanelButton();

    this.initTranslate();

    //this.getUserByToken();

    this.pages.panelButtonSettings.plus = false;

    this.pages.panelButtonSettings.rightToggle = true;
    this.pages.panelButtonSettings.toggleFilter = false;
    this.pages.onTogleFilterClick = () => {    
      this.showFilters = true;      
      this.openForm();      
    }

    this.getQuickOrderList();
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

  // public getUserByToken(): void {
  //   this.userService.getByToken().subscribe((res) => {
  //     this.currentUserRoleId = res.data.user.role_id;
  //   });
  // }

  closeForm = () => {
    this.pages.panelSettings.form = false;
    this.pages.panelButtonSettings.plus = false;
    this.pages.panelButtonSettings.save = false;
    this.pages.panelButtonSettings.cancel = false;
    this.pages.panelButtonSettings.rightToggle = true;    
    this.pages.panelButtonSettings.review = false;
    this.showFilters = false;
    this.isOpenEditOrderForm = false;
  }  

  openForm = () => {
    this.pages.panelSettings.form = true;
    this.pages.panelButtonSettings.plus = false;

    if (!this.isOpenEditOrderForm) {
      this.pages.panelButtonSettings.save = true;
    }
    
    this.pages.panelButtonSettings.cancel = true;
    this.pages.panelButtonSettings.rightToggle = false;
    this.pages.panelButtonSettings.review = false;
  };

  public quickOrderFiltersFormData(event): void {
    console.log(event);
    this.userQuickOrders.data = event.data;
    this.userQuickOrders.count = event.count;
    this.userQuickOrders.take = event.take;
    if (event.count >= 19) {
      this.userQuickOrders.skip = 20;
    }
  }

  public reviewOrder(quickOrderToEdit): void {
    console.log(quickOrderToEdit);
    this.selectedClientOrder = quickOrderToEdit;
    this.statusToReview = quickOrderToEdit.status_id;

    this.openForm();
    this.orderHistory(quickOrderToEdit.id);
  }

  public getQuickOrderList(): void {
    let isOneclickQuickOrder = 1;
    console.log('this.currentUserRoleId ==== >', this.currentUserRoleId);

    this.userService.getByToken().subscribe((res) => {
      this.currentUserRoleId = res.data.user.role_id;

      if (this.currentUserRoleId === 1) {
        this.userRoleStatus = true;
      }

      this.orderService.getList(this.currentUserRoleId, isOneclickQuickOrder).subscribe(((data) => {
        console.log(data);
        this.userQuickOrders = data;
      }))
    });

  }

  public editQuickOrder(orderToEdit): void {
    console.log(orderToEdit);
    this.editedOrder = orderToEdit;
    this.isOpenEditOrderForm = true;
    this.openForm();
  }

  public seveStatus(OrderStatus): void {
    this.statusToReview = OrderStatus;
  }

  public orderHistory(orderId): void {
    this.orderService.getHistoryById(orderId).subscribe(data => {
      this.orderhistory = data.data;
      console.log('history====>', this.orderhistory[0]);
    });
  }

  save = () => {
    const userOrde = {
      sort_order: this.selectedClientOrder?.sort_order,
      costumer:  this.selectedClientOrder?.costumer, 
      currency_id: this.selectedClientOrder?.currency_id,
      first_name: this.selectedClientOrder?.first_name, 
      last_name: this.selectedClientOrder?.last_name,
      email: this.selectedClientOrder?.email,
      city: this.selectedClientOrder?.city,
      user_id: this.selectedClientOrder?.user_id,
      country: this.selectedClientOrder?.country,
      telephone: this.selectedClientOrder?.telephone,
      status_id: this.statusToReview,
      recipient: this.selectedClientOrder?.recipient,
      recipientLastName: this.selectedClientOrder?.recipientLastName,
      recipientFirstName: this.selectedClientOrder?.recipientFirstName,
      recipientPhone: this.selectedClientOrder?.recipientPhone,
      checkoutDelivery: this.selectedClientOrder?.checkoutDelivery,
      checkoutDeliveryAddress: this.selectedClientOrder?.checkoutDeliveryAddress,
      checkoutPayment: this.selectedClientOrder?.checkoutPayment,
      manufactured_id: this.selectedClientOrder?.manufactured_id,
      total: this.selectedClientOrder?.total,
      is_oneclick: 1
    }

    this.orderService.updateUserOrder(this.selectedClientOrder?.id, userOrde).subscribe(this.putHandler);
  }

  putHandler = (data) => {
    this.getQuickOrderList();
    this.closeForm();
    this.toastr.success('QUICK ORDER UPDATED ^_^') ;
  };

  public updateQuickOrders(event): void {
    console.log(event);
    this.userQuickOrders.data = event.data;
  }

  pageEvent(event): void {
    this.orderService.order.count = event.length;
    this.orderService.order.take = event.pageSize;
    this.orderService.order.skip = event.pageSize * event.pageIndex;
    this.getQuickOrderList();
  }

}
