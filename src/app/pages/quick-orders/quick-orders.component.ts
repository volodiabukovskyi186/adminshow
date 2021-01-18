import { Component, OnInit } from '@angular/core';
import { BasePage } from "../../pages/@core";
import { PagesService } from '../pages.service';
import { LanguageService as Lang } from "src/app/core/language.service";
import { BreadcrumbsService } from "src/app/core/breadcrumbs.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-quick-orders',
  templateUrl: './quick-orders.component.html',
  styleUrls: ['./quick-orders.component.scss']
})
export class QuickOrdersComponent extends BasePage implements OnInit {

  constructor(
    public pagesService: PagesService,
    public lang: Lang,
    public breadcrumbs: BreadcrumbsService,
    private translate: TranslateService,
  ) {
    super(pagesService);
  }

  public ngOnInit(): void {
    super.initPagesSettings();
    super.initPanelButton();

    this.initTranslate();
  }

  public initTranslate(): void {
    this.lang.translate
      .get([
        "dashboard.dashboard",
        "MENU.orders.orders",
      ])
      .subscribe((tr: any) => {
        this.breadcrumbs.breadcrumbs = [
          { link: "", title: tr["dashboard.dashboard"] },
          { link: "orders", title: tr["MENU.orders.orders"] },
        ];
      });
  }


}
