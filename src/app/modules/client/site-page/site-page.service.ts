import { Injectable } from "@angular/core";
import { ILanguage } from "../../localization/language/language.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

export interface ISitePageDescription {
  id: number;
  meta_description: string;
  meta_keywords: string;
  text: string;
  page_id: number;
  lang_id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  lang?: ILanguage;
}

export interface ISitePage {
  id: number;
  alias: string;
  created_at: string;
  updated_at: string;
  status?: number;
  descriptions: Array<ISitePageDescription>;
}

export interface ISitePageResponse {
  count: number;
  data: Array<ISitePage>;
  skip: number;
  take: number;
  host: string;
}

@Injectable({
  providedIn: "root",
})
export class SitePageService {
  page: number = 1;
  data: ISitePageResponse = {
    count: 0,
    data: [],
    skip: 0,
    take: 10,
    host: null,
  };

  constructor(private http: HttpClient) {}

  getList(): Observable<ISitePageResponse> {
    let skip = this.page * this.data.take - this.data.take;
    let params = `?take=${this.data.take}&skip=${skip}`;
    return this.http.get<ISitePageResponse>(
      environment.client.page.pages + params
    );
  }

  post(data: any): Observable<any> {
    return this.http.post(environment.client.page.page, data);
  }

  updateStatus(id: number, status: number): Observable<any> {
    let data = JSON.stringify({
      status,
    });
    return this.http.put(
      `${environment.client.page.page}/updateStatus/${id}`,
      data
    );
  }

  updateStatusInList(id: number, status: number) {
    this.data.data.forEach((element) => {
      if (element.id === id) {
        element.status = status;
      }
    });
  }

  put(data: any, id: number): Observable<any> {
    return this.http.put(`${environment.client.page.page}/${id}`, data);
  }

  deleteSitePage(id: number): Observable<any> {
    return this.http.delete(`${environment.host}page/${id}`);
  }
}
