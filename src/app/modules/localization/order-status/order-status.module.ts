import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderStatusFormComponent } from './order-status-form/order-status-form.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {RapModule} from "../../ui/rap/rap.module";



@NgModule({
  declarations: [OrderStatusFormComponent],
  exports: [
    OrderStatusFormComponent
  ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        TranslateModule,
        FormsModule,
        RapModule
    ]
})
export class OrderStatusModule { }
