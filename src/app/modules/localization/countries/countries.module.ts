import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesFormComponent } from './countries-form/countries-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [CountriesFormComponent],
  exports: [
    CountriesFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    TranslateModule
  ]
})
export class CountriesModule { }
