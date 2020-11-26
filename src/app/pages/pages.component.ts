
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { LanguageService } from "../core/language.service";
import { PagesService } from "./pages.service";
import { BreadcrumbsService } from "../core/breadcrumbs.service";
import {
  trigger,
  style,
  transition,
  query,
  animateChild,
  animate,
  group,
} from "@angular/animations";
import { UserService } from "../modules/user/user.service";

const TO_LEFT = [
  style({ position: "relative" }),
  query(":enter, :leave", [
    style({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
    }),
  ]),
  query(":enter", [style({ left: "-100%" })]),
  query(":leave", animateChild()),
  group([
    query(":leave", [animate(".3s ease-in-out", style({ left: "100%" }))]),
    query(":enter", [animate(".3s ease-in-out", style({ left: "0%" }))]),
  ]),
  query(":enter", animateChild()),
];

const TO_RIGHT = [
  style({ position: "relative" }),
  query(":enter, :leave", [
    style({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
    }),
  ]),
  query(":enter", [style({ left: "100%" })]),
  query(":leave", animateChild()),
  group([
    query(":leave", [animate(".3s ease-in-out", style({ left: "-100%" }))]),
    query(":enter", [animate(".3s ease-in-out", style({ right: "0%" }))]),
  ]),
  query(":enter", animateChild()),
];

export const slideInAnimation = trigger("routeAnimations", [
  transition("* => LoginPage", TO_LEFT),
  transition("LoginPage => *", TO_RIGHT),
  transition("* => HomePage", TO_LEFT),
  transition("HomePage => *", TO_RIGHT),
]);

@Component({
  selector: "app-pages",
  templateUrl: "pages.component.html",
  animations: [
    slideInAnimation,
    // animation triggers go here
  ],
})
export class PagesComponent implements OnInit {
  constructor(
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    public pages: PagesService,
    public breadcrumbs: BreadcrumbsService,
    public lang: LanguageService, // public translate: TranslateService,
    private UserService:UserService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      // set lang
      this.lang.use(data["lang"]);
    });
    // this.UserService.SUser.next(true)
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
   
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData["animation"]
    );
  }

  onPlusClick() {
    if (this.pages.onPlusClick) this.pages.onPlusClick();
  }

  onSaveClick() {
    if (this.pages.onSaveClick) this.pages.onSaveClick();
  }

  onCancelClick() {
    if (this.pages.onCancelClick) this.pages.onCancelClick();
  }

  onReviewClick() {
    if (this.pages.onReviewClick) this.pages.onReviewClick();
  }

  onTogleFilterClick() {
    if (this.pages.onTogleFilterClick) this.pages.onTogleFilterClick();
  }
  onDwnloadClick() {
    

    if (this.pages.onDwnloadClick) this.pages.onDwnloadClick();
  }
}
