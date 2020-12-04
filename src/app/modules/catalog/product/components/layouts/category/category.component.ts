import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from "@angular/core";
import { CategoryService } from "src/app/modules/catalog/category/category.service";
import { ProductCategoryService } from "../../../services/product-category.service";
import { IProduct } from "../../../interfaces";
import { INgxSelectOption } from "ngx-select-ex";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "product-form-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
})
export class CategoryComponent implements OnInit {
  private _model: IProduct;

  @Output() modelChange = new EventEmitter();
  @Input() get model(): IProduct {
    return this._model;
  }

  set model(val: IProduct) {
    this._model = val;
    this.modelChange.emit(this._model);
  }

  constructor(
    public category: CategoryService,
    public prodCategory: ProductCategoryService,
    protected toastr: ToastrService,
  ) {}

  public ngOnInit(): void {}

  // save prod category
  public save(): void {
    this.prodCategory.put(this.model.id).subscribe(this.saveHandler);
  }

  saveHandler = (data) => {
    this.toastr.success("Saved");
  };
}
