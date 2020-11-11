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
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ISiteDescriptions } from '../settings-page/interfaces/site-descriptions';
import { IDefaultCurrency, IDefaultCurrencyData } from '../settings-page/interfaces/default-currency';
import { IDefaultLanguage, IDefaultLanguageData } from '../settings-page/interfaces/default-language';
import { ISiteDescriptionsResponse, ISiteDescriptionsResponseData } from '../settings-page/interfaces/site-descriptions-response';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent extends BasePage implements OnInit {
  public defaultLanguage: IDefaultLanguage;
  public defaultCurrency: IDefaultCurrency;
  public selectedMainPlatform: any;
  public settingsPageFormData: any;
  //public sendSettingsPageEditableData: any;
  public siteId: number;
  public siteSettingsDescriptions: ISiteDescriptions;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public settingsPageData: ISiteDescriptionsResponseData;

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

  public ngOnInit(): void {
    super.initPagesSettings();
    super.initPanelButton();

    this.getList();
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

  public initTranslate(): void {
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

  public getList(): void {
    this.ngxService.start();
    this.settingsPageService.getSiteDataById()
    .pipe(takeUntil(this.destroy$))
    .subscribe((res: ISiteDescriptionsResponse) => {
      if (res) {
        this.settingsPageData = res?.data;

        this.settingsPageData.logo.src = res?.data?.logo?.src;
        this.settingsPageData.icon.src = res?.data?.icon?.src;

        this.settingsPageData.logo.id = res?.data?.logo?.id;
        this.settingsPageData.icon.id = res?.data?.icon?.id;
      }
    });
  }

  public getLangList(): void {
    this.ngxService.start();
    this.langService.getLangs()
    .pipe(takeUntil(this.destroy$))
    .subscribe(this.getLangListHandler);
  }

  getLangListHandler = (data) => {
    this.ngxService.stopAll();
    this.langService.languages = data;
  };

  public getDescByLang(): void {
    this.settingsPageService.getSiteByLang()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.siteSettingsDescriptions = res.data[0];
        console.log(this.siteSettingsDescriptions);
      //this.settingsPageService.settings.data.descriptions = res.data;
      })
  }

  public getDefaultLanguage(): void {
    this.settingsPageService.getSiteDefaultLanguage()
    .pipe(takeUntil(this.destroy$))
    .subscribe((res: IDefaultLanguageData) => {
      this.defaultLanguage = res.data;
    })
  }

  public getDefaultCurrency(): void {
    this.settingsPageService.getSiteDefaultCurrency()
    .pipe(takeUntil(this.destroy$))
    .subscribe((res: IDefaultCurrencyData) => {
      this.defaultCurrency = res.data;
    })
  }

  public edit(selectedPlatform: ISiteDescriptionsResponseData): void {
    console.log(selectedPlatform);
    this.selectedMainPlatform = selectedPlatform;

    this.openForm();
  }

  // public formDataChange(event): void {
  //   console.log(event);
  //   this.sendSettingsPageEditableData = event;
  // }


  // save = () => {
  //   this.siteId = 1;
  //   this.settingsPageService.editSettingsPageInfo(this.sendSettingsPageEditableData, this.siteId)
  //   .pipe(takeUntil(this.destroy$))
  //   .subscribe((res) => {
  //     this.putHandler(res);
  //     this.settingsPageService.getSiteDataById();
  //   });
    
  //   this.ngxService.start();
  // };

  // putHandler = (data) => {
  //   this.ngxService.stopAll();
  //   this.closeForm();
  //   this.toastr.success("SETTINGS UPDATED ^_^");
  // };
}
