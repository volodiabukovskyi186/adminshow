import { Component, OnInit } from "@angular/core";
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

@Component({
  selector: "app-attribyte-group-page",
  templateUrl: "./attribyte-group-page.component.html",
  styleUrls: ["./attribyte-group-page.component.scss"],
})
export class AttribyteGroupPageComponent extends BasePage
  implements OnInit, PaginationPage {
  constructor(
    protected ngxService: NgxUiLoaderService,
    protected toastr: ToastrService,
    public breadcrumbs: BreadcrumbsService,
    public pages: PagesService,
    public attrGr: AttribyteGroupService,
    public attrGrForm: AttribyteGroupFormService,
    public langService: LanguageService
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
    // console.log("ADD/UPDATE", this.categoryForm.category);

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

  edit(i) {
    this.attrGrForm.initByModel(i, this.langService.languages.data);
    this.openForm();
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
