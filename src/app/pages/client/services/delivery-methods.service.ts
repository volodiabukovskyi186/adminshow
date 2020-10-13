import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DeliveryMethodsService {

  selected:any;
  bSubject = new BehaviorSubject({selectedOrder:this.selected});
  initEmptyWeightForm(){
    this.selected={
      image_id:null,
      descriptions: [
        {
          "name":null,
          "lang_id": 1,
        },
        {
          "name":null,
          "lang_id": 2,
        },
        {
          "name":null,
          "lang_id": 3,
        },
        {
          "name":null,
          "lang_id": 4,
        }
      ]
    }
    this.bSubject.next(this.selected)
  }
  constructor(private http: HttpClient) {
    this.initEmptyWeightForm();
  }
  getDelivery(): Observable<any> {
    return this.http.get<any>(environment.delivery.deliverys);
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
