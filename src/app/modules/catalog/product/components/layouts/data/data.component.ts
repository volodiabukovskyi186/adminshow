import { WeightService } from './../../../../../../pages/localization/services/weight.service';
import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from '../../../interfaces';
import { StorageService } from 'src/app/pages/localization/services/storage.service';
import { LanguageService } from 'src/app/modules/localization/language/language.service';


@Component({
  selector: 'product-form-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  @Input() model: IProduct;
  constructor( public weightService:WeightService,
               public storageService:StorageService,
               public langService: LanguageService,) { }
  arrWeight:any;
  arrStorage:any;
  alldata:any;
  ngOnInit(): void {
    this.getWeight();
    this.getStorageStatus();
  }
  test(i):void{
    // this.model.weight_class_id = i;
  };
  getWeight():void{
    this.weightService.getWeight().subscribe(data => {
      this.arrWeight=data
      console.log(this.arrWeight)
    })
  }
  getStorageStatus(): void {
    this.storageService.getWeight().subscribe(data => {
      this.arrStorage = data;
      console.log(this.arrStorage)
    })
  }
  getLangList() {
    this.langService.getLangs().subscribe(this.getLangListHandler);
  }

  getLangListHandler = (data) => {
    this.langService.languages = data;
  };
 

}
