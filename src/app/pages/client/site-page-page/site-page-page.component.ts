import { Component, OnInit } from '@angular/core';
import { BasePage } from '../../@core';
import { PaginationPage } from 'src/app/modules/ui/rap/pagination/pagination-page';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { BreadcrumbsService } from 'src/app/core/breadcrumbs.service';
import { PagesService } from '../../pages.service';
import { SitePageService, ISitePage } from 'src/app/modules/client/site-page/site-page.service';
import { SitePageFormService } from 'src/app/modules/client/site-page/site-page-form.service';
import { LanguageService } from 'src/app/modules/localization/language/language.service';
import { changeValueHighlight } from 'src/app/modules/ui/animations';
import { LanguageService as Lang } from "src/app/core/language.service";

@Component({
  animations: [changeValueHighlight],
  selector: 'app-site-page-page',
  templateUrl: './site-page-page.component.html',
  styleUrls: ['./site-page-page.component.scss']
})
export class SitePagePageComponent extends BasePage
implements OnInit, PaginationPage {
constructor(
  protected ngxService: NgxUiLoaderService,
  protected toastr: ToastrService,
  public breadcrumbs: BreadcrumbsService,
  public pages: PagesService,
  public sitePage: SitePageService,
  public sitePageForm: SitePageFormService,
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
    { link: "pages", title: "Pages" },
  ];

  this.getLangList();
  this.getList();
  this.initTranslate();
}

initTranslate() {
  this.lang.translate
    .get([
      "dashboard.dashboard",
      "MENU.manage_site.pages",
    ])
    .subscribe((tr: any) => {
      this.breadcrumbs.breadcrumbs = [
        { link: "", title: tr["dashboard.dashboard"] },
        { link: "pages", title: tr["MENU.manage_site.pages"] },
      ];
    });
}

getList() {
  this.ngxService.start();
  this.sitePage.getList().subscribe(this.getListHandler);
}

getListHandler = (data) => {
  this.ngxService.stopAll();
  this.sitePage.data = data;
};

getLangList() {
  this.ngxService.start();
  this.langService.getLangs().subscribe(this.getLangListHandler);
}

getLangListHandler = (data) => {
  this.ngxService.stopAll();
  this.langService.languages = data;

  this.sitePageForm.initDescription(this.langService.languages.data);
};

//#region override

save = () => {
  // THIS SHOULD NOT BE HERE ! ! !
  let c = this.sitePageForm.model;

  let data = {
    alias: c.alias,
    status: c.status,
    description: [],
  };
  if (c.id != null) {
    c.descriptions.forEach((d) => {
      data.description.push({
        id: d.id,
        lang_id: d.lang_id,
        title: d.title,
        description: d.description,
        text: d.text,
        meta_description: d.meta_description,
        meta_keywords: d.meta_keywords,
      });
    });
    this.sitePage.put(data, c.id).subscribe(this.putHandler);
  } else {
    c.descriptions.forEach((d) => {
      data.description.push({
        lang_id: d.lang_id,
        title: d.title,
        description: d.description,
        text: d.text,
        meta_description: d.meta_description,
        meta_keywords: d.meta_keywords,
      });
    });
    this.sitePage.post(data).subscribe(this.postHandler);
  }
  this.ngxService.start();
};

postHandler = (data) => {
  this.ngxService.stopAll();

  this.sitePage.data.data.push(data.data);
  this.sitePage.data.count++;

  this.closeForm();
  this.toastr.success("sitePage ADDED");
};

putHandler = (data) => {
  this.ngxService.stopAll();
  this.closeForm();
  this.toastr.success("sitePage UPDATED ^_^");
};

plus = () => {
  this.sitePageForm.initEmptyModel();
  this.sitePageForm.initDescription(this.langService.languages.data);
  this.sitePageForm.host = null;
  this.openForm();
};

//#endregion

edit(i) {
  this.sitePageForm.initByModel(i, this.langService.languages.data);
  this.sitePageForm.host = this.sitePage.data.host;
  this.openForm();
}

editItem: ISitePage = null;

//
updateStatus(item: ISitePage) {
  this.sitePage
    .updateStatus(item.id, item.status == 0 ? 1 : 0)
    .subscribe(this.updateStatusHandler);
  this.editItem = item;
}
updateStatusHandler = (data) => {
  this.sitePage.updateStatusInList(
    this.editItem.id,
    this.editItem.status == 0 ? 1 : 0
  );
};

deletePage(page) {
  this.sitePage.deleteSitePage(page.id).subscribe((res) =>{
    console.log(res);
  })

  this.sitePage.data.data = this.sitePage.data.data.filter((val) => {
    return val.id !== page.id;
  })
}




pageEvent(event):void{
  this.sitePage.data.count=event.length
  this.sitePage.data.take=event.pageSize
  this.sitePage.data.skip=event.pageSize*event.pageIndex
  this.getList();
}
//#region pagination

pageToHandler(page: number): void {
  this.sitePage.page = page;
}
pagePrevHandler(): void {
  this.sitePage.page--;
}
pageNextHandler(): void {
  this.sitePage.page++;
}
pageChangedHandler(): void {
  this.getList();
  window.scrollTo(0, 0);
}
Math = Math;

//#endregion
}
