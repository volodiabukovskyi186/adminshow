import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RoleFormComponent } from "./role-form/role-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { UiModule } from "../ui/ui.module";

@NgModule({
  declarations: [RoleFormComponent],
  exports: [RoleFormComponent],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, UiModule]
})
export class RolesModule {}
