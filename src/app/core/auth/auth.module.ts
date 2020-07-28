import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginFormComponent } from "./login-form/login-form.component";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [LoginFormComponent],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  exports: [LoginFormComponent]
})
export class AuthModule {}
