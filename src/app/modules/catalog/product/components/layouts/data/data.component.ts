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

  public arrWeight: any;
  public arrStorage: any;
  public alldata: any;

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

  public ngOnInit(): void {
    this.getWeight();
    this.getStorageStatus();
  }

  public getStorageStatus(): void {
    // this.translate.onLangChange.subscribe(lang => {
    const lang = localStorage.getItem('currentLang');

    this.storageService.getStorageStatus(lang).subscribe(data => {
    this.arrStorage = data;
    // })
    })
  }

  public getWeight(): void {
    const lang = localStorage.getItem('currentLang');
    // this.translate.onLangChange.subscribe(lang => {
    //   // lang=lang.lang
    // })
      this.weightService.getWeightProd(lang).subscribe(data => {
        this.arrWeight = data;
      })
    
  }
  
  getLangList() {
    this.langService.getLangs().subscribe(this.getLangListHandler);
  }

  getLangListHandler = (data) => {
    this.langService.languages = data;
  };
}
