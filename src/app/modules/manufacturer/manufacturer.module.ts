import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ManufacturerFormComponent } from "./manufacturer-form/manufacturer-form.component";
import { UiModule } from '../ui/ui.module';
import { FormsModule } from '@angular/forms';
import { GalleryModule } from '../gallery/gallery.module';

const c = [ManufacturerFormComponent];

@NgModule({
  declarations: [...c],
  exports: [...c],
  imports: [CommonModule, UiModule, FormsModule, GalleryModule],
})
export class ManufacturerModule {}
