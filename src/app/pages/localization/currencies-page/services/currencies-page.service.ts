import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ICurrency } from '../interfaces/currency';

@Injectable({
  providedIn: "root",
})

export class CurrenciesService {
  page: number = 1;
  currency: any = {
    count: 0,
    data: [],
    skip: 0,
    take: 10,
    host: environment.host
  };

  public model: ICurrency;

  constructor(private http: HttpClient) {
    this.initEmptyModel();
  }

  initEmptyModel() {
    this.model = {
      id: null,
      currency_title: null,
      code: null,
      value: null,
      status: null,
      default: 1,
      simbol_left: null,
      simbol_right: null,
      decimal_places: 1,
      created_at: null,
      updated_at: null
    };
  }

  getCurrencies(): Observable<any> {
    let skip = this.page * this.currency.take - this.currency.take;
    let params = `?take=${this.currency.take}&skip=${skip}`;

    return this.http.get<any>(
      `${environment.host}currencys${params}`
    );
  }

  editCurrencyInfo(currencyEditedInfo, userId): Observable<any> {
    console.log(currencyEditedInfo);

    return this.http.put<any>(`${environment.host}currency/${userId}`, currencyEditedInfo);
  }

  createCurrency(newCurrency): Observable<any> {
    console.log(newCurrency);

    return this.http.post<any>(`${environment.host}currency`, newCurrency);
  }

  updateCurrencyStatus(id: number, status: number): Observable<any> {
    let data = JSON.stringify({
      status,
    });
    return this.http.put(
      `${environment.host}updateStatus/${id}`,
      data
    );
  }

  updateStatusCurrencyInList(id: number, status: number) {
    this.currency.data.forEach((element) => {
      if (element.id === id) {
        element.status = status;
      }
    });
  }
}
