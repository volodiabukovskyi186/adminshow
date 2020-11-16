import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicFormComponent } from "./dynamic-form/dynamic-form.component";
import { DynamicFormQuestionComponent } from "./dynamic-form-question/dynamic-form-question.component";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";



@NgModule({
  declarations: [DynamicFormComponent, DynamicFormQuestionComponent],
  exports: [DynamicFormComponent, DynamicFormQuestionComponent],
  imports: [CommonModule, ReactiveFormsModule,TranslateModule]
})
export class DynamicFormModule {}
