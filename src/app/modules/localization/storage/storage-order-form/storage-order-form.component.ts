import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {LanguageService, LanguageService as LocalizationLang} from "../../language/language.service";
import {PaymentService} from "../../../../pages/client/services/payment.service";
import {StorageService} from "../../../../pages/localization/services/storage.service";

@Component({
  selector: 'app-storage-order-form',
  templateUrl: './storage-order-form.component.html',
  styleUrls: ['./storage-order-form.component.scss']
})
export class StorageOrderFormComponent implements OnInit {

  @Input() selected;
  arrOrders:Array<any>
  oneOrderStatus:any;
  @Input() public descr: FormControl = new FormControl();

  constructor(public languageService: LocalizationLang,
              public langService: LanguageService,
              public storageService:StorageService,) {
  }
  ngOnInit(): void {
    
    this.sub()
    console.log( 'this.selected===>',this.langService.getFromList(1).flag)
  }

  sub():void{
    this.storageService.bSubject.subscribe(data=>{
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
