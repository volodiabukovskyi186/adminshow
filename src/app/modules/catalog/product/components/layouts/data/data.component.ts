import { WeightService } from './../../../../../../pages/localization/services/weight.service';
import { Component, OnInit, Inject,Input } from '@angular/core';
import { IProduct } from '../../../interfaces';
import { StorageService } from 'src/app/pages/localization/services/storage.service';
import { LanguageService } from 'src/app/modules/localization/language/language.service';
import {TranslateService} from "@ngx-translate/core";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'product-form-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  @Input() model: IProduct;
  constructor( public weightService:WeightService,
               public storageService:StorageService,
               public langService: LanguageService,
               private translate: TranslateService,
               @Inject(DOCUMENT) private document: Document ) {
                this.translate.onLangChange.subscribe(lang => {
                  this.getWeight();
                  this.getStorageStatus();
                })
                }
  arrWeight:any;
  arrStorage:any;
  alldata:any;
  ngOnInit(): void {
    this.getWeight();
    this.getStorageStatus();
  }

 
  getStorageStatus(): void {
    // this.translate.onLangChange.subscribe(lang => {
      const lang=localStorage.getItem('currentLang')
    this.storageService.getStorageStatus(lang).subscribe(data => {
      this.arrStorage = data;
      console.log('hello=>',this.arrStorage)
    // })
  })
  }
  getWeight():void{
    const lang=localStorage.getItem('currentLang')
    // this.translate.onLangChange.subscribe(lang => {
    //   // lang=lang.lang
    //   console.log('language====>',lang)
    // })
      this.weightService.getWeightProd(lang).subscribe(data => {
        this.arrWeight=data
          console.log('weightqqqqqqqqqqq===>',this.arrWeight)
      })
    
  }
  getLangList() {
    this.langService.getLangs().subscribe(this.getLangListHandler);
  }

  getLangListHandler = (data) => {
    this.langService.languages = data;
  };
 

}
