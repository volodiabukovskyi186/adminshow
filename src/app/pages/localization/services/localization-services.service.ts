import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {IOrderResponse} from "../../orders/interfaces/order-response";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IOrderStatusUp} from "../../../modules/localization/interfaces/order-status-interfaces";
import {IOptionResponse} from "../../../modules/catalog/option/interfaces";

@Injectable({
  providedIn: 'root'
})
export class LocalizationServicesService {
  public selectedOrder: any;
  page: number = 1;
  data = {
    count: 0,
    data: [],
    skip: 0,
    take: 10,
  };


  bSubject = new BehaviorSubject({selectedOrder:this.selectedOrder});
  initEmptyOrderStatus(){
    this.selectedOrder={
      name:null,
      descriptions: [
        {
          "lang_id": 1,
          "dectiption": null
        },
        {
          "lang_id": 2,
          "dectiption": null
        },
        {
          "lang_id": 3,
          "dectiption": null
        },
        {
          "lang_id": 4,
          "dectiption": null
        }
      ]
    }
    this.bSubject.next(this.selectedOrder)
  }
  constructor(private http: HttpClient) {
    this.initEmptyOrderStatus();
  }
  getOrderStatus(): Observable<any> {
    console.log(this.data)
    let skip = this.page * this.data.take - this.data.take;
    let params = `?take=${this.data.take}&skip=${skip}`;
    return this.http.get<any>(environment.localizations.orderstatus+ params);
  }

  getOrderAllStatus(lang:string): Observable<any> {
    return this.http.get<any>(`${environment.localizations.orderstatuslang}?lang=${lang}`);
  }
  deleteOrderStatus(id:number):Observable<any> {
    return this.http.delete<any>(`${environment.localizations.orderstatusdel}/${id}`)
  }
  editOrderStaus(id:number,item:IOrderStatusUp):Observable<any>{
    console.log()
    return this.http.put<any>(`${environment.localizations.orderstatusup}/${id}`, item);
  }
  addNewOrderStatus(id:number,item:IOrderStatusUp) : Observable <any> {
    return this.http.post<any>(`${environment.localizations.orderstatusup}`, item);
  }


}
