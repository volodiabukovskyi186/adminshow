import { Component, OnInit ,OnChanges} from "@angular/core";
import { BasePage } from "../../@core";
import { PaginationPage } from "src/app/modules/ui/rap/pagination/pagination-page";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ToastrService } from "ngx-toastr";
import { BreadcrumbsService } from "src/app/core/breadcrumbs.service";
import { PagesService } from "../../pages.service";
import { AttribyteGroupService } from "src/app/modules/catalog/attribyte/services/attribyte-group.service";
import { AttribyteGroupFormService } from "src/app/modules/catalog/attribyte/services/attribyte-group-form.service";
import { LanguageService } from "src/app/modules/localization/language/language.service";
import {
  IAttribyteGroup,
  IResponseData,
} from "src/app/modules/catalog/attribyte/interfaces";
import { LanguageService as Lang } from "src/app/core/language.service";
// import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-attribyte-group-page",
  templateUrl: "./attribyte-group-page.component.html",
  styleUrls: ["./attribyte-group-page.component.scss"],
})
export class AttribyteGroupPageComponent extends BasePage
  implements OnInit,OnChanges, PaginationPage {
  private _routerSubscription: any;

  constructor(
    protected ngxService: NgxUiLoaderService,
    protected toastr: ToastrService,
    public breadcrumbs: BreadcrumbsService,
    public pages: PagesService,
    public attrGr: AttribyteGroupService,
    public attrGrForm: AttribyteGroupFormService,
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
      { link: "attrgroups", title: "Arrtibyte Group" },
    ];

    this.getLangList();
    this.getList();
    this.initTranslate();
  }
 

  initTranslate() {
    this.lang.translate
      .get([
        "dashboard.dashboard",
        "MENU.catalog.attr_groups",
      ])
      .subscribe((tr: any) => {
        this.breadcrumbs.breadcrumbs = [
          { link: "", title: tr["dashboard.dashboard"] },
          { link: "attrgroups", title: tr["MENU.catalog.attr_groups"] },
        ];
      });
  }

  getList() {
    this.ngxService.start();
    this.attrGr.getList().subscribe(this.getListHandler);
  }

  getListHandler = (data) => {
    this.ngxService.stopAll();
    this.attrGr.data = data;
  };

  getLangList() {
    this.ngxService.start();
    this.langService.getLangs().subscribe(this.getLangListHandler);
  }

  getLangListHandler = (data) => {
    this.ngxService.stopAll();
    this.langService.languages = data;

    this.attrGrForm.initDescription(this.langService.languages.data);
  };

  //#region override

  save = () => {
    // THIS SHOULD NOT BE HERE ! ! !
    let c = this.attrGrForm.model;

    let data = {
      sort_order: c.sort_order,
      status: c.status,
      description: [],
    };
    if (c.id != null) {
      c.description.forEach((d) => {
        data.description.push({
          id: d.id,
          lang_id: d.lang_id,
          name: d.name,
        });
      });
      this.attrGr.put(data, c.id).subscribe(this.putHandler);
    } else {
      c.description.forEach((d) => {
        data.description.push({
          lang_id: d.lang_id,
          name: d.name,
        });
      });
      this.attrGr.post(data).subscribe(this.postHandler);
    }
    this.ngxService.start();
  };

  postHandler = (data: IResponseData<IAttribyteGroup>) => {
    this.ngxService.stopAll();

    this.attrGr.data.data.push(data.data);
    this.attrGr.data.count++;

    this.closeForm();
    this.toastr.success("CATEGORY ADDED");
  };

  putHandler = (data) => {
    this.ngxService.stopAll();
    this.closeForm();
    this.toastr.success("CATEGORY UPDATED ^_^");
  };

  plus = () => {
    this.attrGrForm.initEmptyModel();
    this.attrGrForm.initDescription(this.langService.languages.data);
    this.openForm();
  };

  //#endregion

  edit(i): void {
    this.attrGrForm.initByModel(i, this.langService.languages.data);
    this.openForm();
  }

  pageEvent(event): void {
    this.attrGr.data.count = event.length;
    this.attrGr.data.take = event.pageSize;
    this.attrGr.data.skip = event.pageSize * event.pageIndex;
    this.getList();
  }

  //#region pagination

  pageToHandler(page: number): void {
    this.attrGr.page = page;
  }
  pagePrevHandler(): void {
    this.attrGr.page--;
  }
  pageNextHandler(): void {
    this.attrGr.page++;
  }
  pageChangedHandler(): void {
    this.getList();
    window.scrollTo(0, 0);
  }
  Math = Math;

  //#endregion
}
