import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ICustomerResponse } from '../interfaces/customer-response';
import { ICustomerPostData } from '../interfaces/customer';

@Injectable({
  providedIn: "root",
})
export class CustomersService {
  page: number = 1;
  customer: ICustomerResponse = {
    count: 0,
    data: [],
    skip: 0,
    take: 10,
    host: environment.host
  };

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<ICustomerResponse> {
    let skip = this.page * this.customer.take - this.customer.take;
    let params = `?take=${this.customer.take}&skip=${skip}`;

    return this.http.get<ICustomerResponse>(
      `${environment.host}subscription_clients${params}`
    );
  }

  editCustomerInfo(customerEditedInfo, userId): Observable<any> {
    console.log(customerEditedInfo);

    return this.http.put<ICustomerPostData>(`${environment.host}subscription_client/${userId}`, customerEditedInfo);
  }
}
