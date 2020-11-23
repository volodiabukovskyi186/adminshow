import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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

  constructor() { }

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

    //this.editClientInfoForm?.reset();

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

    //this.clientInfoForm?.reset();

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

  public addProduct(): void {
    console.log('Product added!');
  }
}
