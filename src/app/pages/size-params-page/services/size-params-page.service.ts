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
  selectedSizeParam: any;

  constructor(
    private http: HttpClient,
    private languageService: LanguageService,
    //public userService: UserService
  ) {}

  initEmptySizeGroupParams() {
    this.selectedSizeParam = {
      id: null,
      group_id: 1,
      sort_order: null,
      descriptions: [
        {
          id: null,
          name: null,
          lang_id: 1
        },
        {
          id: null,
          name: null,
          lang_id: 2
        },
        {
          id: null,
          name: null,
          lang_id: 3
        },
        {
          id: null,
          name: null,
          lang_id: 4
        }
      ]
    }
  }

  getList(): Observable<any> {
    //const lang = localStorage.getItem('currentLang');
    return this.http.get(`${environment.host}size_params`);
  }
  getListClient(id: number): Observable<any> {
    const lang = localStorage.getItem('currentLang');
    return this.http.get(`${environment.host}size_param/client/${id}?lang=${lang}`);
  }

  updateSizeGroupsParams(data: any, id: number): Observable<any> {
    return this.http.put(
      `${environment.host}size_param/${id}`,
      data
    );
  }

  createSizeGroupsParams(data: any): Observable<any> {
    return this.http.post(`${environment.host}size_param`, data);
  }

  removeSizeGroupParam(id:number): Observable<any> {
    return this.http.delete( `${environment.host}size_param/${id}`) ;
  }
}
