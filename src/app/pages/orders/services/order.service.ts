import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IOrderResponse } from '../interfaces/order-response';
import { LanguageService } from 'src/app/core/language.service';
import { ManufacturerService } from '../../../modules/manufacturer/manufacturer.service';

@Injectable({
  providedIn: "root",
})
export class OrderService {
  page: number = 1;
  order: IOrderResponse = {
    count: 0,
    data: [],
    skip: 0,
    take: 10,
    sum: 0,
    host: environment.host
  };

  constructor(
    private http: HttpClient,
    public lang: LanguageService,
    public manufacturerService: ManufacturerService
  ) {}

  getList(role_id?: number, is_oneclick?: number): Observable<IOrderResponse> {
    const lang = localStorage.getItem('currentLang');
    // let skip = this.page * this.order.take - this.order.take;

    let params = `?take=${this.order.take}&skip=${this.order.skip}&lang=${lang}&is_oneclick=${is_oneclick}`;

    // ${this.order.take}
    console.log('role_id===>' , role_id);

    if (role_id == 1) {
      return this.http.get<IOrderResponse>(
        environment.orderang + params
      );
    }
    else {  
      return this.http.get<IOrderResponse>(
        environment.managerorder + params
      );
    }
  }

  updateUserOrder(id: any, data: any): Observable<any>{
    return this.http.put(`${environment.host}order/${id}`, data);
  }

  filterOrders(dateStart: string, dateEnd: string, manufacturers: number[], status: number[], managerId: number, userId: number): Observable<any> {
    let lang = this.lang.current;
    let params = `?lang=${lang}`;
   
    if (status && status.length > 0) {
     
      params = params + `&status=[${status}]`;
    }

    if (dateEnd) {
      params = params + `&date_end=${dateEnd}`;
    }

    if (dateStart) {
      params = params + `&date_start=${dateStart}`;
    }

    if (manufacturers.length !== 0) {
      params = params + `&manufacturer=${JSON.stringify(manufacturers)}`;
    }

    if (managerId) {
      params = params + `&manager=${managerId}`;
    }

    if (userId) {
      params = params + `&user_id=${userId}`;
    }
    console.log(`${environment.host}ownerOrders` + params);

    return this.http.get(`${environment.host}ownerOrders` + params);
  }

  getClients(): Observable<any> {
    return this.http.get(`${environment.host}/users`);
  }
  
  searchClient(searchData): Observable<any> {
    let params = `?q=${searchData}`;

    return this.http.get(`${environment.host}clients/search` + params);
  }
  getHistoryById(orderId): Observable<any>{
    const lang = localStorage.getItem('currentLang');
    return this.http.get(`${environment.host}order/getOrderHistory/${orderId}?lang=${lang}`);
  }

  updateOrderClientInfo(userId: number, data): Observable<any> {
    return this.http.put(`${environment.host}order/clinetData/${userId}`, data);
  }

  updateOrderDeliveryData(userId: number, data): Observable<any> {
    return this.http.put(`${environment.host}order/deliveryData/${userId}`, data);
  }

  createOrderProduct(productData): Observable<any> {
    return this.http.post(`${environment.host}order_product`, productData);
  }

  orderProductToDelete(productId: number): Observable<any> {
    return this.http.delete(`${environment.host}order_product/${productId}`)
  }

  getOrderById(orderId: number): Observable<any> {
    return this.http.get(`${environment.host}order/${orderId}`);
  }

  updateProductOrder(orderProductId: number, productData): Observable<any> {
    return this.http.put(`${environment.host}order_product/${orderProductId}`, productData);
  }

  getOrderProductsByOrderId(productOrderId: number): Observable<any> {
    return this.http.get(`${environment.host}order/getProductsOrder/${productOrderId}`);
  }

  filterQuickOrders(role_id: number, dateStart: string, dateEnd: string, manufacturers: number[], status: number[], managerId: number, userId: number, is_oneclick?: number): Observable<any> {
    let lang = this.lang.current;
    let params = `?lang=${lang}`;
   
    if (status && status.length > 0) {
     
      params = params + `&status=[${status}]`;
    }

    if (dateEnd) {
      params = params + `&date_end=${dateEnd}`;
    }

    if (dateStart) {
      params = params + `&date_start=${dateStart}`;
    }

    if (manufacturers.length !== 0) {
      params = params + `&manufacturer=${JSON.stringify(manufacturers)}`;
    }

    if (managerId) {
      params = params + `&manager=${managerId}`;
    }

    if (userId) {
      params = params + `&user_id=${userId}`;
    }

    if (is_oneclick) {
      params = params + `&is_oneclick=${is_oneclick}`
    }

    console.log(`${environment.host}ownerOrders` + params);

    
    if (role_id === 1) {
      return this.http.get<IOrderResponse>(
        environment.orderang + params
      );
    }
    else {  
      return this.http.get<IOrderResponse>(
        environment.managerorder + params
      );
    }

    // return this.http.get(`${environment.host}ownerOrders` + params);
  }

  checkLiqpayOrderStatus(data): Observable<any> {
    return this.http.post(`${environment.host}payment/status`, data);
  }
}
