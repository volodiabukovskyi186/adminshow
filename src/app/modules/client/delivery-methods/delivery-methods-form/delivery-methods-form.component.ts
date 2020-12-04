import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {LanguageService, LanguageService as LocalizationLang} from "../../../localization/language/language.service";
import {PaymentService} from "../../../../pages/client/services/payment.service";
import {DeliveryMethodsService} from "../../../../pages/client/services/delivery-methods.service";

@Component({
  selector: 'app-delivery-methods-form',
  templateUrl: './delivery-methods-form.component.html',
  styleUrls: ['./delivery-methods-form.component.scss']
})
export class DeliveryMethodsFormComponent implements OnInit {


  @Input() selected;
  arrOrders:Array<any>
  oneOrderStatus:any;
  @Input() public descr: FormControl = new FormControl();

  constructor(public languageService: LocalizationLang,
              public langService: LanguageService,
              public deliveryService: DeliveryMethodsService) {

                
  }
  ngOnInit(): void {
    this.sub()
  }

  sub():void{
    this.deliveryService.bSubject.subscribe(data=>{
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
