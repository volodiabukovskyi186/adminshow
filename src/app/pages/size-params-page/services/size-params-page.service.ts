import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { LanguageService } from 'src/app/core/language.service';
import { ISizeParamsResponse } from '../interfaces/size-params-response';
//import { ILanguage } from "../localization/language/language.service";

@Injectable({
  providedIn: "root",
})

export class SizeParamsService {
  sizeParams: ISizeParamsResponse = {
    count: 0,
    data: [],
    skip: 0,
    take: 10,
    host: environment.host
  };
  page = 1;

  constructor(
    private http: HttpClient,
    private languageService: LanguageService,
    //public userService: UserService
  ) {}

  getList(): Observable<any> {
    //const lang = localStorage.getItem('currentLang');
    return this.http.get(`${environment.host}size_params`);
  }
}
