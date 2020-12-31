import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { from, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { LanguageService } from 'src/app/core/language.service';
import { ISizeGroupsResponse } from '../interfaces/size-groups-response';

//import { ILanguage } from "../localization/language/language.service";
//import { UserService } from '../user/user.service';

@Injectable({
  providedIn: "root",
})

export class SizeGroupsService {
  sizeGroups: ISizeGroupsResponse = {
    count: 0,
    data: [],
    skip: 0,
    take: 10,
    host: environment.host
  };
  page = 1;

  // all: IManufacturer[] = [];
  // currentUserRoleId: number;

  constructor(
    private http: HttpClient,
    private languageService: LanguageService,
    //public userService: UserService
  ) {}

  getList(): Observable<any> {
    //const lang = localStorage.getItem('currentLang');
    return this.http.get(`${environment.host}size_groups`);
  }

  // getAll(): Observable<IManufacturerResponse> {
  //   return this.http.get<IManufacturerResponse>(
  //     environment.manufacturer.manufacturers + `?take=200&skip=0`
  //   );
  // }

  // getAllManufactures(): Observable<any> {
  //   let lang = this.languageService.current;
  //   return this.http.get(`https://api.showu.com.ua/client/manufacturers?lang=${lang}`);
  // }

  // getManagerManufacturers(): Observable<any> {
  //   return this.http.get(`${environment.host}manager/manufacturers`);
  // }

  // getUserRoleId(): void {
  //   this.userService.getByToken().subscribe((res) => {
  //     this.currentUserRoleId = res.data.user.role_id;

  //     console.log(this.currentUserRoleId);
  //   });
  // }

  // getManufacturersByRoleId(): Observable<any> {
  //   let lang = this.languageService.current;

  //   if (this.currentUserRoleId === 1) {
  //     return this.http.get(`https://api.showu.com.ua/client/manufacturers?lang=${lang}`);
  //   }
    
  //   if (this.currentUserRoleId !== 1) {
  //     return this.http.get(`${environment.host}manager/manufacturers`);
  //   }
  // }

  // post(data: any): Observable<any> {
  //   // let d = JSON.stringify(data);
  //   return this.http.post(environment.manufacturer.manufacturer, data);
  // }

  // put(data: any, id: number): Observable<any> {
  //   // let d = JSON.stringify(data);
  //   return this.http.put(
  //     `${environment.manufacturer.manufacturer}/${id}`,
  //     data
  //   );
  // }
  // deleteManufacture(id:number): Observable<any> {
  //   return this.http.delete( `${environment.manufacturer.manufacturer}/${id}`) ;
  // }

  // updateStatus(id: number, status: number): Observable<any> {
  //   let data = JSON.stringify({
  //     status,
  //   });
  //   return this.http.put(
  //     `${environment.manufacturer.manufacturer}/updateStatus/${id}`,
  //     data
  //   );
  // }

  // updateStatusInList(id: number, status: number) {
  //   this.manufacturer.data.forEach((element) => {
  //     if (element.id === id) {
  //       element.status = status;
  //     }
  //   });
  // }
}
