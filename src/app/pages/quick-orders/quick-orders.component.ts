import { Component, OnInit } from '@angular/core';
import { BasePage } from "../../pages/@core";
import { PagesService } from '../pages.service';
import { LanguageService as Lang } from "src/app/core/language.service";
import { BreadcrumbsService } from "src/app/core/breadcrumbs.service";
import { TranslateService } from "@ngx-translate/core";
import { OrderService } from '../../pages/orders/services/order.service';
import { UserService } from 'src/app/modules/user/user.service';

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

  constructor(
    public pages: PagesService,
    public lang: Lang,
    public breadcrumbs: BreadcrumbsService,
    public orderService: OrderService,
    public userService: UserService,
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
  }  

  openForm = () => {
    this.pages.panelSettings.form = true;
    this.pages.panelButtonSettings.plus = false;
    this.pages.panelButtonSettings.save = true;
    this.pages.panelButtonSettings.cancel = true;
    this.pages.panelButtonSettings.rightToggle = false;
    this.pages.panelButtonSettings.review = false;
  };

  public quickOrderFiltersFormData(event): void {
    console.log(event);
    this.userQuickOrders.data = event.data;
  }

  public editQuickOrder(quickOrderToEdit): void {
    console.log(quickOrderToEdit);
    this.selectedClientOrder = quickOrderToEdit;
    this.openForm();
  }

  public getQuickOrderList(): void {
    let isOneclickQuickOrder = 1;
    console.log('this.currentUserRoleId ==== >', this.currentUserRoleId);

    this.userService.getByToken().subscribe((res) => {
      this.currentUserRoleId = res.data.user.role_id;

      this.orderService.getList(this.currentUserRoleId, isOneclickQuickOrder).subscribe(((data) => {
        console.log(data);
        this.userQuickOrders = data;
      }))
    });

  }

  pageEvent(event): void {
    this.orderService.order.count = event.length;
    this.orderService.order.take = event.pageSize;
    this.orderService.order.skip = event.pageSize * event.pageIndex;
    this.getQuickOrderList();
  }

}
