import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IProduct} from "../../../catalog/product/interfaces";
import {CategoryService} from "../../../catalog/category/category.service";
import {ProductCategoryService} from "../../../catalog/product/services/product-category.service";
import {ToastrService} from "ngx-toastr";
import {CountryFormService} from "../services/country-form.service";
import {map, switchMap} from "rxjs/operators";

import { CountryPaymentService } from '../services/country-payment.service';
import { LanguageService } from 'src/app/core/language.service';

@Component({
  selector: 'app-country-form-payment',
  templateUrl: './country-form-payment.component.html',
  styleUrls: ['./country-form-payment.component.scss']
})
export class CountryFormPaymentComponent implements OnInit {
  arrDelivery;
 
  // one:any;
  getItemval:any;
  values=[];
  private _model: IProduct;
  @Input() selectedCountryPayment 
  @Input() selected;
  
  _selectedCountryPayment;

  @Output() modelChange = new EventEmitter();
  set model(val: IProduct) {
    this._model = val;
    this.modelChange.emit(this._model);
    // this.getProdCategory();
  }
  @Input() get model(): IProduct {
    return this._model;
  }
  constructor(
      public category: CategoryService,
      public langService: LanguageService,
      public prodCategory: ProductCategoryService,
      protected toastr: ToastrService,
      public  paymentFormService:CountryPaymentService,
    
  ) {
    
  }
  ngOnInit(): void {
    this.getDevilver()
    this.changeDeliver()
   
  }

  changeDeliver():void{
    this.paymentFormService.changeDeliverPay.subscribe(data=>{
      this.values=data;
    })
  }

  getDevilver(){
      return this.paymentFormService.getDeliver().subscribe(data=>{
            this.arrDelivery=data.data;
            this.values = this.selectedCountryPayment;
          })
  }

  // save prod category
  save() {
    console.log(this.selected.id)
    this.paymentFormService.editDeliver(this.selected.id,this.values).subscribe(data=>{})

  }

  saveHandler = (data) => {
    this.toastr.success("Saved");

  };

}
