import { Component, OnInit } from '@angular/core';
import { BasePage } from "../@core";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ToastrService } from "ngx-toastr";
import { PagesService } from "../pages.service";
import { BreadcrumbsService } from "src/app/core/breadcrumbs.service";
import { LanguageService as Lang } from "src/app/core/language.service";
import { ReviewsPageService } from  "../reviews-page/services/reviews-page.service";
import { LanguageService } from "src/app/modules/localization/language/language.service";

@Component({
  selector: 'app-reviews-page',
  templateUrl: './reviews-page.component.html',
  styleUrls: ['./reviews-page.component.scss']
})
export class ReviewsPageComponent extends BasePage implements OnInit {
  public selectedReview: any;
  public statusCodes = {
    "1": {
      name: 'statusCodes.new',
      backgroundColor: '#3498DB'
    },
    "2": {
      name: 'statusCodes.rejected',
      backgroundColor: '#52BE80'
    },
    "3": {
      name: 'statusCodes.approved',
      backgroundColor: '#E74C3C '
    }
  }

  public updateDateStart: any;
  public updateDateEnd: any;
  public updateStatus: number;

  constructor(
    protected ngxService: NgxUiLoaderService,
    protected toastr: ToastrService,
    public pages: PagesService,
    public breadcrumbs: BreadcrumbsService,
    public lang: Lang,
    public reviewsPageService: ReviewsPageService,
    public langService: LanguageService
  ) { 
    super(pages);
    
  }

  public showFilters: boolean = false;
  public reviewsData: any;
  public reviewId: number;

  public ngOnInit(): void {
    this.initPagesSettings();
    super.initPanelButton();
    this.breadcrumbs.breadcrumbs = [
      { link: "", title: "Dashboard" },
      { link: "reviews", title: "Reviews" },
    ];

    this.getLangList();
    this.getList();
    this.initTranslate();

       
    this.pages.panelButtonSettings.review = true;
    this.pages.panelButtonSettings.plus = false;

    this.pages.panelButtonSettings.rightToggle = true;
    this.pages.panelButtonSettings.toggleFilter = false;
    this.pages.onTogleFilterClick = () => {    
      this.showFilters = true;      
      this.openForm();      
    }
  }

  public initTranslate(): void {
    this.lang.translate
      .get([
        "dashboard.dashboard",
        "MENU.reviews.product_reviews",
      ])
      .subscribe((tr: any) => {
        this.breadcrumbs.breadcrumbs = [
          { link: "", title: tr["dashboard.dashboard"] },
          { link: "reviews", title: tr["MENU.reviews.product_reviews"] },
        ];
      });
  }

  getList() {
    this.ngxService.start();
    this.reviewsPageService.getReviews().subscribe(this.getListHandler);
  }

  getListHandler = (data) => {
    this.ngxService.stopAll();
    this.reviewsPageService.reviews = data;
  };

  getLangList() {
    this.ngxService.start();
    this.langService.getLangs().subscribe(this.getLangListHandler);
  }

  getLangListHandler = (data) => {
    this.ngxService.stopAll();
    this.langService.languages = data;

    // this.manufacturerForm.initDesc(this.langService.languages.data);
  };

  public modifyDateString(date: string, type?: string): string {
    let substringDate = date?.substring(0, 16);
    let t = new Date(substringDate);

    return substringDate;
  
    // if (type === 'day') {
    //   return t.getDate();
    // } else if (type === 'months') {
    //   return this.monthNames[0][t.getMonth()];
    // } else if (type === 'year') {
    //   return t.getFullYear()
    // }
  }

  moderationOfReview(reviewToModerate) {

    this.selectedReview = reviewToModerate;
    this.reviewId = this.selectedReview.id;
  }

  initPagesSettings = () =>{
     super.initPagesSettings();
     this.pages.panelButtonSettings.toggleFilter = false;
  }

  
  reviewsFiltersFormData(event) {
    console.log(event);

    this.updateDateStart = event.date_start;
    this.updateDateEnd = event.date_end;
    this.updateStatus = event.status;
  }

  reviewsFormData(event) {
    console.log(event);

    this.reviewsData = event;
  }

  closeForm = () => {
    this.pages.panelSettings.form = false;
    this.pages.panelButtonSettings.plus = false;
    this.pages.panelButtonSettings.save = false;
    this.pages.panelButtonSettings.cancel = false;
    this.pages.panelButtonSettings.rightToggle = true;    
    this.pages.panelButtonSettings.review = true;
    this.showFilters = false;
  }  

  openForm = () => {
    this.pages.panelSettings.form = true;
    this.pages.panelButtonSettings.plus = false;
    this.pages.panelButtonSettings.save = true;
    this.pages.panelButtonSettings.cancel = true;
    this.pages.panelButtonSettings.rightToggle = false;
    this.pages.panelButtonSettings.review = false;
  };

  save = () => {
    if (this.selectedReview && !this.showFilters) {
      this.reviewsPageService.updateReviewById(this.reviewsData, this.reviewId).subscribe((res) => {
        this.reviewsPageService.reviews?.data.forEach((val) => {
          if (res.data.id === val.id) {
            val.text = res.data.text;
            val.status = res.data.status;
          }
        })
      })
    }

    if (this.showFilters) {
      this.reviewsPageService.getReviewsByFilter(this.updateDateStart, this.updateDateEnd, this.updateStatus)
      .subscribe((res) => {
        this.reviewsPageService.reviews.data = res.data;
      })
    }

    this.closeForm();
  }

  putHandler = (data) => {
    this.ngxService.stopAll();
    this.closeForm();
    this.toastr.success("REVIEW UPDATED ^_^");
  };

  pageToHandler(page: number): void {
    this.reviewsPageService.page = page;
  }
  pagePrevHandler(): void {
    this.reviewsPageService.page--;
  }
  pageNextHandler(): void {
    this.reviewsPageService.page++;
  }
  pageChangedHandler(): void {
    this.getList();
    window.scrollTo(0, 0);
  }
  Math = Math;

}
