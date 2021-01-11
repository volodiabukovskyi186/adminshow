import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { PromotionService } from '../../../modules/catalog/promotion/services/promotion.service';
import { BehaviorSubject } from 'rxjs';
import { OrderService } from '../services/order.service';
import { UserService } from '../../../modules/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { IOrderProduct } from './interfaces/order-product';
import { IOrderProductResponse } from './interfaces/order-product-response';
import { IOrderProductToUpdate } from './interfaces/order-product-to-update';
import { environment } from "src/environments/environment";

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
  public orderProductToSend: IOrderProduct;
  public productOrderToUpdate: IOrderProductToUpdate;
  public formGroupArr = [];
  public totalSum: any;
  public host = environment.host;

  constructor(
    public promotionService: PromotionService,
    public orderService: OrderService,
    public userService: UserService,
    public toastr: ToastrService,
    private changeDetectorRef: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedClientOrder) {
      this.getOrderProducts();
      console.log(this.selectedClientOrder);
      this.products = this.selectedClientOrder.products;
      this.generateProductQuantityForm();
    }
  }

  public ngOnInit(): void {
    this.getUserByToken();
    this.generateClientInfoForm();
    this.generateAddProductForm();
    this.generateEditClientInfoForm();
    this.setClientInfo();
    this.setClientPaymentDeliveryDetails();
  }

  public getUserByToken(): void {
    this.userService.getByToken().subscribe((res) => {
      this.currentUserRoleId = res.data.user.role_id;
    });
  }

  public getOrders(): void {
    this.orderService.getList(this.currentUserRoleId).subscribe(data => {
      this.orderService.order = data;
    });
  }

  public generateEditClientInfoForm(): void {
    this.editClientInfoForm = new FormGroup({
      paymentMethod: new FormControl('', []),
      deliveryMethod: new FormControl('', []),
      details: new FormControl('', [])
    });
  }

  public setClientPaymentDeliveryDetails(): void {
    this.editClientInfoForm?.setValue({
      paymentMethod: this.selectedClientOrder.checkoutPayment,
      deliveryMethod: this.selectedClientOrder.checkoutDelivery,
      details: this.selectedClientOrder.checkoutDeliveryAddress
    });
  }

  public generateClientInfoForm(): void {
    this.clientInfoForm = new FormGroup({
      name: new FormControl('', []),
      surname: new FormControl('', []),
      phone: new FormControl('', []),
      email: new FormControl('', []),
    });
  }

  public setClientInfo(): void {
    this.clientInfoForm?.setValue({
      name: this.selectedClientOrder.last_name,
      surname: this.selectedClientOrder.first_name,
      phone: this.selectedClientOrder.telephone,
      email: this.selectedClientOrder.email,
    });
  }

  public generateAddProductForm(): void {
    this.addProductForm = new FormGroup({
      selectProduct: new FormControl('', []),
      productQuantity: new FormControl('', [])
    });
  }

  public deleteProduct(orderProduct): void {
    console.log(orderProduct);
    this.orderService.orderProductToDelete(orderProduct.id)
      .subscribe((res) => {
        console.log(res);
      });

    this.products = this.products.filter((val) => {
      return val.id !== orderProduct.id;
    });
    this.totalSum = this.totalSum - +parseFloat(orderProduct.total).toFixed(2);
    console.log(this.totalSum);
  }

  public modifyPrice(price: string): string {
    return Number(price).toFixed(2);
  }

  public modifyQuantity(quantity: string): string {
    return Number(quantity).toFixed(0);
  }

  public generateProductQuantityForm(): FormGroup {
    // this.productQuantityForm = this.formBuilder.group({
    //   items: this.formBuilder.array([ this.createDescription() ])
    // })
    this.productQuantityForm = new FormGroup({
      quantity: new FormControl("")
    })

    return this.productQuantityForm;
  }

  // public createDescription(): FormGroup {
  //   return this.formBuilder.group({
  //     quantity: new FormControl('', [])
  //   });
  // }

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

  public updateProductQuantity(product): void {
    console.log(product);

    this.productOrderToUpdate = {
      id: product.id,
      order_id: product.order_id,
      product_id: product.product_id,
      model: product.model,
      quantity: (this.productQuantityForm.value.quantity).toString(),
    }

    this.orderService.updateProductOrder(product.id, this.productOrderToUpdate)
      .subscribe((res) => {
        console.log(res);
        // if (res.data.id === product.id) {
        //   this.productQuantityForm.get('quantity').setValue(' ');
        // }
      })
      this.getOrderProducts();
  }

  // public getOrderById(id: number) {
  //   this.orderService.getOrderById(id).subscribe((res) => {
  //     console.log(res);
  //     this.products = res.data.products;

  //     this.products.forEach((orderProduct) => {
  //       this.addProductForm.get('productQuantity').patchValue(this.modifyQuantity(orderProduct.quantity));
  //     })
  //   })
  // }

  public getOrderProducts() {
    this.orderService.getOrderProductsByOrderId(this.selectedClientOrder.id).subscribe((resp) => {
      console.log(resp);
      this.products = resp.data.products;

    let orderProducts = this.products.map((product) => {
      return +(parseFloat(product.total).toFixed(2));
    })

    console.log('before', orderProducts);

    this.totalSum = orderProducts.reduce((accumulator, currentValue) => accumulator + currentValue );

    console.log('after', this.totalSum);
    })
  }

  public addProduct(): void {
    console.log('this.selectedProduct ====== >>>>>', this.selectedProduct);
    console.log('this.addProductForm.value.productQuantity ======= >>>>>', this.addProductForm.value.productQuantity);
    
    const orderProductTotalSum = (this.addProductForm.value.productQuantity * this.selectedProduct.price).toString();

    this.orderProductToSend = {
      order_id: this.selectedClientOrder.id,
      product_id: this.selectedProduct.description.product_id,
      model: this.selectedProduct.model,
      quantity: (this.addProductForm.value.productQuantity).toString(),
      unit_price: this.selectedProduct.price,
      total: orderProductTotalSum
    }

    console.log(this.orderProductToSend);

    this.orderService.createOrderProduct(this.orderProductToSend).subscribe((res: IOrderProductResponse) => {
      console.log(res);

      this.getOrderProducts();
      this.changeDetectorRef.detectChanges();
      //this.getOrderById(this.selectedClientOrder.id);
      //console.log(this.products);
    })


    // let uniqueProducts = new Set(this.products?.map(function(product) {
    //   return product.id;
    // }));

    // if (!uniqueProducts.has(this.selectedProduct?.id)) {
    //   this.selectedProduct.quantity = this.addProductForm.value.productQuantity;
    //   this.products?.push(this.selectedProduct);
    // }

    // this.products.forEach((val) => {
    //   let sum = val.quantity * val.price;

    //   if (sum) {
    //     this.orderTotal += sum;
    //   }
    // })
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
