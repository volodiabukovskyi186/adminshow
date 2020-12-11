import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManufactrureDialogComponent } from './manufactrure-dialog/manufactrure-dialog.component';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";


@NgModule({
  declarations: [ManufactrureDialogComponent],
  imports: [
    CommonModule,
    TranslateModule
  ]
})
export class DialogsModule { }
