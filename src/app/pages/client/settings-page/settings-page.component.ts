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
  public siteSettingsDescriptions;

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
    this.getList();

    super.initPagesSettings();
    super.initPanelButton();

    this.getLangList();
    this.initTranslate();

    this.getDefaultLanguage();
    this.getDefaultCurrency();

    this.getDescByLang();
  }

  openForm = () => {
    this.pages.panelSettings.form = true;
    this.pages.panelButtonSettings.plus = false;
    this.pages.panelButtonSettings.cancel = true;
    this.pages.panelButtonSettings.rightToggle = false;
    this.pages.panelButtonSettings.review = false;
    this.pages.panelButtonSettings.save = false;
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

  public allSettingsData: any;

  getList() {
    this.ngxService.start();
    this.settingsPageService.getSiteDataById().subscribe((res) => {
      console.log('tartatat', res);
      this.allSettingsData = res;

      this.settingsPageService.settings.data = this.allSettingsData;
      //this.getListHandler(res);
    });
  }

  // getListHandler(data) {
  //   this.ngxService.stopAll();
  //   console.log(data);
  //   this.settingsPageService.settings.data = data;
  // };

  getLangList() {
    this.ngxService.start();
    this.langService.getLangs().subscribe(this.getLangListHandler);
  }

  getLangListHandler = (data) => {
    this.ngxService.stopAll();
    this.langService.languages = data;
  };

  getDescByLang() {
    this.settingsPageService.getSiteByLang().subscribe((res) => {
      this.siteSettingsDescriptions = res.data[0];
      console.log(this.siteSettingsDescriptions);
      //this.settingsPageService.settings.data.descriptions = res.data;
    })
  }

  // objectKeys(obj) {
  //   return Object.assign(obj);
  // }

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

    this.settingsPageService.editSettingsPageInfo(this.sendSettingsPageEditableData, this.siteId).subscribe((res) => {
      this.putHandler(res);
      this.settingsPageService.getSiteDataById();
    });
    
    this.ngxService.start();
  };

  putHandler = (data) => {
    this.ngxService.stopAll();
    this.closeForm();
    this.toastr.success("SETTINGS UPDATED ^_^");
  };


  // public getPageDescription() {
  //   this.settingsPageService.getSiteDescriptionList().subscribe((res) => {
  //     console.log(res);
  //     this.siteDescriptions = res.data;
  //   })
  // }
}
