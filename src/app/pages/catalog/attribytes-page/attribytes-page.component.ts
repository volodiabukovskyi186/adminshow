import { Component, OnInit } from '@angular/core';
import { BasePage } from '../../@core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { BreadcrumbsService } from 'src/app/core/breadcrumbs.service';
import { PagesService } from '../../pages.service';
import { AttribyteFormService } from 'src/app/modules/catalog/attribyte/services/attribyte-form.service';
import { AttribyteService } from 'src/app/modules/catalog/attribyte/services/attribyte.service';
import { PaginationPage } from 'src/app/modules/ui/rap/pagination/pagination-page';
import { LanguageService } from 'src/app/modules/localization/language/language.service';
import { IAttribyte, IResponseData } from 'src/app/modules/catalog/attribyte/interfaces';
import { AttribyteGroupService } from 'src/app/modules/catalog/attribyte/services/attribyte-group.service';
import { LanguageService as Lang } from "src/app/core/language.service";
import { RoleService } from 'src/app/core/auth/models/role.service';

@Component({
  selector: 'app-attribytes-page',
  templateUrl: './attribytes-page.component.html',
  styleUrls: ['./attribytes-page.component.scss']
})
export class AttribytesPageComponent extends BasePage
implements OnInit, PaginationPage {
constructor(
  protected ngxService: NgxUiLoaderService,
  protected toastr: ToastrService,
  public breadcrumbs: BreadcrumbsService,
  public pages: PagesService,
  public attr: AttribyteService,
  public attrGr: AttribyteGroupService,
  public attrForm: AttribyteFormService,
  public langService: LanguageService,
  public lang: Lang,
  public roleService:RoleService
) {
  super(pages);
}
userRoleId:number;
userRoleStatus:boolean=false;

public ngOnInit(): void {
  super.initPagesSettings();
  super.initPanelButton();

  this.breadcrumbs.breadcrumbs = [
    { link: "", title: "Dashboard" },
    { link: "attibytes", title: "Arrtibytes" },
  ];

  this.getLangList();
  this.getList();
  this.getAllGroup();
  this.initTranslate();
  this.getUserByTokin()
}

public initTranslate(): void {
  this.lang.translate
    .get([
      "dashboard.dashboard",
      "MENU.catalog.attr",
    ])
    .subscribe((tr: any) => {
      this.breadcrumbs.breadcrumbs = [
        { link: "", title: tr["dashboard.dashboard"] },
        { link: "attibytes", title: tr["MENU.catalog.attr"] },
      ];
    });
}

public getUserByTokin(): void {
  this.roleService.getByToken().subscribe(data => {
    this.userRoleId = data.data.user.role_id;
    if (this.userRoleId === 1) {
      this.userRoleStatus = true;
    }
  })
}

getList() {
  this.ngxService.start();
  this.attr.getList().subscribe(this.getListHandler);
}

getListHandler = (data) => {
  this.ngxService.stopAll();
  this.attr.data = data;
};

getAllGroup() {
  this.ngxService.start();
  this.attrGr.getAll().subscribe(this.getAllGroupHandler);
}

getAllGroupHandler = data => {
  this.ngxService.stopAll();
  this.attrGr.all = data.data;
}

getLangList() {
  this.ngxService.start();
  this.langService.getLangs().subscribe(this.getLangListHandler);
}

getLangListHandler = (data) => {
  this.ngxService.stopAll();
  this.langService.languages = data;

  this.attrForm.initDescription(this.langService.languages.data);
};

//#region override

save = () => {
  // THIS SHOULD NOT BE HERE ! ! !
  let c = this.attrForm.model;

  let data = {
    sort_order: c.sort_order,
    group_id: c.group_id,
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
    this.attr.put(data, c.id).subscribe(this.putHandler);
  } else {
    c.description.forEach((d) => {
      data.description.push({
        lang_id: d.lang_id,
        name: d.name,
      });
    });
    this.attr.post(data).subscribe(this.postHandler);
  }
  this.ngxService.start();
};

postHandler = (data: IResponseData<IAttribyte>) => {
  this.ngxService.stopAll();

  this.attr.data.data.push(data.data);
  this.attr.data.count++;

  this.closeForm();
  this.toastr.success("Attr ADDED");
};

putHandler = (data) => {
  this.ngxService.stopAll();
  this.closeForm();
  this.toastr.success("Attr UPDATED ^_^");
};

plus = () => {
  this.attrForm.initEmptyModel();
  this.attrForm.initDescription(this.langService.languages.data);
  this.openForm();
};

//#endregion

edit(i): void {
  this.attrForm.initByModel(i, this.langService.languages.data);
  this.openForm();
}

pageEvent(event): void {
  this.attr.data.count = event.length;
  this.attr.data.take = event.pageSize;
  this.attr.data.skip = event.pageSize * event.pageIndex;
  this.getList();
}

//#region pagination

pageToHandler(page: number): void {
  this.attr.page = page;
}
pagePrevHandler(): void {
  this.attr.page--;
}
pageNextHandler(): void {
  this.attr.page++;
}
pageChangedHandler(): void {
  this.getList();
  window.scrollTo(0, 0);
}
Math = Math;

//#endregion
}