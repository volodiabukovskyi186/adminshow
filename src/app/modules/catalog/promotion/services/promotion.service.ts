import { Injectable } from "@angular/core";
import { ILanguage } from "src/app/modules/localization/language/language.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IImageSrc } from "src/app/modules/gallery";

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

  constructor(private http: HttpClient) {}

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
}
