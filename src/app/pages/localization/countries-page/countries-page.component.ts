import { Component, OnInit } from '@angular/core';
import {PagesService} from "../../pages.service";
import {LocalizationServicesService} from "../services/localization-services.service";
import {BasePage} from "../../@core";
import {FormControl} from "@angular/forms";
import {PaymentService} from "../../client/services/payment.service";
import {LanguageService} from "../../../modules/localization/language/language.service";
import {CountriesService} from "../services/countries.service";
import {BreadcrumbsService} from "../../../core/breadcrumbs.service";
import { CountryFormService } from 'src/app/modules/localization/countries/services/country-form.service';
import { CountryPaymentService } from 'src/app/modules/localization/countries/services/country-payment.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-countries-page',
  templateUrl: './countries-page.component.html',
  styleUrls: ['./countries-page.component.scss']
})
export class CountriesPageComponent  extends BasePage implements OnInit{
  arrCountries: Array<any>
  selected: any;
  alldata:any;
  selectedCountryDeliver=[];
  selectedCountryPayment=[];

  public descr: FormControl = new FormControl();

  constructor(public pages: PagesService,
              public countriesServices:CountriesService,
              public langService: LanguageService,
              public breadcrumbs: BreadcrumbsService,
              public countryFormService:CountryFormService,
              public countryPaymentService:CountryPaymentService,
          
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
  deleteStatus(country): void {
    this.countriesServices.deleteCountry(country.id).subscribe(data => {
      this.getWeight()
    })
  
  }
  edit(i) {
    this.selected = i;
    this.openForm();
    this.getDeliversCountry()
    this.getPaymentCountry() 
     
  }
 
  save = () => {
    const updateWeight = {
      image_id:this.selected.image_id,
      iso: this.selected.iso,
      description: this.selected.descriptions,
    }
    if (this.selected.id !== undefined) {
      this.countriesServices.editCountry(this.selected.id, updateWeight).subscribe(data => {
      })
      this.getWeight()
    }
    else if(updateWeight.image_id!==null) {
      this.countriesServices.addNewCountry(this.selected.id,  updateWeight).subscribe(data => {
      })
    
      this.countriesServices.addnewCountry.next(true)
      this.getWeight()
    }
    this.closeForm();
  }
 

  getDeliversCountry():void{
    this.selectedCountryDeliver=[]
    this.countryFormService.getDeliversCountry(this.selected.id).subscribe(data=>{
     data.data.deliveries.forEach(elem => {
      this.selectedCountryDeliver.push(elem.delivery_id)
      this.countryFormService.changeDeliver.next(this.selectedCountryDeliver)
     });
     
    })
  }
  getPaymentCountry():void{
    this.selectedCountryPayment=[]
    this.countryPaymentService.getDeliversCountry(this.selected.id).subscribe(data=>{
     data.data.payments.forEach(elem => {
      this.selectedCountryPayment.push(elem.payment_id)
      this.countryPaymentService.changeDeliverPay.next(this.selectedCountryPayment)
     });
    })
  }
  postHandler = (data) => {
  
    this.countriesServices.data.data.push(data.data);
    this.countriesServices.data.count++;
    this.closeForm();
  
  };
  plus = () => {
    this.selectedCountryPayment=[];
    this.selectedCountryDeliver=[];
    this.countriesServices.initEmptyWeightForm();
    this.selected = this.countriesServices.selected;
    this.countryFormService.changeDeliver.next(this.selectedCountryDeliver)
    this.countryPaymentService.changeDeliverPay.next(this.selectedCountryPayment)
    this.openForm();
  };




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
