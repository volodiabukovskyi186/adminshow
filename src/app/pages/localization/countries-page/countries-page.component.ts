import { Component, OnInit } from '@angular/core';
import {PagesService} from "../../pages.service";
import {LocalizationServicesService} from "../services/localization-services.service";
import {BasePage} from "../../@core";
import {FormControl} from "@angular/forms";
import {PaymentService} from "../../client/services/payment.service";
import {LanguageService} from "../../../modules/localization/language/language.service";
import {CountriesService} from "../services/countries.service";

@Component({
  selector: 'app-countries-page',
  templateUrl: './countries-page.component.html',
  styleUrls: ['./countries-page.component.scss']
})
export class CountriesPageComponent  extends BasePage implements OnInit{
  arrCountries: Array<any>
  selected: any;
  public descr: FormControl = new FormControl();

  constructor(public pages: PagesService,
              public countriesServices:CountriesService,
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
    this.countriesServices.getCountry().subscribe(data => {
      this.arrCountries = data.data;
    })

  }

  deleteStatus(order): void {
    this.countriesServices.deleteCountry(order.id).subscribe(data => {
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
      iso: this.selected.iso,
      description: this.selected.descriptions,
    }
    if (this.selected.id !== undefined) {
      this.countriesServices.editCountry(this.selected.id, updateWeight).subscribe(data => {
      })
      this.getWeight()
    }
    else {
      this.countriesServices.addNewCountry(this.selected.id, updateWeight).subscribe(data => {
        this.getWeight()
      })
    }
    this.closeForm();
  }
  plus = () => {
    this.countriesServices.initEmptyWeightForm();
    this.selected = this.countriesServices.selected;
    this.openForm();
  };

}
