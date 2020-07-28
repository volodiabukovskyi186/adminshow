import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IOptionValue } from "../interfaces/option-value";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class OptionValueService {
  data: { data: Array<IOptionValue>; host: string } = {
    data: [],
    host: "",
  };

  constructor(private http: HttpClient) {}

  getListByOption(id: number): Observable<{ data: Array<IOptionValue> }> {
    return this.http.get<{ data: Array<IOptionValue> }>(
      environment.catalog.option.optionValues + `/${id}`
    );
  }

  post(data: any): Observable<any> {
    return this.http.post(environment.catalog.option.optionValue, data);
  }

  put(data: any, id: number): Observable<any> {
    return this.http.put(
      `${environment.catalog.option.optionValue}/${id}`,
      data
    );
  }
}
