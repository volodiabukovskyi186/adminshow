import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IOrderResponse } from '../interfaces/order-response';

@Injectable({
  providedIn: "root",
})
export class OrderService {
  page: number = 1;
  order: IOrderResponse = {
    count: 0,
    data: [],
    skip: 0,
    take: 20,
    host: environment.host
  };

  constructor(private http: HttpClient) {}

  getList(): Observable<IOrderResponse> {
    const lang = localStorage.getItem('currentLang');
    let skip = this.page * this.order.take - this.order.take;
    let params = `?take=10&skip=${skip}&lang=${lang}`;
    // ${this.order.take}
    return this.http.get<IOrderResponse>(
      environment.orderang + params
      //
    );
  
  }
  // 
  UpdateUserOrder(id: any, data: any): Observable<any>{
    return this.http.put(`https://api.showu.com.ua/order/${id}`, data);
  }

  // post(data: any): Observable<any> {
  //   return this.http.post(environment.catalog.option.option, data);
  // }

  // put(data: any, id: number): Observable<any> {
  //   return this.http.put(`${environment.catalog.option.option}/${id}`, data);
  // }
}
