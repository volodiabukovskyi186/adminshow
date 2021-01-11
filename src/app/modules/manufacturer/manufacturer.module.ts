import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ManufacturerFormComponent } from "./manufacturer-form/manufacturer-form.component";
import { UiModule } from '../ui/ui.module';
import { FormsModule } from '@angular/forms';
import { GalleryModule } from '../gallery/gallery.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TranslateModule } from "@ngx-translate/core";

import { ManufacturerFormSizesComponent } from './manufacturer-form-sizes/manufacturer-form-sizes.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

const c = [ManufacturerFormComponent];

@NgModule({
  declarations: [...c, ManufacturerFormSizesComponent],
  exports: [...c],
  imports: [CommonModule, UiModule, FormsModule, GalleryModule, AngularEditorModule, TranslateModule, MatFormFieldModule, MatSelectModule],
})
export class ManufacturerModule {}
