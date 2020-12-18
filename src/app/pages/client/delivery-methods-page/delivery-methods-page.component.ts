import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {PagesService} from "../../pages.service";
import {LanguageService} from "../../../modules/localization/language/language.service";
import {BasePage} from "../../@core";
import {DeliveryMethodsService} from "../services/delivery-methods.service";
import {BreadcrumbsService} from "../../../core/breadcrumbs.service";
import { ToastrService } from 'ngx-toastr';
import { LanguageService as Lang } from "src/app/core/language.service";

import { Router, NavigationEnd, Event } from '@angular/router';
@Component({
  selector: 'app-delivery-methods-page',
  templateUrl: './delivery-methods-page.component.html',
  styleUrls: ['./delivery-methods-page.component.scss']
})
export class DeliveryMethodsPageComponent extends BasePage implements OnInit  {
  alldata:any;
  arrPayment: Array<any>
  selected: any;
  public descr: FormControl = new FormControl();

  constructor(
    public pages: PagesService,
    public deliveryService:DeliveryMethodsService,
    public langService: LanguageService,
    public breadcrumbs: BreadcrumbsService,
    protected toastr: ToastrService,
    public router: Router,
    public lang: Lang
  ) {
    super(pages);
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.getWeight();
      }
    })
  }

  public ngOnInit(): void {
    super.initPagesSettings();
    super.initPanelButton();
    this.initTranslate();
    this.getWeight();
    this.getLangList();
  }

  public initTranslate(): void {
    this.lang.translate
      .get([
        "dashboard.dashboard",
        "MENU.delivery.delivery",
      ])
      .subscribe((tr: any) => {
        this.breadcrumbs.breadcrumbs = [
          { link: "", title: tr["dashboard.dashboard"] },
          { link: "delivery_methods", title: tr["MENU.delivery.delivery"] },
        ];
      });
  }

  public getLangList(): void {
    this.langService.getLangs().subscribe(this.getLangListHandler);
  }

  getLangListHandler = (data) => {
    this.langService.languages = data;
  };


  public getWeight(): void {
    this.deliveryService.getDelivery().subscribe(data => {
      this.arrPayment = data.data;
      this.alldata = data;
    })

  }

  public deleteStatus(order): void {
    this.deliveryService.deleteDelivery(order.id).subscribe(data => {
      this.getWeight()
    })
  }

  public edit(i): void {
    this.selected = i;
    this.openForm();
  }

  save = () => {
    const updateWeight = {

      image_id:null,
      description: this.selected.descriptions,
    }
  
    if (this.selected.id !== undefined) {
      this.deliveryService.editDelivery(this.selected.id, updateWeight).subscribe(data => {
        this.getWeight()
        this.toastr.success("DELIVERY EDIT");
      })
    }
    else {
      this.deliveryService.addNewDelivery(this.selected.id, updateWeight).subscribe(data => {
        this.getWeight()
        this.toastr.success("DELIVERY ADDED");
      })
    }
    this.closeForm();
  }

  plus = () => {
    this.deliveryService.initEmptyWeightForm();
    this.selected = this.deliveryService.selected;
    this.openForm();
  };

  postHandler = (data) => {
    // this.ngxService.stopAll();
    this.deliveryService.data.data.push(data.data);
    this.deliveryService.data.count++;
    this.closeForm();
    // this.toastr.success("option ADDED");
  };
  // getListHandler = (data) => {
  //     this.ngxService.stopAll();
  //     this.localizationService.data = data;
  // };

  //#region pagination
  pageEvent(event): void {
    this.deliveryService.data.count = event.length;
    this.deliveryService.data.take = event.pageSize;
    this.deliveryService.data.skip = event.pageSize*event.pageIndex;
    this.alldata.count = event.length;
    this.alldata.take = event.pageSize;
    this.alldata.skip = event.pageSize * event.pageIndex;
    this.getWeight();
  }

  pageToHandler(page: number): void {
    this.deliveryService.page = page;
  }
  pagePrevHandler(): void {
    this.deliveryService.page--;
  }
  pageNextHandler(): void {
    this.deliveryService.page++;
  }
  pageChangedHandler(): void {
    this.getWeight();
    window.scrollTo(0, 0);
  }
  Math = Math;

}
