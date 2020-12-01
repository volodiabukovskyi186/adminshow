import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IProductResponse } from "../interfaces";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  page: number = 1;
  data: IProductResponse = {
    count: 0,
    data: [],
    skip: 0,
    take: 10,
    host: null
  };

  constructor(private http: HttpClient) {}

  getList(role_id): Observable<IProductResponse> {
    const lang = localStorage.getItem('currentLang');
    // let skip = this.page * this.data.take - this.data.take;
    let params = `?take=${this.data.take}&skip=${this.data.skip}&lang=${lang}`;
    if (role_id == 1 ) {
      return this.http.get<IProductResponse>(
        environment.catalog.product.products + params
      );
    }
    else{
      return this.http.get<IProductResponse>(
        environment.catalog.product.manager + params
      );
    }
  
  }

  post(data: any): Observable<any> {
    return this.http.post(environment.catalog.product.product, data);
  }

  updateStatus(id: number, status: number): Observable<any> {
    let data = JSON.stringify({
      status,
    });
    return this.http.put(
      `${environment.catalog.product.product}/updateStatus/${id}`,
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
    return this.http.put(`${environment.catalog.product.product}/${id}`, data);
  }

  getProductDiscounts(): Observable<any> {
    return this.http.get(`${environment.host}product_disconts`);
  }

  updateProductPrice(newPrice): Observable<any> {
    return this.http.post(`${environment.host}product_discont`, newPrice);
  }

  deleteDiscount(discountId): Observable<any> {
    return this.http.delete(`${environment.host}product_discont/${discountId}`);
  }
}
