/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./auth.interceptor";
import { ServerErrorInterceptor } from '../server-error.interceptor';

/** Http interceptor providers in outside-in order */
export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];

export const serverErrorInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true }
]