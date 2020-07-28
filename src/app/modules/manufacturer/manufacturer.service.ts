import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IImageSrc } from "../gallery";
import { ILanguage } from "../localization/language/language.service";

export interface IManufacturerDesc {
  id: number;
  lang_id: number;
  manufactured_id: number;
  name: string;
  description: string;
  meta_description: string;
  meta_keywords: string;
  created_at: string;
  updated_at: string;
  lang?: ILanguage;
}

export interface IManufacturer {
  id: number;
  image_id: number;
  code: string;
  status: number;
  rating: number;
  created_at: string;
  updated_at: string;
  image: IImageSrc;
  host: string;
  description: Array<IManufacturerDesc>;
}

export interface IManufacturerResponse {
  count: number;
  data: Array<IManufacturer>;
  skip: number;
  take: number;
}
@Injectable({
  providedIn: "root",
})
export class ManufacturerService {
  manufacturer: IManufacturerResponse = {
    count: 0,
    data: [],
    skip: 0,
    take: 20,
  };
  page = 1;

  all: IManufacturer[] = [];

  constructor(private http: HttpClient) {}

  getList(): Observable<IManufacturerResponse> {
    let skip = this.page * this.manufacturer.take - this.manufacturer.take;
    let params = `?take=${this.manufacturer.take}&skip=${skip}`;
    return this.http.get<IManufacturerResponse>(
      environment.manufacturer.manufacturers + params
    );
  }

  getAll(): Observable<IManufacturerResponse> {
    return this.http.get<IManufacturerResponse>(
      environment.manufacturer.manufacturers + `?take=200&skip=0`
    );
  }

  post(data: any): Observable<any> {
    // let d = JSON.stringify(data);
    return this.http.post(environment.manufacturer.manufacturer, data);
  }

  put(data: any, id: number): Observable<any> {
    // let d = JSON.stringify(data);
    return this.http.put(
      `${environment.manufacturer.manufacturer}/${id}`,
      data
    );
  }

  updateStatus(id: number, status: number): Observable<any> {
    let data = JSON.stringify({
      status,
    });
    return this.http.put(
      `${environment.manufacturer.manufacturer}/updateStatus/${id}`,
      data
    );
  }

  updateStatusInList(id: number, status: number) {
    this.manufacturer.data.forEach((element) => {
      if (element.id === id) {
        element.status = status;
      }
    });
  }
}
