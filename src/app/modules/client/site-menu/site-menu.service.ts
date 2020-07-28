import { Injectable } from "@angular/core";
import { ILanguage } from "../../localization/language/language.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

export interface ISiteMenuDescription {
  id: number;
  menu_id: number;
  lang_id: number;
  title: string;
  created_at: string;
  updated_at: string;
  lang?: ILanguage;
}

export interface ISiteMenu {
  id: number;
  created_at: string;
  updated_at: string;
  status?: number;
  parent_id?: number;
  link: string;
  sort_order: number;
  type: string;
  descriptions: Array<ISiteMenuDescription>;
}

export interface ISiteMenuResponse {
  count: number;
  data: Array<ISiteMenu>;
  skip: number;
  take: number;
  host: string;
}

@Injectable({
  providedIn: "root",
})
export class SiteMenuService {
  page: number = 1;
  data: ISiteMenuResponse = {
    count: 0,
    data: [],
    skip: 0,
    take: 10,
    host: null,
  };

  constructor(private http: HttpClient) {}

  getList(): Observable<ISiteMenuResponse> {
    let skip = this.page * this.data.take - this.data.take;
    let params = `?take=${this.data.take}&skip=${skip}`;
    return this.http.get<ISiteMenuResponse>(
      environment.client.menu.menus + params
    );
  }

  post(data: any): Observable<any> {
    return this.http.post(environment.client.menu.menu, data);
  }

  updateStatus(id: number, status: number): Observable<any> {
    let data = JSON.stringify({
      status,
    });
    return this.http.put(
      `${environment.client.menu.menu}/updateStatus/${id}`,
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
    return this.http.put(`${environment.client.menu.menu}/${id}`, data);
  }
}
