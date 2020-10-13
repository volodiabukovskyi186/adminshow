import { Component, OnInit } from '@angular/core';
import {PagesService} from "../../pages.service";
import {LocalizationServicesService} from "../../localization/services/localization-services.service";
import {BasePage} from "../../@core";
import {FormControl} from "@angular/forms";
import {WeightService} from "../../localization/services/weight.service";
import {LanguageService} from "../../../modules/localization/language/language.service";
import {PaymentService} from "../services/payment.service";

@Component({
  selector: 'app-payment-methods-page',
  templateUrl: './payment-methods-page.component.html',
  styleUrls: ['./payment-methods-page.component.scss']
})
export class PaymentMethodsPageComponent extends BasePage implements OnInit {

  arrPayment: Array<any>
  selected: any;
  public descr: FormControl = new FormControl();

  constructor(public pages: PagesService,
              public paymentService:PaymentService,
              public langService: LanguageService,
  ) {
    super(pages);
  }

  ngOnInit(): void {
    super.initPagesSettings();
    super.initPanelButton();
    this.getWeight();
    this.getLangList();
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
      this.paymentService.editWeight(this.selected.id, updateWeight).subscribe(data => {
      })
      this.getWeight()
    }
    else {
      this.paymentService.addNewOrderStatus(this.selected.id, updateWeight).subscribe(data => {
        this.getWeight()
      })
    }
    this.closeForm();


  }
  plus = () => {
    this.paymentService.initEmptyWeightForm();
    this.selected = this.paymentService.selected;
    this.openForm();
  };

}
