import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IOrderStatusUp} from "../../../modules/localization/interfaces/order-status-interfaces";

@Injectable({
    providedIn: 'root'
})
export class WeightService {
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
            value:null,
            default:null,
            description: [
                {
                    "lang_id": 1,
                    "title":null,
                    "unit": null
                },
                {
                    "lang_id": 2,
                    "title":null,
                    "unit": null
                },
                {
                    "lang_id": 3,
                    "title":null,
                    "unit": null
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
        return this.http.get<any>(environment.weight.weights+params);
    }
    // https://api.showu.com.ua/order_status/client
    getWeightProd(lang:string): Observable<any> {
        return this.http.get<any>(`${environment.localizations.weightclient}?lang=${lang}`);
      }
    editWeight(id: number, item): Observable<any> {
        return this.http.put<any>(`${environment.weight.weight}/${id}`, item);
    }
    deleteWeight(id:number):Observable<any> {
        return this.http.delete<any>(`${environment.weight.weight}/${id}`)
    }
    addNewOrderStatus(id:number,item) : Observable <any> {
        return this.http.post<any>(`${environment.weight.weight}`, item);
    }
}
