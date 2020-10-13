import { Component, OnInit } from '@angular/core';
import {BasePage} from "../../@core";
import {PagesService} from "../../pages.service";
import {FormControl} from "@angular/forms";
import {PaymentService} from "../../client/services/payment.service";
import {LanguageService} from "../../../modules/localization/language/language.service";
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-storage-status-page',
  templateUrl: './storage-status-page.component.html',
  styleUrls: ['./storage-status-page.component.scss']
})
export class StorageStatusPageComponent extends BasePage implements OnInit {
  arrStorage: Array<any>
  selected: any;
  public descr: FormControl = new FormControl();

  constructor(public pages: PagesService,
              public storageService:StorageService,
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
    this.storageService.getWeight().subscribe(data => {
      this.arrStorage = data.data;
      console.log(this.arrStorage)
    })

  }

  deleteStatus(order): void {
    this.storageService.deleteWeight(order.id).subscribe(data => {
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
      color:this.selected.color,
      description: this.selected.descriptions,
    }
    if (this.selected.id !== undefined) {
      this.storageService.editWeight(this.selected.id, updateWeight).subscribe(data => {
      })
      this.getWeight()
    }
    else {
      this.storageService.addNewOrderStatus(this.selected.id, updateWeight).subscribe(data => {
        this.getWeight()
      })
    }
    this.closeForm();


  }
  plus = () => {
    this.storageService.initEmptyWeightForm();
    this.selected = this.storageService.selected;
    this.openForm();
  };

}
