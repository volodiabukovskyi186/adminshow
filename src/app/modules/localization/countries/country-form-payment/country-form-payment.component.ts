import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IProduct} from "../../../catalog/product/interfaces";
import {CategoryService} from "../../../catalog/category/category.service";
import {ProductCategoryService} from "../../../catalog/product/services/product-category.service";
import {ToastrService} from "ngx-toastr";
import {CountryFormService} from "../services/country-form.service";
import {map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-country-form-payment',
  templateUrl: './country-form-payment.component.html',
  styleUrls: ['./country-form-payment.component.scss']
})
export class CountryFormPaymentComponent implements OnInit {
  private _model;
  @Output() modelChange = new EventEmitter();
  @Input() selected;
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
  ) {}
  ngOnInit(): void {}
  // save prod category
  save() {
    this.prodCategory.put(this.model.id).subscribe(this.saveHandler);
  }
  saveHandler = (data) => {
    this.toastr.success("Saved");
  };

}
