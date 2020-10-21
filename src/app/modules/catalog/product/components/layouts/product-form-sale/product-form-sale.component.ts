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
  arrSelectedSale=[];

  @Input() model: IProduct;

  constructor(
    public productService: ProductService
  ) { }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.model) {
      this.getDiscounts();
    }
  }

  public ngOnInit(): void {
    this.generateProductDiscountForm();
    this.getProductDiscountFormValue();
    this.getDiscounts();
  }

  public generateProductDiscountForm(): void {
    this.productDiscountForm = new FormGroup({
      date_start: new FormControl('', []),
      date_end: new FormControl('', []),
      new_price: new FormControl('', [])
    })
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

  public saveNewPrice(): void {
    this.productService.updateProductPrice(this.productDiscountFormValue).subscribe((res) => {
      this.getDiscounts();
    })
  }

  public addNewPrice(): void {
    this.productDiscountForm.setValue({
      date_start: "",
      date_end: "",
      new_price: ""
    })
  }

  public getDiscounts() {
    this.productService.getProductDiscounts().subscribe((response) => {
      this.productDiscounts = response.data;
      this.productDiscounts = this.productDiscounts.filter((res) => { return res.product_id === this.model.id});
    })
  }

  public deleteSale(discount):void{
    this.arrSelectedSale.push(discount.id);
      if(this.arrSelectedSale.length>0){
        this.arrSelectedSale.forEach((elem,index)=>{
        if(elem==discount.id){
          this.arrSelectedSale.slice(1,index)
        }
      })
      console.log( this.arrSelectedSale)
      }
    // this.arrSelectedSale.forEach((elem,index)=>{

    //   if(elem==discount.id&& this.arrSelectedSale.length>1){ 
    //     
    //     console.log(elem)
    //   }
     
    // })
   
  
    // console.log(this.arrSelectedSale)
  }
}
