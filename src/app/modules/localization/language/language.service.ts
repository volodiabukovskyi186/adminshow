import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

export interface ILanguage {
  id: number;
  code: string;
  title: string;
  short_title: string;
  flag: string;
  locate: string;
  available: number;
  created_at: string;
  updated_at: string;
  default: number;
}

export interface ILanguageResponse {
  data: Array<ILanguage>;
  count: number;
  skip: number;
  take: number;
}

export interface IFlags {
  en: string;
  pl: string;
  ru: string;
  ua: string;
}

@Injectable({
  providedIn: "root",
})
export class LanguageService {
  languages: ILanguageResponse = {
    count: 0,
    data: [],
    skip: 0,
    take: 20,
  };
  constructor(private http: HttpClient) {}

  public flags: IFlags = {
    en: "assets/icons/en.svg",
    pl: "assets/icons/pl.svg",
    ru: "assets/icons/ru.svg",
    ua: "assets/icons/ua.svg",
  };

  getLangs(): Observable<ILanguageResponse> {
    let params = `?take=${this.languages.take}&skip=${this.languages.skip}`;
    return this.http.get<ILanguageResponse>(
      environment.localization.language.languages + params
    );
  }

  delete(id): Observable<any> {
    return this.http.delete(
      environment.localization.language.language + "/" + id
    );
  }

  deleteFromList(id: number) {

    let ob = this.getFromList(id);
    if (ob != null) {
      this.deleteFromArray(ob, this.languages.data);
    }
  }

  updateInList(lang: ILanguage) {
    this.languages.data.forEach((element) => {
      if (element.id === lang.id) {
        element.title = lang.title;
        element.short_title = lang.short_title;
        element.code = lang.code;
        element.available = lang.available;
        element.default = lang.default;
        element.flag = lang.flag;
        element.locate = lang.locate;
        element.updated_at = lang.updated_at;
      }
    });
  }

  getCountryFlag(flag): void {
    if (this.flags.hasOwnProperty(flag)) {
      return this.flags[flag];
    }
  }

  getFromList(id: number) {
    let role;
    for (let i = 0; i < this.languages.data.length; i++) {
      role = this.languages.data[i];
      if (role.id == id) {
        role.flag = this.flags[role.code];
        return role;
      }
    }
    return null;
  }  

  //
  //

  postRole(lang: ILanguage): Observable<any> {
    let data = JSON.stringify(lang);
    return this.http.post(environment.localization.language.language, data);
  }

  putRole(lang: ILanguage, id: number): Observable<any> {
    let data = JSON.stringify(lang);
    return this.http.put(
      `${environment.localization.language.language}/${id}`,
      data
    );
  }

  updateStatus(id: number, status: number): Observable<any> {
    let data = JSON.stringify({
      status,
    });
    return this.http.put(
      `${environment.localization.language.language}/updateStatus/${id}`,
      data
    );
  }

  updateStatusInList(id: number, status: number) {
    this.languages.data.forEach((element) => {
      if (element.id === id) {
        element.available = status;
      }
    });
  }

  //
  //

  protected deleteFromArray(object: Object, array: Array<Object>) {
    const index: number = array.indexOf(object);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
}
