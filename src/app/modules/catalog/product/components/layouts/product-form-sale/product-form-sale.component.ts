import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { ProductService } from '../../../services/product.service';
import { IProduct } from "../../../interfaces";

@Component({
  selector: 'app-product-form-sale',
  templateUrl: './product-form-sale.component.html',
  styleUrls: ['./product-form-sale.component.scss']
})
export class ProductFormSaleComponent implements OnInit {
  public productDiscountForm: FormGroup;
  public productDiscountFormValue;
  public productDiscounts;
  public isDiscountExpired: boolean = false;
  public arrSelectedSale = [];

  public selectedDiscountId: number;

  @Input() model: IProduct;

  constructor(
    public productService: ProductService
  ) { }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.model) {
      this.getDiscountById();
      //this.deleteExpiredDiscounts();
    }
  }

  public ngOnInit(): void {
    this.generateProductDiscountForm();
    this.getProductDiscountFormValue();
    this.getDiscountById();
    //this.deleteExpiredDiscounts();
  }

  public generateProductDiscountForm(): void {
    this.productDiscountForm = new FormGroup({
      date_start: new FormControl('', []),
      date_end: new FormControl('', []),
      new_price: new FormControl('', [])
    })
  }

  get formAuthControls(): any {
    return this.productDiscountForm['controls'];
  }

  public getProductDiscountFormValue(): void {
    this.productDiscountForm.valueChanges.subscribe((res) => {
      this.productDiscountFormValue = {
        product_id : this.model?.id,
        role_id: 1,
        points: 0,
        price: this.productDiscountForm.value.new_price,
        quantity: 0,
        date_start: this.productDiscountForm.value.date_start,
        date_end: this.productDiscountForm.value.date_end,
        status: 1
      }
    })
  }

  public saveNewPrice(isNotEmptyDiscount): void {
    let currentDay = new Date();
    let dd = String(currentDay.getDate()).substring(0, 2);
    let mm = String(currentDay.getMonth() + 1).substring(0, 2);
    let yyyy = currentDay.getFullYear();

    let today = mm + '-' + dd + '-' + yyyy;

    if (new Date(this.productDiscountFormValue.date_end) < new Date(today)) {
      this.isDiscountExpired = true;
    }

    if (isNotEmptyDiscount && new Date(this.productDiscountFormValue.date_end) > new Date(today)) {
      this.isDiscountExpired = false;
      this.productService.updateProductPrice(this.productDiscountFormValue).subscribe((res) => {
        this.getDiscountById();
        this.addNewPrice();
      })
    }
  }

  public addNewPrice(): void {
    this.productDiscountForm.setValue({
      date_start: "",
      date_end: "",
      new_price: ""
    })
  }

  public getDiscountById() {
    this.productService.getDiscountById(this.model.id).subscribe((res) => {
      this.productDiscounts = res.data.disconts;
    })
  }

  public selectedDiscount(discountId): void {
    this.selectedDiscountId = discountId;
  }

  public deleteSale(discount): void {
    this.productService.deleteDiscount(discount).subscribe((res) => {
      this.getDiscountById();
    })
  }

  public deleteExpiredDiscounts(discounts): void {
    let currentDay = new Date();
    let dd = String(currentDay.getDate()).substring(0, 2);
    let mm = String(currentDay.getMonth() + 1).substring(0, 2);
    let yyyy = currentDay.getFullYear();

    let today = mm + '-' + dd + '-' + yyyy;

    discounts?.forEach((discount) => {
      if (new Date(discount?.date_end) < new Date(today)) {
        this.deleteSale(discount.id);
      }
    })
  }

  // public getDiscounts() {
  //   this.productService.getProductDiscounts().subscribe((res) => {
  //     this.productDiscounts = res.data;

  //     console.log('this.productDiscounts ======== >>>> before', this.productDiscounts);

  //     this.productDiscounts = this.productDiscounts.filter((val) => { return val.product_id === this.model.id});

  //     this.deleteExpiredDiscounts(this.productDiscounts);

  //     console.log('this.productDiscounts ======== >>>> after', this.productDiscounts);
  //   })
  // }
}
