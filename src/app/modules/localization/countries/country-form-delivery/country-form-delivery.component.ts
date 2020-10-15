import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  values=[1,3]
  // one:any;
  getItemval:any;
  private _model: IProduct;
  @Input() selected;
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
      public prodCategory: ProductCategoryService,
      protected toastr: ToastrService,
      public  countryFormService:CountryFormService,

  ) {}
  ngOnInit(): void {

    let arr=new Set();
    this.getItem().pipe(
        map(resp=>arr.add(resp.data.map(item=>item.delivery_id))),
        switchMap(()=>this.getDevilver()),
        map(resp=>resp.data),
    ).subscribe(resp=>{
      this.arrDelivery=resp
      this.values=resp.filter(resp=>arr.has(resp.id));
      console.log(this.values)
    })
  }
  getItem(){
    return this.countryFormService.getCountryDelivers()
    // .subscribe(
    //   data=>{
    // this.getItemval=data;
    // this.one=data.data.map(item=>({id:item.delivery_id,title:`${item.delivery_id}aaa`}))
    //  console.log(this.one)
    // }
    // )
  }

  getDevilver(){
      return this.countryFormService.getDeliver();
          // console.log(this.countryFormService.getDeliver())
          // .subscribe(data=>{
          //   this.arrDelivery=data.data;
          //   console.log(this.arrDelivery)
          // })
  }
  // save prod category
  save() {
    this.countryFormService.editDeliver(this.selected.id,this.values).subscribe(data=>{})
  }

  saveHandler = (data) => {
    this.toastr.success("Saved");
  };

}
