import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PromotionService } from '../../../modules/catalog/promotion/services/promotion.service';
import { Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-edit-order-form',
  templateUrl: './edit-order-form.component.html',
  styleUrls: ['./edit-order-form.component.scss']
})
export class EditOrderFormComponent implements OnInit, OnChanges {
  @Input() selectedClientOrder;

  public editClientInfoForm: FormGroup;
  public clientInfoForm: FormGroup;
  public productQuantityForm: FormGroup;
  public addProductForm: FormGroup;

  public displayProducts: any;
  public filteredProducts = new BehaviorSubject([]);
  public filteredProducts$ = this.filteredProducts.asObservable();

  public isSelectedProduct: boolean = false;
  public selectedProduct: any;
  public products = [];
  public orderTotal ;

  constructor(
    public promotionService: PromotionService
  ) { }

  public ngOnInit(): void {
    console.log(this.selectedClientOrder);
    
    this.generateClientInfoForm();
    this.generateAddProductForm();
    this.generateEditClientInfoForm();
    this.generateProductQuantityForm();

    this.setClientInfo();
    this.setClientPaymentDeliveryDetails();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedClientOrder) {
      // this.clientInfoForm?.reset();
      // this.editClientInfoForm?.reset();

      this.products = [];

      this.selectedClientOrder.products.forEach((val) => {
        if (val.hasOwnProperty('product')) {
          //this.orderTotal = '' || this.selectedClientOrder?.total;
          //this.orderTotal += val.quantity * val.price;
          this.products.push(val.product);
        }
      })

      console.log(this.products);
    }
  }

  public generateEditClientInfoForm(): void {
    this.editClientInfoForm = new FormGroup({
      paymentMethod: new FormControl('', []),
      deliveryMethod: new FormControl('', []),
      details: new FormControl('', [])
    })
  }

  public setClientPaymentDeliveryDetails(): void {
    // this.editClientInfoForm.setValue({
    //   paymentMethod: "",
    //   deliveryMethod: "",
    //   details: ""
    // })

    this.editClientInfoForm?.setValue({
      paymentMethod: this.selectedClientOrder.checkoutPayment,
      deliveryMethod: this.selectedClientOrder.checkoutDelivery,
      details: this.selectedClientOrder.checkoutDeliveryAddress
    })
  }

  public generateClientInfoForm(): void {
    this.clientInfoForm = new FormGroup({
      name: new FormControl('', []),
      surname: new FormControl('', []),
      phone: new FormControl('', []),
      email: new FormControl('', []),
    })
  }

  public setClientInfo(): void {
    // this.clientInfoForm.setValue({
    //   name: "",
    //   surname: "",
    //   phone: "",
    //   email: "",
    // })

    this.clientInfoForm?.setValue({
      name: this.selectedClientOrder.recipientLastName,
      surname: this.selectedClientOrder.recipientFirstName,
      phone: this.selectedClientOrder.recipientPhone,
      email: this.selectedClientOrder.email,
    })
  }

  public generateAddProductForm(): void {
    this.addProductForm = new FormGroup({
      selectProduct: new FormControl('', []),
      productQuantity: new FormControl('', [])
    })
  }

  public deleteProduct(product): void {
    console.log(product);
  }

  public modifyPrice(price: string): string {
    return Number(price).toFixed(2);
  }

  public modifyQuantity(quantity: string): string {
    return Number(quantity).toFixed(0);
  }

  public generateProductQuantityForm(): void {
    this.productQuantityForm = new FormGroup({
      quantity: new FormControl('', [])
    })
  }

  public getProducts(): void {
    this.isSelectedProduct = true;

    this.promotionService.getAllProducts().subscribe((res) => {
      this.displayProducts = res.data.products;
      this.filteredProducts.next(this.displayProducts);
    })
  }

  public getSelectedProduct(currentProduct): void {
    this.isSelectedProduct = false;
    // this.productName = currentProduct.description.name;
    this.selectedProduct = currentProduct;

    this.addProductForm.get('selectProduct').patchValue(this.selectedProduct.description.name);

  }

  public addProduct(): void {
    console.log('Product added!');

    let uniqueProducts = new Set(this.products?.map(function(product) {
      return product.id;
    }));

    if (!uniqueProducts.has(this.selectedProduct?.id)) {
      this.selectedProduct.quantity = this.addProductForm.value.productQuantity;
      this.products?.push(this.selectedProduct);
    }

    this.products.forEach((val) => {
      let sum = val.quantity * val.price;
      let result = 0;

      console.log(sum);

      if (sum) {
        this.orderTotal += sum;
      }

      console.log(this.orderTotal);
    })

    console.log(this.orderTotal);

    console.log('this.products', this.products);
    console.log('this.selectedClientOrder', this.selectedClientOrder);
  }
}
