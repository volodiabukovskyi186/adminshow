import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { TranslateService } from "@ngx-translate/core";
import { BreadcrumbsService } from "src/app/core/breadcrumbs.service";
import { PagesService } from "../pages.service";

@Component({
  selector: "app-dashboard-page",
  templateUrl: "./dashboard-page.component.html",
  styleUrls: ["./dashboard-page.component.scss"]
})
export class DashboardPageComponent implements OnInit {
  constructor(
    private _title: Title,
    public breadcrumbs: BreadcrumbsService,
    public pages: PagesService,
    public translate: TranslateService
  ) {
    breadcrumbs.breadcrumbs = [{ link: "", title: "Dashboard" }];
    pages.defaultSetting();
    pages.panelSettings.top = true;
    pages.panelSettings.left = true;
  }

  ngOnInit(): void {
    this._title.setTitle("Dashboard | RAP for ShowU");
  }
}
