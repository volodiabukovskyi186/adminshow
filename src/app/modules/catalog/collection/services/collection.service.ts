import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ILanguage } from 'src/app/modules/localization/language/language.service';
import { IImageSrc } from 'src/app/modules/gallery';

export interface ICollectionDescription {
  id: number;
  collection_id: number;
  lang_id: number;
  title: string;
  subtitle: string;
  description: string;
  created_at: string;
  updated_at: string;
  language: ILanguage
  lang?: ILanguage
}

export interface ICollection {
  id: number;
  created_at: string;
  updated_at: string;
  status?: number;
  image_id: number;
  image: IImageSrc;
  descriptions: Array<ICollectionDescription>;
}

export interface ICollectionResponse {
  count: number;
  data: Array<ICollection>;
  skip: number;
  take: number;
  host: string;
}

@Injectable({
  providedIn: "root",
})
export class CollectionService {
  page: number = 1;
  data: ICollectionResponse = {
    count: 0,
    data: [],
    skip: 0,
    take: 10,
    host: null,
  };

  constructor(private http: HttpClient) {}

  getList(): Observable<ICollectionResponse> {
    // let skip = this.page * this.data.take - this.data.take;
    let params = `?take=${this.data.take}&skip=${this.data.skip}`;
    return this.http.get<ICollectionResponse>(
      environment.catalog.collection.collections + params
    );
  }

  getByCollectionId(collectionId): Observable<any>  {
    return this.http.get(`https://api.showu.com.ua/product_collection/getByCollection/${collectionId}`);
  }

  post(data: any): Observable<any> {
    return this.http.post(environment.catalog.collection.collection, data);
  }

  deleteCollectionById(collectionId: number): Observable<any> {
    return this.http.delete(`${environment.host}collection/${collectionId}`);
  }

  updateStatus(id: number, status: number): Observable<any> {
    let data = JSON.stringify({
      status,
    });
    return this.http.put(
      `${environment.catalog.collection.collection}/updateStatus/${id}`,
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
    return this.http.put(`${environment.catalog.collection.collection}/${id}`, data);
  }

  updateCollectionProducts(newProducts, collectionId): Observable<any> {
    // const params = {
    //   products: JSON.stringify(newProducts)
    // }
    return this.http.put(`https://api.showu.com.ua/product_collection/updateArray/${collectionId}`, newProducts);
  }
}
