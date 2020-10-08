import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageOrderFormComponent } from './storage-order-form/storage-order-form.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [StorageOrderFormComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class StorageModule { }
