import { Component, OnInit } from '@angular/core';
import { PagesService } from '../../pages.service';
import { SettingsPageService } from '../settings-page/services/settings-page.service';
import { BasePage } from "../../@core";
import { LanguageService as Lang } from "src/app/core/language.service";
import { BreadcrumbsService } from 'src/app/core/breadcrumbs.service';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { LanguageService } from 'src/app/modules/localization/language/language.service';
import { ToastrService } from "ngx-toastr";
import { LanguageService as LangS} from 'src/app/core/language.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent extends BasePage implements OnInit {
  public siteDescriptions: any[] = [];
  public defaultLanguage: any;
  public defaultCurrency: any;
  public selectedMainPlatform: any;
  public settingsPageFormData: any;
  public sendSettingsPageEditableData: any;
  public siteId: number;
  public generateShopDetailsFormData;
  public shopDetailsFormDataEvent;
  public settingsContactBottomData;
  public siteSettingsDescriptions: any[] = [];

  constructor(
    protected ngxService: NgxUiLoaderService,
    protected toastr: ToastrService,
    public pages: PagesService,
    public settingsPageService: SettingsPageService,
    public lang: Lang,
    public breadcrumbs: BreadcrumbsService,
    public langService: LanguageService,
    public langS: LangS
  ) {
    super(pages);
   }

  ngOnInit(): void {
    super.initPagesSettings();
    super.initPanelButton();

    this.getList();
    this.getLangList();
    this.initTranslate();

    this.getDefaultLanguage();
    this.getDefaultCurrency();

    this.getDescByLang();
  }

  public initTranslate() {
    this.lang.translate
      .get([
        "dashboard.dashboard",
        "MENU.settings.siteSettings",
      ])
      .subscribe((tr: any) => {
        this.breadcrumbs.breadcrumbs = [
          { link: "", title: tr["dashboard.dashboard"] },
          { link: "settings", title: tr["MENU.settings.siteSettings"] },
        ];
      });
  }

  getList() {
    this.ngxService.start();
    this.settingsPageService.getSiteDataById().subscribe(this.getListHandler);
  }

  getListHandler = (data) => {
    this.ngxService.stopAll();
    this.settingsPageService.settings = data;
  };

  getLangList() {
    this.ngxService.start();
    this.langService.getLangs().subscribe(this.getLangListHandler);
  }

  getLangListHandler = (data) => {
    this.ngxService.stopAll();
    this.langService.languages = data;

    //this.siteMenuForm.initDescription(this.langService.languages.data);
  };

  getDescByLang() {
    this.settingsPageService.getSiteByLang().subscribe((res) => {
      this.siteSettingsDescriptions = res.data;
      //this.settingsPageService.settings.data.descriptions = res.data;
    })
  }

  objectKeys(obj) {
    return Object.assign(obj);
  }

  getDefaultLanguage() {
    this.settingsPageService.getSiteDefaultLanguage().subscribe((res) => {
      this.defaultLanguage = res.data;
    })
  }

  getDefaultCurrency() {
    this.settingsPageService.getSiteDefaultCurrency().subscribe((res) => {
      this.defaultCurrency = res.data;
    })
  }

  edit(selectedPlatform: any) {
    console.log(selectedPlatform);

    this.selectedMainPlatform = selectedPlatform;

    //this.manufacturerForm.initBy(i, this.langService.languages.data);
    this.openForm();
  }

  formDataChange(event) {
    console.log(event);

    this.sendSettingsPageEditableData = event;
  }


  save = () => {
    this.siteId = 1;

    // this.settingsPageService.editSettingsPageInfo(this.sendSettingsPageEditableData, this.siteId).subscribe((res) => {
    //   this.putHandler(res);
    //   this.settingsPageService.getSiteDataById();
    // });
    
    //this.ngxService.start();
  };

  putHandler = (data) => {
    this.ngxService.stopAll();
    this.closeForm();
    this.toastr.success("CURRENCY UPDATED ^_^");
  };


  // public getPageDescription() {
  //   this.settingsPageService.getSiteDescriptionList().subscribe((res) => {
  //     console.log(res);
  //     this.siteDescriptions = res.data;
  //   })
  // }
}