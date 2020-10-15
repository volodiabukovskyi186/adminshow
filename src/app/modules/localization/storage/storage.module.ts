import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageOrderFormComponent } from './storage-order-form/storage-order-form.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {RapModule} from "../../ui/rap/rap.module";



@NgModule({
    declarations: [StorageOrderFormComponent],
    exports: [
        StorageOrderFormComponent
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
export class StorageModule { }
