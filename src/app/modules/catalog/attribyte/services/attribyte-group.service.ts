import { Injectable } from "@angular/core";
import { IResponseDataPagination, IAttribyteGroup } from "../interfaces";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AttribyteGroupService {
  page: number = 1;
  data: IResponseDataPagination<IAttribyteGroup> = {
    count: 0,
    data: [],
    skip: 0,
    take: 10,
  };

  all: IAttribyteGroup[] = [];

  constructor(private http: HttpClient) {}

  getList(): Observable<IResponseDataPagination<IAttribyteGroup>> {
    // let skip = this.page * this.data.take - this.data.take;
    let params = `?take=${this.data.take}&skip=${this.data.skip}`;
    return this.http.get<IResponseDataPagination<IAttribyteGroup>>(
      environment.catalog.attr.attribyteGroups + params
    );
  }
  getAll(): Observable<IResponseDataPagination<IAttribyteGroup>> {
    return this.http.get<IResponseDataPagination<IAttribyteGroup>>(
      environment.catalog.attr.attribyteGroups + `?take=200&skip=0`
    );
  }

  post(data: any): Observable<any> {
    let d = JSON.stringify(data);
    return this.http.post(environment.catalog.attr.attribyteGroup, data);
  }

  put(data: any, id: number): Observable<any> {
    let d = JSON.stringify(data);
    return this.http.put(
      `${environment.catalog.attr.attribyteGroup}/${id}`,
      data
    );
  }
}
