import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/models/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrls: ['./forgot-password-dialog.component.scss']
})
export class ForgotPasswordDialogComponent implements OnInit {
  public isResetBtnClicked: boolean = false;
  public isInvalidLoginOrPass: boolean;
  public isResetBtnContentClicked: boolean = false;
  private onDestroyed$: Subject<void> = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<ForgotPasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dataLogin: any,
    public authService: AuthService,
    public ngxService: NgxUiLoaderService
  ) { }

  public ngOnInit(): void {
    this.authService.getLoginStatus$()
      .pipe(takeUntil(this.onDestroyed$))
      .subscribe((res) => {
        // console.log(res);
        if (res && res.status === 503) {
          this.isInvalidLoginOrPass = true;
        } else {
          this.isInvalidLoginOrPass = false;
        }
      })
  }

  public onNoClick(): void {
    this.dialogRef.close(this.dataLogin);
  }

  authForm = new FormGroup({
    email: new FormControl("", Validators.required)
  });

  onSubmit() {
    this.ngxService.start();
    // this.toastr.clear();

    let form = this.authForm.value;
    this.data = form;
    this.authService.mailRestore(form).subscribe(this.restoreHandler);
  }

  data = this.authForm.value;

  restoreHandler = (data: any) => {
    this.ngxService.stopAll();
  };

  public successResetPassword(): void {
    this.isResetBtnContentClicked = true;

    setTimeout(() => {
      this.isResetBtnClicked = true;
    }, 2000);

    this.onSubmit();
  }

}
