import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { ICustomerResponse } from '../interfaces/customer-response';
import { ICustomerPostData } from '../interfaces/customer';

@Injectable({
  providedIn: "root",
})
export class CustomersService {
  page: number = 1;
  selected:any;
  customer: ICustomerResponse = {
    count: 0,
    data: [],
    skip: 0,
    take: 10,
    host: environment.host
  };

  bSubject = new BehaviorSubject({selectedOrder:this.selected});
  initEmptyCustomerForm(){
      this.selected={
        subscriptions_type_id: null,
        email:null ,
        first_name: null,
        last_name: null,
        telephone: null
      }
      this.bSubject.next(this.selected)
  }

  constructor(private http: HttpClient) {
    this.initEmptyCustomerForm();
  }

  getCustomers(): Observable<ICustomerResponse> {
    // let skip = this.page * this.customer.take - this.customer.take;
    let params = `?take=${this.customer.take}&skip=${this.customer.skip}`;

    return this.http.get<ICustomerResponse>(
      `${environment.host}subscription_clients${params}`
    );
  }
  editCustomerInfo(customerEditedInfo, userId): Observable<any> {
    return this.http.put<ICustomerPostData>(`${environment.host}subscription_client/${userId}`, customerEditedInfo);
  }
  createCustomerInfo(customerEditedInfo): Observable<any> {
    return this.http.post<any>(`${environment.host}subscription_client`, customerEditedInfo);
  }
  deleteCustomers(item): Observable<any> {
    return this.http.delete<ICustomerPostData>(`${environment.host}subscription_client`, item.id);
  }
  getCustomerTable(): Observable<any> {
    return this.http.get(`${environment.host}getXLSXFile`);
  }

}
