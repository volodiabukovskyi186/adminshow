import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {IOrderResponse} from "../../orders/interfaces/order-response";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IOrderStatusUp} from "../../../modules/localization/interfaces/order-status-interfaces";

@Injectable({
  providedIn: 'root'
})
export class LocalizationServicesService {
  public selectedOrder: any;
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
        }
      ]
    }
    this.bSubject.next(this.selectedOrder)
    // console.log(this.selectedOrder)
  }


  constructor(private http: HttpClient) {
    this.initEmptyOrderStatus();
  }

  getOrderStatus(): Observable<any> {
    return this.http.get<any>(environment.localizations.orderstatus);
  }
  deleteOrderStatus(id:number):Observable<any> {
    return this.http.delete<any>(`${environment.localizations.orderstatusdel}/${id}`)
  }
  editOrderStaus(id:number,item:IOrderStatusUp):Observable<any>{
    return this.http.put<any>(`${environment.localizations.orderstatusup}/${id}`, item);
  }
  addNewOrderStatus(id:number,item:IOrderStatusUp) : Observable <any> {
    return this.http.post<any>(`https://api.showu.com.ua/order_status`, item);
  }
  getOrderStorageStatus(): Observable<any> {
    return this.http.get<any>(environment.localizations.orderstoragestatus);
  }
  deleteOrderStorageStatus(order):Observable<any> {
    return this.http.delete<any>(environment.localizations.orderstoragestatus,order)
  }

}
