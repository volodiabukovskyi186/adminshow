import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {PagesService} from "../../pages.service";
import {LanguageService} from "../../../modules/localization/language/language.service";
import {BasePage} from "../../@core";
import {DeliveryMethodsService} from "../services/delivery-methods.service";

@Component({
  selector: 'app-delivery-methods-page',
  templateUrl: './delivery-methods-page.component.html',
  styleUrls: ['./delivery-methods-page.component.scss']
})
export class DeliveryMethodsPageComponent extends BasePage implements OnInit  {

  arrPayment: Array<any>
  selected: any;
  public descr: FormControl = new FormControl();

  constructor(public pages: PagesService,
              public deliveryService:DeliveryMethodsService,
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
    this.deliveryService.getDelivery().subscribe(data => {
      this.arrPayment = data.data;
    })

  }

  deleteStatus(order): void {
    this.deliveryService.deleteDelivery(order.id).subscribe(data => {
      this.getWeight()
    })
  }

  edit(i) {
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
      })
    }
    else {
      this.deliveryService.addNewDelivery(this.selected.id, updateWeight).subscribe(data => {
        this.getWeight()
      })
    }
    this.closeForm();
  }
  plus = () => {
    this.deliveryService.initEmptyWeightForm();
    this.selected = this.deliveryService.selected;
    this.openForm();
  };

}
