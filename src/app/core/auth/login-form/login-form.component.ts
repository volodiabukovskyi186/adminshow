
import { UserService } from 'src/app/modules/user/user.service';
import { Component, OnInit, Input, Output, EventEmitter ,OnDestroy} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "../models/auth.service";
import { ToastrService } from "ngx-toastr";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Router } from "@angular/router";
import { AuthResponse } from "../models";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent implements OnDestroy{
  @Input() labelLogin: string;
  @Input() labelPassword: string;
  @Input() labelForgotPassword: string;
  @Input() labelSubmit: string;
  @Input() placeholderLogin: string;
  @Input() placeholderPassword: string;

  @Output() authed: EventEmitter<any> = new EventEmitter();

  /**
   *
   */
  constructor(
    public auth: AuthService,
    private ngxService: NgxUiLoaderService,
    private toastr: ToastrService,
    private router: Router,
    private UserService:UserService,

  ) {}

  authForm = new FormGroup({
    login: new FormControl(""),
    password: new FormControl("")
  });

  ngOnDestroy(): void{
    // this.UserService.SUser.next(true)
  }

  onSubmit() {
    this.ngxService.start();
    this.toastr.clear();
    let form = this.authForm.value;
    this.auth.login(form.login, form.password).subscribe(this.authHandler);

  }

  authHandler = (data: AuthResponse) => {
    this.ngxService.stopAll();
    this.auth.saveToken(data.data.token);
    this.authForm.reset();
    this.authed.emit();
   
    this.router.navigate(["/"]);
    
  };
}
