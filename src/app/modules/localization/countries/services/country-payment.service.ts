import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, BehaviorSubject} from "rxjs";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CountryPaymentService {
  list: Array<any> = [];
  values: Array<number> = [];
  selected:any;
  changeDeliverPay = new BehaviorSubject([]);
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

  getByProdId(prodId: number): Observable<any> {
    return this.http.get<any>(
        environment.host + `getProductCategories/${prodId}`
    );

  }

  put(prodId: number): Observable<any> {
    let data = this.values;
    return this.http.put(
        `${environment.host}product_to_category/updateArray/${prodId}`,
        data
    );
  }
  getDeliver(): Observable<any> {
    return this.http.get<any>(environment.payment.payments);
}
getCountryDelivers(): Observable<any> {
    return this.http.get<any>(environment.countries.countrydeliverys);
}
editDeliver(id:any,arr:any): Observable<any> {
    return this.http.put<any>(`${environment.countrypaydeliver.countrypayarr}/${id}`,arr );
}
getDeliversCountry(id:any): Observable<any> {
    return this.http.get<any>(`${environment.countrypaydeliver.countrypay}/${id}`);
}

  initVales() {
    this.values = [];
    this.list.forEach((element) => {
      this.values.push(element.category_id);
    });
  }
}
