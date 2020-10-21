import { Component, OnInit } from '@angular/core';
import {PagesService} from "../../pages.service";
import {LocalizationServicesService} from "../services/localization-services.service";
import {BasePage} from "../../@core";
import {FormControl} from "@angular/forms";
import {PaymentService} from "../../client/services/payment.service";
import {LanguageService} from "../../../modules/localization/language/language.service";
import {CountriesService} from "../services/countries.service";
import {BreadcrumbsService} from "../../../core/breadcrumbs.service";
import { ProductFormService } from 'src/app/modules/catalog/product/services/product-form.service';

@Component({
  selector: 'app-countries-page',
  templateUrl: './countries-page.component.html',
  styleUrls: ['./countries-page.component.scss']
})
export class CountriesPageComponent  extends BasePage implements OnInit{
  arrCountries: Array<any>
  selected: any;
  alldata:any;
  public descr: FormControl = new FormControl();

  constructor(public pages: PagesService,
              public countriesServices:CountriesService,
              public langService: LanguageService,
              public breadcrumbs: BreadcrumbsService,
              public prodForm: ProductFormService,
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
      { link: "country", title: " Countries" },
    ];
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
      this.alldata=data;
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
      image_id:this.selected.image_id,
      iso: this.selected.iso,
      description: this.selected.descriptions,
    }
    console.log(updateWeight.image_id)
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

  postHandler = (data) => {
    // this.ngxService.stopAll();
    this.countriesServices.data.data.push(data.data);
    this.countriesServices.data.count++;
    this.closeForm();
    // this.toastr.success("option ADDED");
  };
  // getListHandler = (data) => {
  //     this.ngxService.stopAll();
  //     this.localizationService.data = data;
  // };

  //#region pagination

  pageToHandler(page: number): void {
    this.countriesServices.page = page;
  }
  pagePrevHandler(): void {
    this.countriesServices.page--;
  }
  pageNextHandler(): void {
    this.countriesServices.page++;
  }
  pageChangedHandler(): void {
    this. getWeight();
    window.scrollTo(0, 0);
  }
  Math = Math;

}
