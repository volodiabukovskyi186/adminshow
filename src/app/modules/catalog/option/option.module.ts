import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OptionFormComponent } from "./components/option-form/option-form.component";
import { OptionValueFormComponent } from "./components/option-value-form/option-value-form.component";
import { FormsModule } from "@angular/forms";
import { UiModule } from "../../ui/ui.module";
import { GalleryModule } from '../../gallery/gallery.module';
import { TranslateModule } from "@ngx-translate/core";
import { OptionInformationComponent } from './components/option-information/option-information.component';
import { OptionValueComponent } from './components/option-value/option-value.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';

const c = [OptionFormComponent, OptionValueFormComponent];

@NgModule({
  declarations: [...c, OptionInformationComponent, OptionValueComponent],
  exports: [...c],
    imports: [CommonModule, FormsModule, UiModule, GalleryModule, TranslateModule, MatFormFieldModule, MatSelectModule, MatCheckboxModule],
})
export class OptionModule {}
