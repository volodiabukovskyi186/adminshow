import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesFormComponent } from './countries-form/countries-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {TranslateModule} from "@ngx-translate/core";
import {RapModule} from "../../ui/rap/rap.module";
import { CountryFormMainComponent } from './country-form-main/country-form-main.component';
import { CountryFormPaymentComponent } from './country-form-payment/country-form-payment.component';
import { CountryFormDeliveryComponent } from './country-form-delivery/country-form-delivery.component';
import {NgxSelectModule} from "ngx-select-ex";
import { GalleryModule } from '../../gallery/gallery.module';


@NgModule({
  declarations: [CountriesFormComponent, CountryFormMainComponent, CountryFormPaymentComponent, CountryFormDeliveryComponent],
  exports: [
    CountriesFormComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        TranslateModule,
        RapModule,
        FormsModule,
        NgxSelectModule,
        GalleryModule
    ]
})
export class CountriesModule { }
