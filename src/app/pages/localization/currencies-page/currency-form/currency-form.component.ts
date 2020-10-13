import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ILanguage } from "src/app/modules/localization/language/language.service";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.scss']
})
export class CurrencyFormComponent implements OnInit {
  @Input() currency;
  @Input() langs: ILanguage[];
  @Input() title: string = "";

  @Output() currenciesFormData = new EventEmitter<any>();

  public editCurrencyInfoForm: FormGroup;
  public currenciesStatus: any[];

  public statusCodes = {
    "0": {
      name: 'statusCodes.inactive'
    },
    "1": {
      name: 'statusCodes.active'
    }
  }

  public allStatusCodes = [
    {value: 0, name: "statusCodes.inactive"},
    {value: 1, name: "statusCodes.active"},
  ];

  public statusCodesNumber: any;

  constructor() { }

  ngOnInit(): void {
    this.generateEditCurrencyInfoForm();
    this.getEditCurrencyFormData();

    this.editCurrencyInfoForm.get('currencyStatus').setValue(this.currency?.status);
  }

  generateEditCurrencyInfoForm(): void {
    this.editCurrencyInfoForm = new FormGroup({
      currencyName: new FormControl('', []),
      currencyISOcode: new FormControl('', []),
      currencySymbolOnTheLeft: new FormControl('', []),
      currencySymbolOnTheRight: new FormControl('', []),
      currencyValue: new FormControl('', []),
      currencyStatus: new FormControl('', []),
    })
  }

  onChange(event) {
    this.editCurrencyInfoForm.get('currencyStatus').setValue(event);
  }

  getEditCurrencyFormData(): void {
    this.editCurrencyInfoForm.valueChanges
    .subscribe(() => this.currenciesFormData.emit(this.editCurrencyInfoForm.value));
  }
}
