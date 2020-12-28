import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IProductOption} from '../interfaces/option-product.interface';
import {environment} from '../../../../../environments/environment';
import {IProductOptionValue} from '../interfaces/product-option-value.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductOptionService {

  constructor(private http: HttpClient) { }

  createProductOption(productOption: IProductOption): Observable<IProductOption> {
    return this.http.post<IProductOption>(`${environment.catalog.option.productOption}`, productOption);
  }
  getOptionByProduct(id: number): Observable <any> {
    const lang = localStorage.getItem('currentLang');
    return this.http.get<any>(`${environment.catalog.option.productOpt}/${id}?lang=${lang}`);
  }
  createProductOptionValue(ProductValue: IProductOptionValue ): Observable<IProductOptionValue> {
    return this.http.post<IProductOptionValue>(`${environment.catalog.option.productOptVal}`, ProductValue);
  }
  getProductOptionValues(productId: number, optionId: number): Observable<any> {
    const lang = localStorage.getItem('currentLang');
    return this.http.get(`${environment.catalog.option.productAllOptVal}/${productId}/${optionId}?lang=${lang}`);
  }
  deleteProductValues(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.catalog.option.productOptVal}/${id}`);
  }
  deleteProductOption(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.catalog.option.productOption}/${id}`);
  }
}


