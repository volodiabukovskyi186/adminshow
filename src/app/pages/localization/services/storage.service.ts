import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  selected:any;
  page: number = 1;
  data = {
    count: 0,
    data: [],
    skip: 0,
    take: 10,
  };

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
    let skip = this.page * this.data.take - this.data.take;
    let params = `?take=${this.data.take}&skip=${skip}`;
    return this.http.get<any>(environment.stockstatus.stockstatuss+params);
  }
  getStorageStatus(lang): Observable<any> {
    return this.http.get<any>(`${environment.localizations.stockstatus}?lang=${lang}`);
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
