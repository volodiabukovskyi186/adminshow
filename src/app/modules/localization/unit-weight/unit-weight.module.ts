import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitWeightFormComponent } from './unit-weight-form/unit-weight-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {TranslateModule} from "@ngx-translate/core";
import {RapModule} from "../../ui/rap/rap.module";



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
        TranslateModule,
        RapModule,
        FormsModule
    ]
})
export class UnitWeightModule { }
