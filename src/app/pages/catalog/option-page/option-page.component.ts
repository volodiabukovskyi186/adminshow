import { Component, OnInit } from '@angular/core';
import { BasePage } from '../../@core';
import { PaginationPage } from 'src/app/modules/ui/rap/pagination/pagination-page';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { BreadcrumbsService } from 'src/app/core/breadcrumbs.service';
import { PagesService } from '../../pages.service';
import { OptionService } from 'src/app/modules/catalog/option/services/option.service';
import { LanguageService } from 'src/app/modules/localization/language/language.service';
import { OptionFormService } from 'src/app/modules/catalog/option/services/option-form.service';
import { IOption } from 'src/app/modules/catalog/option/interfaces';
import { fadeScale } from 'src/app/modules/ui/animations';


@Component({
  animations: [fadeScale],
  selector: 'app-option-page',
  templateUrl: './option-page.component.html',
  styleUrls: ['./option-page.component.scss']
})
export class OptionPageComponent extends BasePage
implements OnInit, PaginationPage {
constructor(
  protected ngxService: NgxUiLoaderService,
  protected toastr: ToastrService,
  public breadcrumbs: BreadcrumbsService,
  public pages: PagesService,
  public option: OptionService,
  public optionForm: OptionFormService,
  public langService: LanguageService
) {
  super(pages);
}

ngOnInit(): void {
  super.initPagesSettings();
  super.initPanelButton();

  this.breadcrumbs.breadcrumbs = [
    { link: "", title: "Dashboard" },
    { link: "option", title: "Option" },
  ];

  this.getLangList();
  this.getList();
}

getList() {
  this.ngxService.start();
  this.option.getList().subscribe(this.getListHandler);
}

getListHandler = (data) => {
  this.ngxService.stopAll();
  this.option.data = data;
};

getLangList() {
  this.ngxService.start();
  this.langService.getLangs().subscribe(this.getLangListHandler);
}

getLangListHandler = (data) => {
  this.ngxService.stopAll();
  this.langService.languages = data;

  this.optionForm.initDescription(this.langService.languages.data);
};

//#region override

save = () => {
  console.log("ADD/UPDATE", this.optionForm.model);

  // THIS SHOULD NOT BE HERE ! ! !
  let c = this.optionForm.model;

  let data = {
    type: c.type,
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
    this.option.put(data, c.id).subscribe(this.putHandler);
  } else {
    c.description.forEach((d) => {
      data.description.push({
        lang_id: d.lang_id,
        name: d.name,
      });
    });
    this.option.post(data).subscribe(this.postHandler);
  }
  this.ngxService.start();
};

postHandler = (data) => {
  this.ngxService.stopAll();

  this.option.data.data.push(data.data);
  this.option.data.count++;

  this.closeForm();
  this.toastr.success("option ADDED");
};

putHandler = (data) => {
  this.ngxService.stopAll();
  this.closeForm();
  this.toastr.success("option UPDATED ^_^");
};

plus = () => {
  this.formTitle = "Add option";
  this.optionForm.initEmptyModel();
  this.optionForm.initDescription(this.langService.languages.data);
  this.openForm();
  
};

//#endregion

formTitle = "Add option";

edit(i: IOption) {
  this.formTitle = `Edit ${i.description[0].name}`
  this.optionForm.initByModel(i, this.langService.languages.data);
  this.openForm();
}

//#region pagination

pageToHandler(page: number): void {
  this.option.page = page;
}
pagePrevHandler(): void {
  this.option.page--;
}
pageNextHandler(): void {
  this.option.page++;
}
pageChangedHandler(): void {
  this.getList();
  window.scrollTo(0, 0);
}
Math = Math;

//#endregion
}
