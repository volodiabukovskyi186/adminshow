import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserMenuComponent } from "./user-menu/user-menu.component";
import { UiModule } from "../ui/ui.module";
import { UserFormComponent } from "./user-form/user-form.component";
import { FormsModule } from "@angular/forms";

const c = [UserMenuComponent, UserFormComponent];

@NgModule({
  declarations: [c],
  exports: [c],
  imports: [CommonModule, UiModule, FormsModule],
})
export class UserModule {}
