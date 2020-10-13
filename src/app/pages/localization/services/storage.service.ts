import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  selected:any;
  bSubject = new BehaviorSubject({selectedOrder:this.selected});
  initEmptyWeightForm(){
    this.selected={
      color:null,
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
  getWeight(): Observable<any> {
    return this.http.get<any>(environment.stockstatus.stockstatuss);
  }
  editWeight(id: number, item): Observable<any> {
    return this.http.put<any>(`${environment.stockstatus.stockstatus}/${id}`, item);
  }
  deleteWeight(id:number):Observable<any> {
    return this.http.delete<any>(`${environment.stockstatus.stockstatus}/${id}`)
  }
  addNewOrderStatus(id:number,item) : Observable <any> {
    return this.http.post<any>(`${environment.stockstatus.stockstatus}`, item);
  }
}
