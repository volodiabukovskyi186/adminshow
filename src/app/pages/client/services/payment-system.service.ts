import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class PaymentSystemService {

  selected:any;
  page: number = 1;
  data = {
    count: 0,
    data: [],
    skip: 0,
    take: 10,
  };

  constructor(private http: HttpClient) { }
  
  getLiqpay(): Observable<any> {
    return this.http.get<any>(environment.liqpay.liqpay);
  }
  updateLiqpay(item): Observable<any>{
    return this.http.put<any>(`${environment.liqpay.liqpay}`, item);
  }
  editDelivery(id: number, item): Observable<any> {
    return this.http.put<any>(`${environment.delivery.delivery}/${id}`, item);
  }
  deleteDelivery(id:number):Observable<any> {
    return this.http.delete<any>(`${environment.delivery.delivery}/${id}`)
  }
  addNewDelivery(id:number,item) : Observable <any> {
    return this.http.post<any>(`${environment.delivery.delivery}`, item);
  }
}
