import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {IProduct} from "../../../catalog/product/interfaces";
import {CategoryService} from "../../../catalog/category/category.service";
import {ProductCategoryService} from "../../../catalog/product/services/product-category.service";
import {ToastrService} from "ngx-toastr";
import {CountryFormService} from "../services/country-form.service";
import {filter, map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-country-form-delivery',
  templateUrl: './country-form-delivery.component.html',
  styleUrls: ['./country-form-delivery.component.scss']
})
export class CountryFormDeliveryComponent implements OnInit {
  arrDelivery;
  itemId:number;
  // one:any;
  getItemval:any;
  private _model: IProduct;
  @Input() selected;
  // @Input() selectedCountryDeliver;
  @Input() selectedCountryDeliver;
  values=[];
  @Output() modelChange = new EventEmitter();
  @Output() deliverChange = new EventEmitter();

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
      public prodCategory: ProductCategoryService,
      protected toastr: ToastrService,
      public  countryFormService:CountryFormService,
    
  ) {
  
  }
  ngOnInit(): void {
    this.getDevilver()
    this.changeDeliver()
  }
  changeDeliver():void{
    this.countryFormService.changeDeliver.subscribe(data=>{

      this.values=data;
    })
  }
 
  getDevilver(){
    return this.countryFormService.getDeliver().subscribe(data=>{
          this.arrDelivery=data.data;
          this.values = this.selectedCountryDeliver;
          this.itemId=this.selected.id;
        })
}
  // save prod category
  save() {
    console.log( this.itemId,this.selected.id)
    this.countryFormService.editDeliver(this.selected.id,this.values ).subscribe(data=>{})
  }
  saveHandler = (data) => {
    this.toastr.success("Saved");
  };
}
