import { Injectable } from "@angular/core";
import { ILanguage } from "src/app/modules/localization/language/language.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IImageSrc } from "src/app/modules/gallery";
import { LanguageService } from 'src/app/core/language.service';

export interface IPromotionDescription {
  id: number;
  promotion_id: number;
  lang_id: number;
  title: string;
  subtitle: string;
  description: string;
  created_at: string;
  updated_at: string;
  image_id: number;
  data_start: string;
  data_end: string;

  language: ILanguage;
  image: IImageSrc;
  lang?: ILanguage;
}

export interface IPromotion {
  id: number;
  created_at: string;
  updated_at: string;
  status?: number;
  descriptions: Array<IPromotionDescription>;
}

export interface IPromotionResponse {
  count: number;
  data: Array<IPromotion>;
  skip: number;
  take: number;
  host: string;
}

@Injectable({
  providedIn: "root",
})
export class PromotionService {
  page: number = 1;
  data: IPromotionResponse = {
    count: 0,
    data: [],
    skip: 0,
    take: 10,
    host: null,
  };

  constructor(
    private http: HttpClient,
    private languageService: LanguageService
  ) {}

  get(): Observable<any>  {
    return this.http.get(environment.catalog.promotion.promotions);
  }

  getByPromotionId(promotionId): Observable<any>  {
    return this.http.get(`https://api.showu.com.ua/product_promotion/getByPromotion/${promotionId}`);
  }

  removePromotion(promotionId) {
    return this.http.delete(`${environment.catalog.promotion.promotion}/${promotionId}`);
  }

  getList(): Observable<IPromotionResponse> {
    let skip = this.page * this.data.take - this.data.take;
    let params = `?take=${this.data.take}&skip=${skip}`;
    return this.http.get<IPromotionResponse>(
      environment.catalog.promotion.promotions + params
    );
  }

  post(data: any): Observable<any> {
    return this.http.post(environment.catalog.promotion.promotion, data);
  }

  updateStatus(id: number, status: number): Observable<any> {
    let data = JSON.stringify({
      status,
    });
    return this.http.put(
      `${environment.catalog.promotion.promotion}/updateStatus/${id}`,
      data
    );
  }

  updateStatusInList(id: number, status: number) {
    this.data.data.forEach((element) => {
      if (element.id === id) {
        element.status = status;
      }
    });
  }

  put(data: any, id: number): Observable<any> {
    return this.http.put(`${environment.catalog.promotion.promotion}/${id}`, data);
  }

  searchProduct(eventValue): Observable<any> {
    let take = 100;
    return this.http.get(`https://api.showu.com.ua/product/searchProduct?skip=0&take=${take}&q=${eventValue}`);
  }

  getAllCategories(): Observable<any> {
    let lang = this.languageService.current;
    return this.http.get(`https://api.showu.com.ua/client/category?lang=${lang}&skip=0&take=20`);
  }

  getProductByFilters(categoryIds?, manufacturerIds?): Observable<any> {
    let lang = this.languageService.current;
    let query = `https://api.showu.com.ua/client/getProductsByFilterClient?lang=${lang}&skip=0&sort_by=id`;

    console.log(categoryIds);
    console.log(manufacturerIds);

    if (categoryIds && categoryIds.length > 0){
      query += `&category_id=${JSON.stringify(categoryIds)}`;
    }

    if (manufacturerIds && manufacturerIds.length > 0){
      query += `&manufacturer_id=${JSON.stringify(manufacturerIds)}`;
    }

    console.log(query);
    return this.http.get(query);
  }

  getAllProducts(): Observable<any> {
    let lang = this.languageService.current;
    return this.http.get(`https://api.showu.com.ua/client/products?lang=${lang}`);
  }

  updatePromotionProducts(newProducts, promotionId): Observable<any> {
    // const params = {
    //   products: JSON.stringify(newProducts)
    // }
    return this.http.put(`https://api.showu.com.ua/product_promotion/updateArray/${promotionId}`, newProducts);
  }
}
