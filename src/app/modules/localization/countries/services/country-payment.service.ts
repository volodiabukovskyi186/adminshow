import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CountryPaymentService {

  list: Array<any> = [];
  values: Array<number> = [];

  constructor(private http: HttpClient) {}

  getByProdId(prodId: number): Observable<any> {
    return this.http.get<any>(
        environment.host + `getProductCategories/${prodId}`
    );

  }

  put(prodId: number): Observable<any> {
    let data = this.values;
    return this.http.put(
        `${environment.host}product_to_category/updateArray/${prodId}`,
        data
    );
  }

  initVales() {
    this.values = [];
    this.list.forEach((element) => {
      this.values.push(element.category_id);
    });
  }
}