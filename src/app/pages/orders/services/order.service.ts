import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IOrderResponse } from '../interfaces/order-response';
import { LanguageService } from 'src/app/core/language.service';

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

  constructor(
    private http: HttpClient,
    public lang: LanguageService
  ) {}

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

  filterOrders(dateStart, dateEnd, manufacturer: number[] = [], userId): Observable<any> {
    console.log(manufacturer);

    let lang = this.lang.current;
    let params = `?lang=${lang}&date_start=${dateStart}&date_end=${dateEnd}&manufacturer=${JSON.stringify(manufacturer)}&user_id=${userId}`;

    return this.http.get(`${environment.host}ownerOrders` + params);
  }

  // post(data: any): Observable<any> {
  //   return this.http.post(environment.catalog.option.option, data);
  // }

  // put(data: any, id: number): Observable<any> {
  //   return this.http.put(`${environment.catalog.option.option}/${id}`, data);
  // }
}
