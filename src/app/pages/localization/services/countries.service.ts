import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  page: number = 1;
  data = {
    count: 0,
    data: [],
    skip: 0,
    take: 10,
  };
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
  getCountry(): Observable<any> {
    let skip = this.page * this.data.take - this.data.take;
    let params = `?take=${this.data.take}&skip=${skip}`;
    return this.http.get<any>(environment.countries.countrys+params);
  }
  editCountry(id: number, item): Observable<any> {
    return this.http.put<any>(`${environment.countries.country}/${id}`, item);
  }
  deleteCountry(id:number):Observable<any> {
    return this.http.delete<any>(`${environment.countries.country}/${id}`)
  }
  addNewCountry(id:number,item) : Observable <any> {
    return this.http.post<any>(`${environment.countries.country}`, item);
  }
}
