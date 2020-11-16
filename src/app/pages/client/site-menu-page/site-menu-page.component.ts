import { Component, OnInit } from "@angular/core";
import { BasePage } from "../../@core";
import { PaginationPage } from "src/app/modules/ui/rap/pagination/pagination-page";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ToastrService } from "ngx-toastr";
import { BreadcrumbsService } from "src/app/core/breadcrumbs.service";
import { PagesService } from "../../pages.service";
import {
  SiteMenuService,
  ISiteMenu,
} from "src/app/modules/client/site-menu/site-menu.service";
import { SiteMenuFormService } from "src/app/modules/client/site-menu/site-menu-form.service";
import { LanguageService } from "src/app/modules/localization/language/language.service";
import { changeValueHighlight } from 'src/app/modules/ui/animations';
import { LanguageService as Lang } from "src/app/core/language.service";

@Component({
  animations: [changeValueHighlight],
  selector: "app-site-menu-page",
  templateUrl: "./site-menu-page.component.html",
  styleUrls: ["./site-menu-page.component.scss"],
})
export class SiteMenuPageComponent extends BasePage
  implements OnInit, PaginationPage {
  constructor(
    protected ngxService: NgxUiLoaderService,
    protected toastr: ToastrService,
    public breadcrumbs: BreadcrumbsService,
    public pages: PagesService,
    public siteMenu: SiteMenuService,
    public siteMenuForm: SiteMenuFormService,
    public langService: LanguageService,
    public lang: Lang,
  ) {
    super(pages);
  }

  ngOnInit(): void {
    super.initPagesSettings();
    super.initPanelButton();

    this.breadcrumbs.breadcrumbs = [
      { link: "", title: "Dashboard" },
      { link: "menu", title: "Menu" },
    ];

    this.getLangList();
    this.getList();
    this.initTranslate();
  }

  initTranslate() {
    this.lang.translate
      .get([
        "dashboard.dashboard",
        "MENU.manage_site.menu",
      ])
      .subscribe((tr: any) => {
        this.breadcrumbs.breadcrumbs = [
          { link: "", title: tr["dashboard.dashboard"] },
          { link: "menu", title: tr["MENU.manage_site.menu"] },
        ];
      });
  }

  getList() {
    this.ngxService.start();
    this.siteMenu.getList().subscribe(this.getListHandler);
  }

  getListHandler = (data) => {
    this.ngxService.stopAll();
    this.siteMenu.data = data;
  };

  getLangList() {
    this.ngxService.start();
    this.langService.getLangs().subscribe(this.getLangListHandler);
  }

  getLangListHandler = (data) => {
    this.ngxService.stopAll();
    this.langService.languages = data;

    this.siteMenuForm.initDescription(this.langService.languages.data);
  };

  //#region override

  save = () => {
    // THIS SHOULD NOT BE HERE ! ! !
    let c = this.siteMenuForm.model;

    let data = {
      link: c.link,
      type: c.type,
      sort_order: c.sort_order,
      status: c.status,
      description: [],
    };
    if (c.id != null) {
      c.descriptions.forEach((d) => {
        data.description.push({
          id: d.id,
          lang_id: d.lang_id,
          title: d.title,
        });
      });
      this.siteMenu.put(data, c.id).subscribe(this.putHandler);
    } else {
      c.descriptions.forEach((d) => {
        data.description.push({
          lang_id: d.lang_id,
          title: d.title,
        });
      });
      this.siteMenu.post(data).subscribe(this.postHandler);
    }
    this.ngxService.start();
  };

  postHandler = (data) => {
    this.ngxService.stopAll();

    this.siteMenu.data.data.push(data.data);
    this.siteMenu.data.count++;

    this.closeForm();
    this.toastr.success("siteMenu ADDED");
  };

  putHandler = (data) => {
    this.ngxService.stopAll();
    this.closeForm();
    this.toastr.success("siteMenu UPDATED ^_^");
  };

  plus = () => {
    this.siteMenuForm.initEmptyModel();
    this.siteMenuForm.initDescription(this.langService.languages.data);
    this.siteMenuForm.host = null;
    this.openForm();
  };

  //#endregion

  edit(i) {
    this.siteMenuForm.initByModel(i, this.langService.languages.data);
    this.siteMenuForm.host = this.siteMenu.data.host;
    this.openForm();
  }

  editItem: ISiteMenu = null;

  //
  updateStatus(item: ISiteMenu) {
    this.siteMenu
      .updateStatus(item.id, item.status == 0 ? 1 : 0)
      .subscribe(this.updateStatusHandler);
    this.editItem = item;
  }
  updateStatusHandler = (data) => {
    this.siteMenu.updateStatusInList(
      this.editItem.id,
      this.editItem.status == 0 ? 1 : 0
    );
  };

  pageEvent(event):void{
  
    this.siteMenu.data.count=event.length
    this.siteMenu.data.take=event.pageSize
    this.siteMenu.data.skip=event.pageSize*event.pageIndex
    this.getList();
  }

  //#region pagination

  pageToHandler(page: number): void {
    this.siteMenu.page = page;
  }
  pagePrevHandler(): void {
    this.siteMenu.page--;
  }
  pageNextHandler(): void {
    this.siteMenu.page++;
  }
  pageChangedHandler(): void {
    this.getList();
    window.scrollTo(0, 0);
  }
  Math = Math;

  //#endregion
}
