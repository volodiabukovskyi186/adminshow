import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentMethodsFormComponent } from './payment-methods-form/payment-methods-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
    declarations: [PaymentMethodsFormComponent],
    exports: [
        PaymentMethodsFormComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        TranslateModule
    ]
})
export class PaymentMethodsModule { }
