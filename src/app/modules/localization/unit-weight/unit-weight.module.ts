import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitWeightFormComponent } from './unit-weight-form/unit-weight-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [UnitWeightFormComponent],
  exports: [
    UnitWeightFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    TranslateModule
  ]
})
export class UnitWeightModule { }
