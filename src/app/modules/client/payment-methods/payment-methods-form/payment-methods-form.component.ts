import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {LanguageService, LanguageService as LocalizationLang} from "../../../localization/language/language.service";
import {LocalizationServicesService} from "../../../../pages/localization/services/localization-services.service";
import {PaymentService} from "../../../../pages/client/services/payment.service";

@Component({
  selector: 'app-payment-methods-form',
  templateUrl: './payment-methods-form.component.html',
  styleUrls: ['./payment-methods-form.component.scss']
})
export class PaymentMethodsFormComponent implements OnInit {

  @Input() selected;
  arrOrders:Array<any>
  oneOrderStatus:any;
  @Input() public descr: FormControl = new FormControl();

  constructor(public languageService: LocalizationLang,
              public langService: LanguageService,
              public paymentService: PaymentService) {
  }
  ngOnInit(): void {
    this.sub()
  }

  sub():void{
    this.paymentService.bSubject.subscribe(data=>{
      this.selected = data;
    })
    console.log( this.selected)
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
