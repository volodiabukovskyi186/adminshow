import { CountriesService } from './../../../../pages/localization/services/countries.service';
import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {LanguageService, LanguageService as LocalizationLang} from "../../language/language.service";
import {PaymentService} from "../../../../pages/client/services/payment.service";
import { CountriesModule } from '../countries.module';

@Component({
  selector: 'app-country-form-main',
  templateUrl: './country-form-main.component.html',
  styleUrls: ['./country-form-main.component.scss']
})
export class CountryFormMainComponent implements OnInit {

  @Input() selected;
  arrOrders:Array<any>
  oneOrderStatus:any;
  @Input() public descr: FormControl = new FormControl();
  constructor(public languageService: LocalizationLang,
              public langService: LanguageService,
              public countriesServices:CountriesService,
              public paymentService: PaymentService) {
  }
  ngOnInit(): void {
    this.sub()
  }
  sub():void{
    this.countriesServices.bSubject.subscribe(data=>{
      this.selected = data;
    })
  }

  public langShortTitle = {
    "1": {
      title: 'settings.settingsLangShortTitleEng'
    },
    "2": {
      title: 'settings.settingsLangShortTitleUa'
    },
    "3": {
      title: 'settings.settingsLangShortTitleRus'
    },
    "4": {
      title: 'settings.settingsLangShortTitlePl'
    }
  }

}
