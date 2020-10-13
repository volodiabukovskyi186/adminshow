import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IReviewsResponse } from '../interfaces/reviews-response';
import { LanguageService } from 'src/app/core/language.service';

@Injectable({
  providedIn: "root",
})

export class ReviewsPageService {
  page: number = 1;
  reviews: IReviewsResponse = {
    count: 0,
    data: [],
    skip: 0,
    take: 10,
    host: environment.host
  };

  constructor(
    private http: HttpClient,
    public languageService: LanguageService
  ) {}

  getReviews(): Observable<IReviewsResponse> {
    let skip = this.page * this.reviews.take - this.reviews.take;
    let params = `?take=${this.reviews.take}&skip=${skip}`;

    return this.http.get<IReviewsResponse>(`${environment.host}reviews${params}`);
  }


}
