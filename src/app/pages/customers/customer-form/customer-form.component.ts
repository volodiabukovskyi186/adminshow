import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICustomer } from '../../customers/interfaces/customer';
import { ILanguage, LanguageService } from "src/app/modules/localization/language/language.service";
import { FormGroup, FormControl } from '@angular/forms';
import { PagesService } from '../../pages.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})

export class CustomerFormComponent implements OnInit {

  @Input() customer: ICustomer;
  @Input() langs: ILanguage[];
  @Input() title: string = "";
  @Input() selected;
 
  @Output() customersFormData = new EventEmitter<any>();

  public editCustomerInfoForm: FormGroup;

  constructor( 
    public pages: PagesService
  ) { }

  public ngOnInit(): void {}
}
