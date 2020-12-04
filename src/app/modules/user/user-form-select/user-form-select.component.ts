import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoryService } from "../../catalog/category/category.service";
import { ProductCategoryService } from "../../../modules/catalog/product/services/product-category.service";
import { IProduct } from "src/app/modules/catalog/product/interfaces/product";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-form-select',
  templateUrl: './user-form-select.component.html',
  styleUrls: ['./user-form-select.component.scss']
})
export class UserFormSelectComponent implements OnInit {
  private _model: IProduct;
  public allCategories: any[] = [];
  //public values = [];

  @Output() modelChange = new EventEmitter();
  @Input() get model(): IProduct {
    return this._model;
  }

  set model(val: IProduct) {
    this._model = val;
    this.modelChange.emit(this._model);
    // this.getProdCategory();
  }

  constructor(
    public category: CategoryService,
    public prodCategory: ProductCategoryService,
    public toastr: ToastrService
  ) { }

  public ngOnInit(): void {
    console.log('category.all (user.form) ====== >>>>>>>', this.category.all);

    //this.getCategories();
  }

  public getCategories(): void {
    this.category.getList().subscribe((res) => {
      res.data.forEach((val) => {
        console.log(val);
        //this.allCategories.push(val.parents);
        this.category.all.push(val);

        // val.parents.forEach((name) => {
        //   console.log(name);
        //   this.category.all.push(name);
        // })

        console.log('this.allCategories ======= >>>>>', this.allCategories);
      })
    })

    console.log('this.category.all ======= >>>>>', this.category.all);

    //this.category.all = this.allCategories;
  }

  public save(): void {
    this.prodCategory.put(this.model.id).subscribe(this.saveHandler);
  }

  saveHandler = (data) => {
    this.toastr.success("Saved");
  };
}
