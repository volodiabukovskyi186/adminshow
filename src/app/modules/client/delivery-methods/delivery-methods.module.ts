import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryMethodsFormComponent } from './delivery-methods-form/delivery-methods-form.component';
import {RapModule} from "../../ui/rap/rap.module";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";



@NgModule({
    declarations: [DeliveryMethodsFormComponent],
    exports: [
        DeliveryMethodsFormComponent
    ],
    imports: [
        CommonModule,
        RapModule,
        TranslateModule,
        FormsModule
    ]
})
export class DeliveryMethodsModule { }
