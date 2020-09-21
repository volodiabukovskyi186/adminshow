import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { PagesModule } from "./pages/pages.module";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { AppRoutingModule } from "./app-routing.module";
import {
  authInterceptorProviders,
  serverErrorInterceptorProviders,
} from "./core/auth";
import localePl from "@angular/common/locales/pl";
import localeEn from "@angular/common/locales/en";
import localeRu from '@angular/common/locales/ru';
import localeUa from "@angular/common/locales/uk";
import { registerLocaleData } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

registerLocaleData(localeRu, "ru");
registerLocaleData(localePl, "pl");
registerLocaleData(localeEn, "en");
registerLocaleData(localeUa, "ua");

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    PagesModule,
    BrowserAnimationsModule,
  ],
  providers: [authInterceptorProviders, serverErrorInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
