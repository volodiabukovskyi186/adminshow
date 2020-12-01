import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// import { UserMenuComponent } from "./user-menu/user-menu.component";
import { UiModule } from "../ui/ui.module";
import { UserFormComponent } from "./user-form/user-form.component";
import { NgxSelectModule } from "ngx-select-ex";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { UserFormSelectComponent } from './user-form-select/user-form-select.component';

const c = [ UserFormComponent];

@NgModule({
  declarations: [c, UserFormSelectComponent],
  exports: [c],
  imports: [
    CommonModule, 
    UiModule, 
    FormsModule,
    TranslateModule,
    NgxSelectModule,
  ],
})
export class UserModule {}
