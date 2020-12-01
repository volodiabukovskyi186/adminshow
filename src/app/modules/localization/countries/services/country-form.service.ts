import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CountryFormService {
    public selected:any;
    public changeDeliver = new BehaviorSubject([]);
    public bSubject = new BehaviorSubject({selectedOrder:this.selected});

    constructor(private http: HttpClient) {
        this.initEmptyWeightForm();
    }

    public initEmptyWeightForm(): void {
        this.selected = {
            image_id: null,
            iso: null,
            description: [
                {
                    "lang_id": 1,
                    "title": null,
                    "unit": null
                },
                {
                    "lang_id": 2,
                    "title": null,
                    "unit": null
                },
                {
                    "lang_id": 3,
                    "title": null,
                    "unit": null
                },
                {
                    "lang_id": 3,
                    "title": null,
                    "unit": null
                }
            ]
        }
        this.bSubject.next(this.selected);
    }
    
    public getDeliver(): Observable<any> {
        return this.http.get<any>(environment.delivery.deliverys);
    }

    public getCountryDelivers(): Observable<any> {
        return this.http.get<any>(environment.countries.countrydeliverys);
    }

    public editDeliver(id:any,arr:any): Observable<any> {
        return this.http.put<any>(`${environment.countrypaydeliver.countrydeliverarr}/${id}`,arr );
    }

    public getDeliversCountry(id:any): Observable<any> {
        return this.http.get<any>(`${environment.countrypaydeliver.countrydeliver}/${id}`);
    }
  
    // editDeliver(id: number, item): Observable<any> {
    //     return this.http.put<any>(`${environment.countries.countrypay}/${id}`, item);
    // }
    // deleteDeliver(id:number):Observable<any> {
    //     return this.http.delete<any>(`${environment.countries.delivers.delivery}/${id}`)
    // }
    // addNewDeliver(id:number,item) : Observable <any> {
    //     return this.http.post<any>(`${environment.countries.delivers.delivery}`, item);
    // }
    // country_payment/updateArray
}
