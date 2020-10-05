import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
//import { ISiteDescriptions } from '../interfaces/site-descriptions';
import { ISiteDescriptionsResponse } from '../interfaces/site-descriptions-response';
import { LanguageService } from 'src/app/core/language.service';

@Injectable({
  providedIn: "root",
})

export class SettingsPageService {
  page: number = 1;
  settings: ISiteDescriptionsResponse = {
    // count: 0,
    data: {
      id: null,
      email: null,
      location: null,
      logo_id: null,
      icon_id: null,
      created_at: null,
      updated_at: null,
      descriptions: [],
      phones: [],
      socials: [],
      logo: {},
      icon: {}
    },
    // skip: 0,
    // take: 10,
    host: environment.host
  };

  constructor(
    private http: HttpClient,
    public languageService: LanguageService
  ) {}

  getSiteDescriptionList(): Observable<ISiteDescriptionsResponse> {
    // let skip = this.page * this.settings.take - this.settings.take;
    // let params = `?take=${this.settings.take}&skip=${skip}`;

    let lang = this.languageService.current;

    return this.http.get<ISiteDescriptionsResponse>(`${environment.host}site_description/getByLang?lang=${lang}`);
  }

  getSiteDefaultLanguage(): Observable<any> {
    return this.http.get<any>(`${environment.host}getDefaultLanguage`);
  }

  getSiteDefaultCurrency(): Observable<any> {
    return this.http.get<any>(`${environment.host}currency/getDefaultCurrency`);
  }

  getAllSiteSettingsData(): Observable<any> {
    return this.http.get<any>(`${environment.host}site/getSiteData`);
  }

  getSiteDataById(): Observable<any> {
    return this.http.get<any>(`${environment.host}site/1`);
  }

  createPhone(phoneData): Observable<any> {
    return this.http.post(`${environment.host}site_phone`, phoneData);
  }

  deletePhone(phoneId): Observable<any> {
    return this.http.delete(`${environment.host}site_phone/${phoneId}`);
  }

  // post(data: any): Observable<any> {
  //   return this.http.post(environment.catalog.option.option, data);
  // }

  // put(data: any, id: number): Observable<any> {
  //   return this.http.put(`${environment.catalog.option.option}/${id}`, data);
  // }
}
