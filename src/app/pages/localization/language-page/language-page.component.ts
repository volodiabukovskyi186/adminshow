import { Component, OnInit, ViewChild } from "@angular/core";
import {
  LanguageService as LocalizationLang,
  ILanguage,
  ILanguageResponse,
} from "src/app/modules/localization/language/language.service";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ToastrService } from "ngx-toastr";
import { BreadcrumbsService } from "src/app/core/breadcrumbs.service";
import { PagesService } from "../../pages.service";
import { LanguageService } from "src/app/core/language.service";
import { LanguageFormService } from "src/app/modules/localization/language/language-form.service";
import { LanguageFormComponent } from "src/app/modules/localization/language/language-form/language-form.component";
import { BasePage } from "../../@core";

@Component({
  selector: "app-language-page",
  templateUrl: "./language-page.component.html",
  styleUrls: ["./language-page.component.scss"],
})
export class LanguagePageComponent extends BasePage implements OnInit {
  @ViewChild(LanguageFormComponent) langFormComponent: LanguageFormComponent;
  selected={
    flag:''
  }
  deleteId = 0;
  editId: number = null;

  constructor(
    protected ngxService: NgxUiLoaderService,
    protected toastr: ToastrService,
    public breadcrumbs: BreadcrumbsService,
    public langForm: LanguageFormService,
    public pages: PagesService,
    public langServise: LocalizationLang,
    public language: LanguageService
  ) {
    super(pages);
  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    super.initPagesSettings();
    super.initPanelButton();

    this.breadcrumbs.breadcrumbs = [
      { link: "", title: "Dashboard" },
      { link: "language", title: "Languages" },
    ];
    this.getLangs();
    this.langForm.questions$ = this.langForm.getQuestions();
    this.initTranslate();
  }

  initTranslate() {
    this.language.translate
      .get([
        "dashboard.dashboard",
        "MENU.localization.languages",
      ])
      .subscribe((tr: any) => {
        this.breadcrumbs.breadcrumbs = [
          { link: "", title: tr["dashboard.dashboard"] },
          { link: "language", title: tr["MENU.localization.languages"] },
        ];
      });
  }

  //#region getLangs
  
  getLangs() {
    this.ngxService.start();
    this.langServise.getLangs().subscribe(this.getLangsHandler);
  }

  getLangsHandler = (data: ILanguageResponse) => {
    this.langServise.languages = data;
    this.ngxService.stopAll();
  };

  //#endregion

  //#region override

  save = () => {
    this.langFormComponent.submitForm();
    this.getLangs()
   
  };

  plus = () => {
    this.selected.flag=''
    this.editId = null;
    this.langForm.questions$ = this.langForm.getQuestions();
    
    this.openForm();
  };
  cancel=()=>{
    this.selected.flag=''
    this.getLangs()
    this.closeForm();
  }

  //#endregion

  //#region delete

  delete(langItem) {
    this.ngxService.start();
    this.deleteId = langItem.id;
    this.langServise.delete(langItem.id).subscribe(this.deleteHandler);
   
  }

  deleteHandler = (data: any) => {
    this.langServise.deleteFromList(this.deleteId);
    this.toastr.success("LANG DELETED");
    this.getLangs()
    this.ngxService.stopAll();
  };

  //#endregion

  editItem: ILanguage = null;

  //
  updateStatus(item: ILanguage) {
    this.langServise
      .updateStatus(item.id, item.available == 0 ? 1 : 0)
      .subscribe(this.updateStatusHandler);
    this.editItem = item;
  }
  updateStatusHandler = (data) => {
    this.langServise.updateStatusInList(
      this.editItem.id,
      this.editItem.available == 0 ? 1 : 0
    );
  };

  edit(langItem: ILanguage) {
    this.langForm.questions$ = this.langForm.getQuestions(langItem);
    this.editId = langItem.id;
    this.selected=langItem
    console.log('hello===>',langItem)
    this.openForm();
  }

  onSubmit(e: ILanguage) {
   
    e.flag=this.selected.flag
    console.log('ReactiveForm===>',e)
    this.ngxService.start();
    if (this.editId == null) {
      this.langServise.postRole(e).subscribe(this.submitHandler);
    } else {
      this.langServise
        .putRole(e, this.editId)
        .subscribe(this.submitEditHandler);
    }
  }

  submitEditHandler = (data) => {
    this.langServise.updateInList(data.data);
    this.toastr.success("Lang UPDAteD");
    this.ngxService.stopAll();

    this.closeForm();
  };

  submitHandler = (data) => {
    this.ngxService.stop();
    this.langServise.languages.data.push(data.data);
    this.closeForm();
  };
}
