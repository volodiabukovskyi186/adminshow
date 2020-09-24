import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ICategoryResponse, ICategory } from "./interfaces";
import { LanguageService } from 'src/app/core/language.service';
import { ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  page: number = 1;
  category: ICategoryResponse = {
    count: 0,
    data: [],
    skip: 0,
    take: 10,
    host: null,
  };
  all: Array<ICategory> = [];
  private querySubscription: Subscription;

  constructor(
    private http: HttpClient, 
    private lang: LanguageService,
    public route: ActivatedRoute
  ) {}

  getList(): Observable<ICategoryResponse> {
    let skip = this.page * this.category.take - this.category.take;
    let lang = this.lang.current;
    let params = `?take=${this.category.take}&skip=${skip}&lang=${lang}`;
    return this.http.get<ICategoryResponse>(
      environment.catalog.category.categorys + params
    );
  }

  getAllCategories(): Observable<ICategoryResponse> {
    console.log(window.location.pathname.slice(1, 3));

    //let lang = this.lang.current;
    let lang = window.location.pathname.slice(1, 3);
    console.log('1234lang==>', lang);
    let params = `?skip=0&lang=${lang}`;
    return this.http.get<ICategoryResponse>(
      environment.host + `client/category${params}`
    );
  }

  getAll(): Observable<ICategoryResponse> {
    let params = `?take=200&skip=0`;
    return this.http.get<ICategoryResponse>(
      environment.catalog.category.categorys + params
    );
  }

  post(data: any): Observable<any> {
    let d = JSON.stringify(data);
    return this.http.post(environment.catalog.category.category, data);
  }

  put(data: any, id: number): Observable<any> {
    let d = JSON.stringify(data);
    return this.http.put(
      `${environment.catalog.category.category}/${id}`,
      data
    );
  }

  updateStatus(id: number, status: number): Observable<any> {
    let data = JSON.stringify({
      status,
    });
    return this.http.put(
      `${environment.catalog.category.category}/updateStatus/${id}`,
      data
    );
  }

  updateStatusInList(id: number, status: number) {
    this.category.data.forEach((element) => {
      if (element.id === id) {
        element.status = status;
      }
    });
  }
}
