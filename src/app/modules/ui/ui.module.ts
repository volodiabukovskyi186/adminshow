import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ShowUModule } from "./show-u/show-u.module";
import { RapModule } from './rap/rap.module';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';

const COMPONENTS = [];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, DynamicFormModule],
  exports: [...COMPONENTS, ShowUModule, RapModule, DynamicFormModule]
})
export class UiModule {}
