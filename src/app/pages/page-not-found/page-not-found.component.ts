import { Component, OnInit } from "@angular/core";
import { PagesService } from "../pages.service";

@Component({
  selector: "app-page-not-found",
  templateUrl: "./page-not-found.component.html",
  styleUrls: ["./page-not-found.component.scss"]
})
export class PageNotFoundComponent implements OnInit {
  constructor(public pages: PagesService) {
    pages.defaultSetting();
  }

  ngOnInit(): void {}
}
