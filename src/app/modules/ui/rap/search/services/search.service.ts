import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { LanguageService } from 'src/app/core/language.service';

@Injectable({
  providedIn: "root",
})
export class SearchService {
  list: Array<any> = [];

  constructor(
    private http: HttpClient, 
    private lang: LanguageService
  ) {}

  search(q: string): Observable<any> {
    let skip = 0,
        take = 20;
    let lang = this.lang.current;
    let params = `?skip=${skip}&take=${take}&q=${q}&lang=${lang}`;
    console.log(params);
    
    return this.http.get<any>(
      environment.host + `product/searchProduct` + params
    );
  }
}
