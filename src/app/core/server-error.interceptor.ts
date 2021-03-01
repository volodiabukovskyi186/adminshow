import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { catchError } from "rxjs/operators";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { AuthService } from "./auth/models/auth.service";
import { Router } from "@angular/router";


@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(
    private ngxService: NgxUiLoaderService,
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err, caught) => {
        this.handleError(err);
        return of(err);
      }) as any
    );
  }

  private handleError(err: HttpErrorResponse) {
    this.ngxService.stopAll();
    // console.log(err.status);

    switch (err.status) {
      case 400:
        this.toastr.error(
          err.error.error.message ?? err.error ?? err.message,
          "ServerErrorInterceptor"
        );
        break;

      case 401: {
        this.auth.logout();
        console.log(this.router.url);
        let lng,
          route = this.router.url;
        lng = route.match(/en|pl|ru|ua/);

        if (lng[0]) {
          this.router.navigate([lng[0], "login"]);
        } else {
          this.router.navigate(["login"]);
        }

        this.toastr.error(
          err.error.error.message ?? err.error ?? err.message,
          "Invalid Token"
        );
        break;
      }

      case 503: {
        let msg = err?.error?.error?.message ?? err?.error ?? err?.message;
        this.auth?.updatedLoginStatus$({
          message: msg,
          status: err?.status 
        });
        this.toastr.error(msg);
      }

      default:
        this.toastr.error(err.message, err.name);
        break;
    }
  }
}
