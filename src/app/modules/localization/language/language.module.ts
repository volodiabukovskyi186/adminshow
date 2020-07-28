import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LanguageFormComponent } from "./language-form/language-form.component";
import { UiModule } from "../../ui/ui.module";

const c = [LanguageFormComponent];

@NgModule({
  declarations: [...c],
  exports: [...c],
  imports: [CommonModule, UiModule],
})
export class LanguageModule {}
