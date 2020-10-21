import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
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
               
            ],
            image:[
                {"src":null},
                {"src_mini":null}
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

        return this.http.get<any>(environment.payment.payments+params);
    }
    editWeight(id: number, item): Observable<any> {
        return this.http.put<any>(`${environment.payment.payment_description}/${id}`, item);
    }
    deleteWeight(id:number):Observable<any> {
        return this.http.delete<any>(`${environment.payment.payment}/${id}`)
    }
    addNewOrderStatus(id:number,item) : Observable <any> {
        return this.http.post<any>(`${environment.payment.payment}`, item);
    }
}
