import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private auth: AuthService) {}

  // private handleError(err: HttpErrorResponse) {
  //   //handle your auth error or rethrow
  //   if (err.status === 401 || err.status === 403) {
  //     console.log("CATCH 401");
  //     sessionStorage.removeItem("token");
  //     this.router.navigateByUrl(`/login`);
  //     return err.message;
  //   }
  // }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Get the auth token from the service.
    const authToken = this.auth.getToken();

    if (authToken) {
      // Clone the request and replace the original headers with
      // cloned headers, updated with the authorization.
      let authReq = request.clone({
        headers: request.headers.append("X-Token", authToken)
      });

      // console.log(authReq);

      // send cloned request with header to the next handler.
      return next.handle(authReq);
    } else {
      return next.handle(request);
    }

    

    // return next.handle(authReq).pipe(
    //   catchError((error, caught) => {
    //     this.handleError(error);
    //     return of(error);
    //   }) as any
    // );
  }
}
