import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PromotionService } from '../../../modules/catalog/promotion/services/promotion.service';
import { BehaviorSubject } from 'rxjs';
import { OrderService } from '../services/order.service';
import { UserService } from '../../../modules/user/user.service';
import { ToastrService } from 'ngx-toastr';

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
  public orderTotal;
  public currentUserRoleId: number;

  constructor(
    public promotionService: PromotionService,
    public orderService: OrderService,
    public userService: UserService,
    public toastr: ToastrService
  ) { }

  public ngOnInit(): void {
    this.getUserByToken();
    this.generateClientInfoForm();
    this.generateAddProductForm();
    this.generateEditClientInfoForm();
    this.generateProductQuantityForm();

    this.setClientInfo();
    this.setClientPaymentDeliveryDetails();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedClientOrder) {
      this.products = [];

      this.selectedClientOrder.products.forEach((val) => {
        if (val.hasOwnProperty('product')) {
          this.products.push(val.product);
        }
      })
    }
  }

  public getUserByToken(): void {
    this.userService.getByToken().subscribe((res) => {
      this.currentUserRoleId = res.data.user.role_id;
    });
  }

  public getOrders(): void {
    this.orderService.getList(this.currentUserRoleId).subscribe(data => {
      this.orderService.order = data;
    })
  }

  public generateEditClientInfoForm(): void {
    this.editClientInfoForm = new FormGroup({
      paymentMethod: new FormControl('', []),
      deliveryMethod: new FormControl('', []),
      details: new FormControl('', [])
    })
  }

  public setClientPaymentDeliveryDetails(): void {
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
    this.clientInfoForm?.setValue({
      name: this.selectedClientOrder.last_name,
      surname: this.selectedClientOrder.first_name,
      phone: this.selectedClientOrder.telephone,
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
    let uniqueProducts = new Set(this.products?.map(function(product) {
      return product.id;
    }));

    if (!uniqueProducts.has(this.selectedProduct?.id)) {
      this.selectedProduct.quantity = this.addProductForm.value.productQuantity;
      this.products?.push(this.selectedProduct);
    }

    this.products.forEach((val) => {
      let sum = val.quantity * val.price;

      if (sum) {
        this.orderTotal += sum;
      }
    })
  }

  public saveClientInfo(): void {
    const clientInfoToUpdate = {
      first_name: this.clientInfoForm.value.name,
      last_name: this.clientInfoForm.value.surname,
      email: this.clientInfoForm.value.email,
      telephone: this.clientInfoForm.value.phone
    }

    this.orderService.updateOrderClientInfo(this.selectedClientOrder.id, clientInfoToUpdate)
      .subscribe((res) => {
        if (res.data) {
          this.getOrders();
          this.toastr.success("Saved");
        }

        if (res.error) {
          this.toastr.error("Error");
        }
      })
  }

  public savePaymentDeliveryDetails(): void {
    const orderPaymentDetailsToSend = {
      checkoutDelivery: this.editClientInfoForm.value.deliveryMethod,
      checkoutDeliveryAddress: this.editClientInfoForm.value.details,
      checkoutPayment: this.editClientInfoForm.value.paymentMethod
    }

    this.orderService.updateOrderDeliveryData(this.selectedClientOrder.id, orderPaymentDetailsToSend)
      .subscribe((res) => {
        if (res.data) {
          this.toastr.success("Saved");
        }

        if (res.error) {
          this.toastr.error("Error");
        }
      })
  }
}
