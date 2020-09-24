import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICustomer } from '../../customers/interfaces/customer';
import { ILanguage, LanguageService } from "src/app/modules/localization/language/language.service";
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  @Input() customer: ICustomer;
  @Input() langs: ILanguage[];

  @Input() title: string = "";

  @Output() customersFormData = new EventEmitter<any>();

  public editCustomerInfoForm: FormGroup;
  //public sendCustomerEditableData;

  constructor() { }

  ngOnInit(): void {
    this.generateEditCustomerInfoForm();
    this.getEditCustomerFormData();
  }

  generateEditCustomerInfoForm(): void {
    this.editCustomerInfoForm = new FormGroup({
      customerLastName: new FormControl('', []),
      customerFirstName: new FormControl('', []),
      customerEmail: new FormControl('', []),
      customerPhone: new FormControl('', [])
    })
    console.log(this.editCustomerInfoForm.value);
  }

  getEditCustomerFormData(): void {
    this.editCustomerInfoForm.valueChanges
    .subscribe(() => this.customersFormData.emit(this.editCustomerInfoForm.value));
    
    //this.customersFormData.emit(this.sendCustomerEditableData);
    //console.log(this.sendCustomerEditableData);
  }
}
