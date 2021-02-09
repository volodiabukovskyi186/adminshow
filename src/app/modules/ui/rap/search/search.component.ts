import { Component, OnInit } from '@angular/core';
import { SearchService } from './services/search.service';
import { Router } from '@angular/router';
import { environment } from "src/environments/environment";
import { LanguageService } from 'src/app/core/language.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public isActiveResults: boolean = false;
  public host = environment.host;
  public isPressEnter: boolean;
  private searchText: string;
  public time: number = 500;
  public timer: any;
  public currentLang: string;

  constructor(
    public searchService: SearchService, 
    private router: Router,
    public lang: LanguageService
    //public currency: CurrencyService
  ) { }

  public ngOnInit(): void {
    this.currentLang = `/${this.lang.current}/products`;
  }

  public onInput(e): void {
    this.searchText = e.target.value;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      //let v: string = e.target.value;

      if (this.searchText.length < 3) {
        return this.isActiveResults = false;
      }

      //this.searchText = v;
      this.searchService.search(this.searchText).subscribe(this.searchHandler);

    }, this.time)
  }

  searchHandler = data => {
    this.searchService.list = data.data;
    this.isActiveResults = !!this.searchService.list.length;
  }

  public pressEnter(event): void {
    if (event.key === "Enter") {
      //debugger;
      this.router.navigate([`/${this.lang.current}/products`], { queryParams: { search: this.searchText } });
    }
  }

  public closeSearchList(): void {
    this.isActiveResults = false;
  }

  public selectProduct(selectedProductId: number): void {
    if (selectedProductId) {
      this.router.navigate([`/${this.lang.current}/products`], { queryParams: { search: selectedProductId } });
    }
  }
}
