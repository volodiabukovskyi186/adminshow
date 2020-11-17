import { Component, OnInit } from '@angular/core';
import {PagesService} from "../../pages.service";
import {LocalizationServicesService} from "../../localization/services/localization-services.service";
import {BasePage} from "../../@core";
import {FormControl} from "@angular/forms";
import {WeightService} from "../../localization/services/weight.service";
import {LanguageService} from "../../../modules/localization/language/language.service";
import {PaymentService} from "../services/payment.service";
import {BreadcrumbsService} from "../../../core/breadcrumbs.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-methods-page',
  templateUrl: './payment-methods-page.component.html',
  styleUrls: ['./payment-methods-page.component.scss']
})
export class PaymentMethodsPageComponent extends BasePage implements OnInit {

  arrPayment: Array<any>
  selected: any;
  alldata:any;
  public descr: FormControl = new FormControl();

  constructor(public pages: PagesService,
              public paymentService:PaymentService,
              public langService: LanguageService,
              public breadcrumbs: BreadcrumbsService,
              protected toastr: ToastrService,
  ) {
    super(pages);
  }

  ngOnInit(): void {
    super.initPagesSettings();
    super.initPanelButton();
    this.getWeight();
    this.getLangList();

    this.breadcrumbs.breadcrumbs = [
      { link: "", title: "Dashboard" },
      { link: "unit_weight", title: " Payment" },
    ];
  }


  getLangList() {
    this.langService.getLangs().subscribe(this.getLangListHandler);
  }

  getLangListHandler = (data) => {
    this.langService.languages = data;
  };


  getWeight(): void {

    this.paymentService.getWeight().subscribe(data => {
      this.arrPayment = data.data;
      this.alldata=data
      console.log(this.arrPayment)
    })

  }

  deleteStatus(order): void {
    this.paymentService.deleteWeight(order.id).subscribe(data => {
      this.getWeight()
    })
  }

  edit(i) {
    this.selected = i;
    console.log(this.selected)
    this.openForm();
  }

  save = () => {
    const updateWeight = {

      image_id:null,
      description: this.selected.descriptions,
    }
   
    if (this.selected.id !== undefined) {
      console.log(this.selected.descriptions)
      this.paymentService.editPayment(this.selected.id, updateWeight).subscribe(data => {
      })
      this.getWeight()
      this.toastr.success("PAYMENT EDIT");
    }
    else {
      this.paymentService.addNewOrderStatus(this.selected.id, updateWeight).subscribe(data => {
        this.getWeight()
        this.toastr.success("PAYMENT ADDED");
      })
    }
    this.closeForm();


  }
  plus = () => {
    this.paymentService.initEmptyWeightForm();
    this.selected = this.paymentService.selected;
    this.openForm();
  };

  postHandler = (data) => {
    // this.ngxService.stopAll();
    this.paymentService.data.data.push(data.data);
    this.paymentService.data.count++;
    this.closeForm();
    // this.toastr.success("option ADDED");
  };
  // getListHandler = (data) => {
  //     this.ngxService.stopAll();
  //     this.localizationService.data = data;
  // };

  //#region pagination
  pageEvent(event):void{
    this.paymentService.data.count=event.length
    this.paymentService.data.take=event.pageSize
    this.paymentService.data.skip=event.pageSize*event.pageIndex
    this.getWeight();
  }

  pageToHandler(page: number): void {
    this.paymentService.page = page;
  }
  pagePrevHandler(): void {
    this.paymentService.page--;
  }
  pageNextHandler(): void {
    this.paymentService.page++;
  }
  pageChangedHandler(): void {
    this.getWeight();
    window.scrollTo(0, 0);
  }
  Math = Math;

}
