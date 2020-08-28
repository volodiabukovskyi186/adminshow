import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OptionFormComponent } from "./components/option-form/option-form.component";
import { OptionValueFormComponent } from "./components/option-value-form/option-value-form.component";
import { FormsModule } from "@angular/forms";
import { UiModule } from "../../ui/ui.module";
import { GalleryModule } from '../../gallery/gallery.module';
import { TranslateModule } from "@ngx-translate/core";

const c = [OptionFormComponent, OptionValueFormComponent];

@NgModule({
  declarations: [...c],
  exports: [...c],
  imports: [CommonModule, FormsModule, UiModule, GalleryModule, TranslateModule],
})
export class OptionModule {}
