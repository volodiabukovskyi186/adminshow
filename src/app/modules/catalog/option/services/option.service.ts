import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IOptionResponse } from '../interfaces';

@Injectable({
  providedIn: "root",
})
export class OptionService {
  page: number = 1;
  data: IOptionResponse = {
    count:0,
    data: [],
    skip: 0,
    take: 10,
  };

  constructor(private http: HttpClient) {}

  getList(): Observable<IOptionResponse> {

    let skip = this.page * this.data.take - this.data.take;
    let params = `?take=${this.data.take}&skip=${skip}`;
    return this.http.get<IOptionResponse>(
      environment.catalog.option.options + params
    );
  }

  post(data: any): Observable<any> {
    return this.http.post(environment.catalog.option.option, data);
  }

  put(data: any, id: number): Observable<any> {
    return this.http.put(`${environment.catalog.option.option}/${id}`, data);
  }
}
