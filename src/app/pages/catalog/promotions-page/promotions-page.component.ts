import { Component, OnInit } from '@angular/core';
import { BasePage } from '../../@core';
import { PaginationPage } from 'src/app/modules/ui/rap/pagination/pagination-page';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { BreadcrumbsService } from 'src/app/core/breadcrumbs.service';
import { PagesService } from '../../pages.service';
import { PromotionService, IPromotion } from 'src/app/modules/catalog/promotion/services/promotion.service';
import { LanguageService } from 'src/app/modules/localization/language/language.service';
import { PromotionFormService } from 'src/app/modules/catalog/promotion/services/promotion-form.service';

@Component({
  selector: 'app-promotions-page',
  templateUrl: './promotions-page.component.html',
  styleUrls: ['./promotions-page.component.scss']
})
export class PromotionsPageComponent extends BasePage
implements OnInit, PaginationPage {
constructor(
  protected ngxService: NgxUiLoaderService,
  protected toastr: ToastrService,
  public breadcrumbs: BreadcrumbsService,
  public pages: PagesService,
  public prom: PromotionService,
  public promForm: PromotionFormService,
  public langService: LanguageService
) {
  super(pages);
}

ngOnInit(): void {
  super.initPagesSettings();
  super.initPanelButton();

  this.breadcrumbs.breadcrumbs = [
    { link: "", title: "Dashboard" },
    { link: "promotions", title: "Promotions" },
  ];

  this.getLangList();
  this.getList();
}

getList() {
  this.ngxService.start();
  this.prom.getList().subscribe(this.getListHandler);
}

getListHandler = (data) => {
  this.ngxService.stopAll();
  this.prom.data = data;
};

getLangList() {
  this.ngxService.start();
  this.langService.getLangs().subscribe(this.getLangListHandler);
}

getLangListHandler = (data) => {
  this.ngxService.stopAll();
  this.langService.languages = data;

  this.promForm.initDescription(this.langService.languages.data);
};

//#region override

save = () => {
  // console.log("ADD/UPDATE", this.categoryForm.category);

  // THIS SHOULD NOT BE HERE ! ! !
  let c = this.promForm.model;

  let data = {
    status: c.status,
    description: [],
  };
  if (c.id != null) {
    c.descriptions.forEach((d) => {
      data.description.push({
        id: d.id,
        lang_id: d.lang_id,
        description: d.description,
        image_id: d.image_id,
        subtitle: d.subtitle,
        title: d.title,
        data_start: d.data_start,
        data_end: d.data_end,
      });
    });
    this.prom.put(data, c.id).subscribe(this.putHandler);
  } else {
    c.descriptions.forEach((d) => {
      data.description.push({
        lang_id: d.lang_id,
        description: d.description,
        image_id: d.image_id,
        subtitle: d.subtitle,
        title: d.title,
        data_start: d.data_start,
        data_end: d.data_end,
      });
    });
    this.prom.post(data).subscribe(this.postHandler);
  }
  this.ngxService.start();
};

postHandler = (data) => {
  this.ngxService.stopAll();

  this.prom.data.data.push(data.data);
  this.prom.data.count++;

  this.closeForm();
  this.toastr.success("PROMOTION ADDED");
};

putHandler = (data) => {
  this.ngxService.stopAll();
  this.closeForm();
  this.toastr.success("PROMOTION UPDATED ^_^");
};

plus = () => {
  this.promForm.initEmptyModel();
  this.promForm.initDescription(this.langService.languages.data);
  this.openForm();
};

//#endregion

edit(i) {
  this.promForm.initByModel(i, this.langService.languages.data);
  this.openForm();
}

editItem: IPromotion = null;

  //
  updateStatus(item: IPromotion) {
    this.prom
      .updateStatus(item.id, item.status == 0 ? 1 : 0)
      .subscribe(this.updateStatusHandler);
    this.editItem = item;
  }
  updateStatusHandler = (data) => {
    this.prom.updateStatusInList(
      this.editItem.id,
      this.editItem.status == 0 ? 1 : 0
    );
  };

//#region pagination

pageToHandler(page: number): void {
  this.prom.page = page;
}
pagePrevHandler(): void {
  this.prom.page--;
}
pageNextHandler(): void {
  this.prom.page++;
}
pageChangedHandler(): void {
  this.getList();
  window.scrollTo(0, 0);
}
Math = Math;

//#endregion
}
