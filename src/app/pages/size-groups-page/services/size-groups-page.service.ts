import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { from, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { LanguageService } from 'src/app/core/language.service';
import { ISizeGroupsResponse } from '../interfaces/size-groups-response';
//import { ILanguage } from "../localization/language/language.service";

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
  selectedSizeGroup: any;

  constructor(
    private http: HttpClient,
    private languageService: LanguageService,
  ) {}

  initEmptySizeGroup(): void {
    this.selectedSizeGroup = {
      id: null,
      sort_order: null,
      descriptions: [
        {
          id: null,
          name: null,
          lang_id: 1
        },
        {
          id: null,
          name: null,
          lang_id: 2
        },
        {
          id: null,
          name: null,
          lang_id: 3
        },
        {
          id: null,
          name: null,
          lang_id: 4
        }
      ]
    }
  }

  getList(): Observable<any> {
    const lang = localStorage.getItem('currentLang');
    return this.http.get(`${environment.host}size_groups?lang=${lang}`);
  }
  getListClient(): Observable<any> {
    const lang = localStorage.getItem('currentLang');
    return this.http.get(`${environment.host}size_group/client?lang=${lang}`);
  }
  updateSizeGroups(data: any, id: number): Observable<any> {
    return this.http.put(
      `${environment.host}size_group/${id}`,
      data
    );
  }

  createSizeGroups(data: any): Observable<any> {
    return this.http.post(`${environment.host}size_group`, data);
  }

  removeSizeGroup(id: number): Observable<any> {
    return this.http.delete( `${environment.host}size_group/${id}`) ;
  }

  getSizeGroupByLang(groupId: number): Observable<any> {
    const lang = localStorage.getItem('currentLang');
    return this.http.get(`${environment.host}size_group/client/${groupId}?lang=${lang}`);
  }
}
