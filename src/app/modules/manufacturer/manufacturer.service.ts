import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { from, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IImageSrc } from "../gallery";
import { ILanguage } from "../localization/language/language.service";
import { LanguageService } from 'src/app/core/language.service';
import { UserService } from '../user/user.service';
import {ManufactureTableModel} from './modules/manufacture-table.model';

export interface IManufacturerDesc {
  id: number;
  lang_id?: number;
  manufactured_id: number;
  name?: string;
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
    take: 10,
  };
  page = 1;

  all: IManufacturer[] = [];
  managerManufacturers = [];
  currentUserRoleId: number;

  constructor(
    private http: HttpClient,
    private languageService: LanguageService,
    public userService: UserService
  ) {
    this.getUserRoleId();
  }

  getList(user_role): Observable<IManufacturerResponse> {
    
    // let skip = this.page * this.manufacturer.take - this.manufacturer.take;
    const lang = localStorage.getItem('currentLang');
   
    if (user_role == 1) {
      let params = `?take=${this.manufacturer.take}&skip=${this.manufacturer.skip}`;
      return this.http.get<IManufacturerResponse>(
        environment.manufacturer.manufacturers + params
      );
    }
    else {
      let params = `?take=${this.manufacturer.take}&skip=${this.manufacturer.skip}&lang=${lang}`;
      // return this.http.get<IManufacturerResponse>(
      //   environment.manufacturer.manufacturers + params
      // );
      return this.http.get<IManufacturerResponse>(
        environment.manufacturer.manager + params
      );
    }
  }
  getManufactureTable(id: number, manufacId: number): Observable <any> {
    return  this.http.get(`https://api.showu.com.ua/size_group/size_table/${id}?lang=ua&manufacturer=${manufacId}`);
  }

  getAll(): Observable<IManufacturerResponse> {
    return this.http.get<IManufacturerResponse>(
      environment.manufacturer.manufacturers + `?take=200&skip=0`
    );
  }

  getAllManufactures(): Observable<any> {
    let lang = this.languageService.current;
    return this.http.get(`https://api.showu.com.ua/client/manufacturers?lang=${lang}`);
  }

  getManagerManufacturers(): Observable<any> {
    return this.http.get(`${environment.host}manager/manufacturers`);
  }

  getUserRoleId(): void {
    this.userService.getByToken().subscribe((res) => {
      this.currentUserRoleId = res.data.user.role_id;

      console.log(this.currentUserRoleId);
    });
  }

  getManufacturersByRoleId(): Observable<any> {
    let lang = this.languageService.current;

    if (this.currentUserRoleId === 1) {
      return this.http.get(`https://api.showu.com.ua/client/manufacturers?lang=${lang}`);
    }
    
    if (this.currentUserRoleId !== 1) {
      return this.http.get(`${environment.host}manager/manufacturers`);
    }
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
  deleteManufacture(id:number): Observable<any> {
    return this.http.delete( `${environment.manufacturer.manufacturer}/${id}`) ;
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
  createManufacturesSize(table: ManufactureTableModel): Observable<ManufactureTableModel> {
    return  this.http.post<ManufactureTableModel>(`${environment.sizes.size_value}`, table);
  }
}
