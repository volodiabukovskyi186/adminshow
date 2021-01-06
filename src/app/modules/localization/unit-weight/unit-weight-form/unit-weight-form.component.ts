import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {LanguageService, LanguageService as LocalizationLang} from "../../language/language.service";
import {LocalizationServicesService} from "../../../../pages/localization/services/localization-services.service";

@Component({
  selector: 'app-unit-weight-form',
  templateUrl: './unit-weight-form.component.html',
  styleUrls: ['./unit-weight-form.component.scss']
})
export class UnitWeightFormComponent implements OnInit {
  @Input() selected;
  arrOrders:Array<any>
  oneOrderStatus:any;
  @Input() public descr: FormControl = new FormControl();

  constructor(public languageService: LocalizationLang,
              public langService: LanguageService,
              public localizeServ: LocalizationServicesService) {
  }
  ngOnInit(): void {
    this.sub()
  }

  sub():void{
    this.localizeServ.bSubject.subscribe(data=>{
      this.selected = data;
    });
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
