import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LanguageFormComponent } from "./language-form/language-form.component";
import { UiModule } from "../../ui/ui.module";
import { GalleryModule } from '../../gallery/gallery.module';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
const c = [LanguageFormComponent];

@NgModule({
  declarations: [...c],
  exports: [...c],
  imports: [CommonModule, UiModule,GalleryModule,TranslateModule],
})
export class LanguageModule {}
