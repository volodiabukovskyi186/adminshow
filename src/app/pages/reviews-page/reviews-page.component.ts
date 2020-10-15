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
      name: 'statusCodes.confirmed',
      backgroundColor: '#52BE80'
    },
    "3": {
      name: 'statusCodes.rejected',
      backgroundColor: '#E74C3C '
    }
  }

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

  moderationOfReview(reviewToModerate) {
    console.log(reviewToModerate);

    this.selectedReview = reviewToModerate;
  }
  initPagesSettings = () =>{
     super.initPagesSettings();
     this.pages.panelButtonSettings.toggleFilter = false;
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
