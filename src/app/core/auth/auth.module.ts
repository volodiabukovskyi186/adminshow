import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginFormComponent } from "./login-form/login-form.component";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { ForgotPasswordDialogComponent } from '../../modules/dialogs/forgot-password-dialog/forgot-password-dialog.component';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [LoginFormComponent, ForgotPasswordDialogComponent],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, TranslateModule],
  exports: [LoginFormComponent]
})
export class AuthModule {}
