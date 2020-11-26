import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// import { UserMenuComponent } from "./user-menu/user-menu.component";
import { UiModule } from "../ui/ui.module";
import { UserFormComponent } from "./user-form/user-form.component";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

const c = [ UserFormComponent];

@NgModule({
  declarations: [c],
  exports: [c],
  imports: [
    CommonModule, 
    UiModule, 
    FormsModule,
    TranslateModule,
  ],
})
export class UserModule {}
