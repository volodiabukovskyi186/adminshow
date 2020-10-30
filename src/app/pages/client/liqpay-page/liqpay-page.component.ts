
import { Component, OnInit } from '@angular/core';
import { PaymentSystemService } from './../services/payment-system.service';
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
  selector: 'app-liqpay-page',
  templateUrl: './liqpay-page.component.html',
  styleUrls: ['./liqpay-page.component.scss']
})
export class LiqpayPageComponent extends BasePage implements OnInit {

  liqPay;
  selected: any;
  alldata:any;
  public descr: FormControl = new FormControl();

  constructor(public pages: PagesService,
              public paymentSystemService:PaymentSystemService,
              public  paymentService:PaymentService,
              public langService: LanguageService,
              public breadcrumbs: BreadcrumbsService,
              protected toastr: ToastrService,
  ) {
    super(pages);
  }

  ngOnInit(): void {
    super.initPagesSettings();
    super.initPanelButton();

    this.getLangList();

    this.breadcrumbs.breadcrumbs = [
      { link: "", title: "Dashboard" },
      { link: "liqpay", title: " Liqpay" },
    ];
    this.getPayment()
    this.pages.panelButtonSettings.plus = false;
  }


  getLangList() {
    this.langService.getLangs().subscribe(this.getLangListHandler);
  }

  getLangListHandler = (data) => {
    this.langService.languages = data;
  };


  getPayment(): void {
    this.paymentSystemService.getLiqpay().subscribe(data => {
      this.liqPay = data.data;
      this.alldata=data
    
    })

  }



  edit(i) {
    this.selected = i;
    this.pages.panelButtonSettings.plus = false;
    this.openForm();
  }
  cancel=()=>{
    
    this.closeForm();
    this.pages.panelButtonSettings.plus = false;
  }

  save = () => {
    const updateLiqpay = {
      private_key:this.selected.private_key,
      public_key: this.selected.public_key,
      status:this.selected.status
    }
    this.paymentSystemService.updateLiqpay(updateLiqpay).subscribe(data=>{
      this.getPayment()
      this.pages.panelButtonSettings.plus = false;
    })

    // if (this.selected.id !== undefined) {
    //   console.log(this.selected.descriptions)
    //   this.paymentService.editPayment(this.selected.id, updateWeight).subscribe(data => {
    //   })

    //   this.toastr.success("PAYMENT EDIT");
    // }
    // else {
    //   this.paymentService.addNewOrderStatus(this.selected.id, updateWeight).subscribe(data => {

    //     this.toastr.success("PAYMENT ADDED");
    //   })
    // }
    this.closeForm();
  }
  plus = () => {
    this.paymentService.initEmptyWeightForm();
    this.selected = this.paymentService.selected;
    this.openForm();
  };


  postHandler = (data) => {
    this.paymentService.data.data.push(data.data);
    this.paymentService.data.count++;
    this.closeForm();
  };


  //#region pagination

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

    window.scrollTo(0, 0);
  }
  Math = Math;

}
