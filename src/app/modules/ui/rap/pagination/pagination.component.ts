import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"]
})
export class PaginationComponent implements OnInit {
  @Input()
  page: number; // current page
  @Input()
  total: number; // total page
  @Input()
  loading: boolean;

  @Input()
  pagesToShow: number = 10;

  @Output()
  goPrev = new EventEmitter<boolean>();
  @Output()
  goNext = new EventEmitter<boolean>();
  @Output()
  goPage = new EventEmitter<number>();

  @Output()
  pageChanged = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  onPage(n: number): void {
    this.goPage.emit(n);
    this.pageChanged.emit();
  }

  onPrev(): void {
    this.goPrev.emit(true);
    this.pageChanged.emit();
  }

  onNext(): void {
    this.goNext.emit(true);
    this.pageChanged.emit();
  }

  pageList(): Array<number> {
    const c = this.total;
    const p = this.page || 1;
    const pagesToShow = this.pagesToShow || 9;
    const pages: number[] = [];
    pages.push(p);

    for (let i = 0; i < pagesToShow; i++) {
      if (pages.length < pagesToShow) {
        if (Math.min.apply(null, pages) > 2) {
          pages.push(Math.min.apply(null, pages) - 1);
        }

        if (Math.max.apply(null, pages) < c - 1) {
          pages.push(Math.max.apply(null, pages) + 1);
        }
      }
    }

    if (p != 1) pages.push(1);
    if (p != c) pages.push(c);

    pages.sort((a, b) => a - b);
    return pages;
  }
}
