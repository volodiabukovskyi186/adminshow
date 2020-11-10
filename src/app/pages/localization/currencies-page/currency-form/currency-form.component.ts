import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ILanguage } from "src/app/modules/localization/language/language.service";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.scss']
})
export class CurrencyFormComponent implements OnInit, OnChanges {
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

  public ngOnInit(): void {
    this.generateEditCurrencyInfoForm();
    this.getEditCurrencyFormData();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.currency === '') {
      this.editCurrencyInfoForm.reset();
    }

    if (changes.currency && (this.currency !== '')) {
      this.setValueToCurrencyForm();
    }
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

  getEditCurrencyFormData(): void {
    this.editCurrencyInfoForm.valueChanges
    .subscribe(() => this.currenciesFormData.emit(this.editCurrencyInfoForm.value));
  }

  setValueToCurrencyForm(): void {
    this.editCurrencyInfoForm?.setValue({ 
      currencyName: this.currency?.currency_title,
      currencyISOcode: this.currency?.code,
      currencySymbolOnTheLeft: this.currency?.simbol_left,
      currencySymbolOnTheRight: this.currency?.simbol_right,
      currencyValue: this.currency?.value,
      currencyStatus: this.currency?.status
    });

    console.log(this.currency?.status);
  }
}
