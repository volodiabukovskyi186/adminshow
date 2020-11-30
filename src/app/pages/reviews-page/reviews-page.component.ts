import { Component, OnInit } from '@angular/core';
import { BasePage } from "../@core";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ToastrService } from "ngx-toastr";
import { PagesService } from "../pages.service";
import { BreadcrumbsService } from "src/app/core/breadcrumbs.service";
import { LanguageService as Lang } from "src/app/core/language.service";
import { ReviewsPageService } from  "../reviews-page/services/reviews-page.service";
import { LanguageService } from "src/app/modules/localization/language/language.service";
import { RoleService } from 'src/app/core/auth/models/role.service';

@Component({
  selector: 'app-reviews-page',
  templateUrl: './reviews-page.component.html',
  styleUrls: ['./reviews-page.component.scss']
})
export class ReviewsPageComponent extends BasePage implements OnInit {
  public selectedReview: any;
  public reviewsStatus: number;

  public statusCodes = {
    "0": {
      name: 'statusCodes.new',
      backgroundColor: '#3498DB'
    },
    "-1": {
      name: 'statusCodes.rejected',
      backgroundColor: '#52BE80'
    },
    "1": {
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
    public langService: LanguageService,
    public roleService:RoleService
  ) { 
    super(pages);
    
  }
  public showFilters: boolean = false;
  public reviewsData: any;
  public reviewId: number;

  userRoleId:number;
  userRoleStatus:boolean=false;

  public ngOnInit(): void {
    this.initPagesSettings();
    super.initPanelButton();
    this.breadcrumbs.breadcrumbs = [
      { link: "", title: "Dashboard" },
      { link: "reviews", title: "Reviews" },
    ];

    this.getLangList();
    
    this.initTranslate();

    this. getUserByTokin()
    this.pages.panelButtonSettings.review = true;
    this.pages.panelButtonSettings.plus = false;

    this.pages.panelButtonSettings.rightToggle = true;
    this.pages.panelButtonSettings.toggleFilter = false;
    this.pages.onTogleFilterClick = () => {    
      this.showFilters = true;      
      this.openForm();      
    }
  }
  getUserByTokin():void{
    this.roleService.getByToken().subscribe(data=>{
      this.userRoleId=data.data.user.role_id
      if(this.userRoleId==1){
        this.userRoleStatus=true;
      }
      this.getList(this.userRoleId);
    })
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
  getList(user_role) {
    this.ngxService.start();
    this.reviewsPageService.getReviews(user_role).subscribe(this.getListHandler);
  }

  getListHandler = (data) => {
   
    this.ngxService.stopAll();
    this.reviewsPageService.reviews = data;
    console.log('reviews',this.reviewsPageService.reviews)
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
    // this.reviewsStatus=this.selec
    console.log('selected==>', this.selectedReview)
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
  reviewsSatus(event):void{
    this.reviewsStatus=event
   
  }


  save = () => {
    console.log('statussave===>',this.reviewsStatus)
    if (this.selectedReview && !this.showFilters) {
    console.log('reviews',this.reviewsData)
      const commentreview={
        parent_id: this.reviewId ,
        user_id: this.reviewsData.user_id,
        author: this.reviewsData.author,
        text: this.reviewsData.text,
        like_count: 0,
        dislike_count: 0,
        status: 1
      }
      this.reviewsPageService.addcommentReviewById(commentreview, this.reviewId).subscribe((res) => {
        // this.reviewsPageService.reviews?.data.forEach((val) => {
          // if (res.data.id === val.id) {
          //   val.text = res.data.text;
          //   val.status = res.data.status;
          // }
        // })
        this.reviewsPageService.getReviews(this.userRoleId).subscribe(data=>{
          this.reviewsPageService.reviews=data
        })
        this.toastr.success("REVIEW  ADDED ^_^");
      })
      if(this.reviewsStatus){
        this.reviewsPageService.updateReviewStatus(this.reviewId,{status:this.reviewsStatus}).subscribe(data=>{
          this.toastr.success("REVIEW STATUS UPDATED ^_^");
        })
      }
    }

    if (this.showFilters) {
      this.reviewsPageService.getReviewsByFilter(this.updateDateStart, this.updateDateEnd, this.updateStatus)
      .subscribe((res) => {
        this.reviewsPageService.reviews.data = res.data;
      })
    }

    this.closeForm();
  }

  pageEvent(event):void{
    console.log('event===>',event)
    this.reviewsPageService.reviews.count=event.length
    this.reviewsPageService.reviews.take=event.pageSize
    this.reviewsPageService.reviews.skip=event.pageSize*event.pageIndex
    this.getList(this.userRoleId);
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
    this.getList(this.userRoleId);
    window.scrollTo(0, 0);
  }
  Math = Math;

}
