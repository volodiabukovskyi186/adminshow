import { Component, OnInit } from '@angular/core';
import {PagesService} from "../../pages.service";
import {LocalizationServicesService} from "../services/localization-services.service";
import {BasePage} from "../../@core";
import {FormControl} from "@angular/forms";
import {LanguageService} from "../../../modules/localization/language/language.service";
import {WeightService} from "../services/weight.service";

@Component({
  selector: 'app-unit-weight-page',
  templateUrl: './unit-weight-page.component.html',
  styleUrls: ['./unit-weight-page.component.scss']
})
export class UnitWeightPageComponent extends BasePage implements OnInit {
  arrWeight: Array<any>
  selected: any;
  public descr: FormControl = new FormControl();

  constructor(public pages: PagesService,
              public weightService:WeightService,
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
    this.weightService.getWeight().subscribe(data => {
      this.arrWeight = data.data;
      console.log(this.arrWeight)
    })

  }

  deleteStatus(order): void {
      this.weightService.deleteWeight(order.id).subscribe(data => {
        this.getWeight()
      })
  }

  edit(i) {
    this.selected = i;
    this.openForm();

  }

  save = () => {

    const updateWeight = {
      value: this.selected.value,
      default: null,
      description: this.selected.description,
    }


    if (this.selected.id !== undefined) {
      this.weightService.editWeight(this.selected.id, updateWeight).subscribe(data => {
      })
      this.getWeight()
    }
    else {
      this.weightService.addNewOrderStatus(this.selected.id, updateWeight).subscribe(data => {
        this.getWeight()
      })
    }
    this.closeForm();


  }
  plus = () => {
    this.weightService.initEmptyWeightForm();
    this.selected = this.weightService.selected;
    this.openForm();
  };
}
