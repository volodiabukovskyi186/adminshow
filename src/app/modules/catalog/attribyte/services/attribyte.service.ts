import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IAttribyte, IResponseDataPagination } from "../interfaces";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AttribyteService {
  page: number = 1;
  data: IResponseDataPagination<IAttribyte> = {
    count: 0,
    data: [],
    skip: 0,
    take: 10,
  };
  all: Array<IAttribyte> = [];

  constructor(private http: HttpClient) {}

  getList(): Observable<IResponseDataPagination<IAttribyte>> {
    let skip = this.page * this.data.take - this.data.take;
    let params = `?take=${this.data.take}&skip=${skip}`;
    return this.http.get<IResponseDataPagination<IAttribyte>>(
      environment.catalog.attr.atrribytes + params
    );
  }

  getAll(): Observable<IResponseDataPagination<IAttribyte>> {
    let skip = 0;
    let params = `?take=${200}&skip=${skip}`;
    return this.http.get<IResponseDataPagination<IAttribyte>>(
      environment.catalog.attr.atrribytes + params
    );
  }

  getAttr(attr: number, lang: number) {
    for (let i = 0; i < this.all.length; i++) {
      const a = this.all[i];
      if(a.id == attr) {
        let res = a;
        for (let j = 0; j < a.description.length; j++) {
          const desc = a.description[j];
          if(desc.lang_id == lang) {
            res.description = [];
            res.description.push(desc);
          }
        }
        return res;
      }
    }
    return null;
  }

  post(data: any): Observable<any> {
    let d = JSON.stringify(data);
    return this.http.post(environment.catalog.attr.atrribyte, data);
  }

  put(data: any, id: number): Observable<any> {
    let d = JSON.stringify(data);
    return this.http.put(`${environment.catalog.attr.atrribyte}/${id}`, data);
  }
}
