import { Component, OnInit } from '@angular/core';
import { SearchService } from './services/search.service';
import { Router } from '@angular/router';
import { environment } from "src/environments/environment";

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


  constructor(
    public searchService: SearchService, 
    private router: Router,
    //public currency: CurrencyService
  ) { }

  public ngOnInit(): void {}

  public onInput(e): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      let v: string = e.target.value;

      if (v.length < 3) {
        return this.isActiveResults = false;
      }

      this.searchText = v;
      this.searchService.search(v).subscribe(this.searchHandler);

    }, this.time)
  }

  searchHandler = data => {
    this.searchService.list = data.data;
    this.isActiveResults = !!this.searchService.list.length;

    console.log(this.searchService.list);
  }

  public pressEnter(event): void {
    console.log(event);

    if (event.key === 'Enter') {
      this.router.navigate(['/products'], { queryParams: { search: this.searchText } });
    }
  }

  public closeSearchList(): void {
    this.isActiveResults = false;

    console.log(this.isActiveResults);
  }

  public selectProduct(selectedProductId: number): void {
    console.log(selectedProductId);

    if (selectedProductId) {
      this.router.navigate(['/products'], { queryParams: { search: selectedProductId } });
    }
  }
}
