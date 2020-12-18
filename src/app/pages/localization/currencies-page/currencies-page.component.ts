import { Component, OnInit } from '@angular/core';
import { BasePage } from "../../../pages/@core";
import { CurrenciesService } from './services/currencies-page.service';
import { LanguageService } from "src/app/modules/localization/language/language.service";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ToastrService } from "ngx-toastr";
import { PagesService } from '../../pages.service';
import { LanguageService as Lang } from "src/app/core/language.service";
import { BreadcrumbsService } from "src/app/core/breadcrumbs.service";
import { ICurrency } from './interfaces/currency';
import { UserService } from '../../../modules/user/user.service';
import { changeValueHighlight } from "src/app/modules/ui/animations";

@Component({
  animations: [changeValueHighlight],
  selector: 'app-currencies',
  templateUrl: './currencies-page.component.html',
  styleUrls: ['./currencies-page.component.scss']
})
export class CurrenciesPageComponent extends BasePage implements OnInit {
  public currencyFormData: any;
  public sendCurrencyEditableData: any;
  public currentUserId: number;
  public selectedCurrency: any;
  public editedCurrency: ICurrency;

  constructor(
    protected ngxService: NgxUiLoaderService,
    protected toastr: ToastrService,
    public currenciesService: CurrenciesService,
    public langService: LanguageService,
    public pages: PagesService,
    public lang: Lang,
    public breadcrumbs: BreadcrumbsService,
    public userService: UserService
  ) { 
    super(pages);
  }

  public ngOnInit(): void {
    super.initPagesSettings();
    super.initPanelButton();
    
    this.getList();
    this.initTranslate();
    this.getLangList();

    this.userService.getByToken().subscribe((res) => {
      this.currentUserId = res.data.user.id;
    });
  }

  public initTranslate(): void {
    this.lang.translate
      .get([
        "dashboard.dashboard",
        "MENU.localization.currencies",
      ])
      .subscribe((tr: any) => {
        this.breadcrumbs.breadcrumbs = [
          { link: "", title: tr["dashboard.dashboard"] },
          { link: "currencies", title: tr["MENU.localization.currencies"] },
        ];
      });
  }

  public getList(): void {
    this.ngxService.start();
    this.currenciesService.getCurrencies().subscribe(this.getListHandler);
  }

  getListHandler = (data) => {
    this.ngxService.stopAll();
    this.currenciesService.currency = data;
  };

  public getLangList(): void {
    this.ngxService.start();
    this.langService.getLangs().subscribe(this.getLangListHandler);
  }

  getLangListHandler = (data) => {
    this.ngxService.stopAll();
    this.langService.languages = data;
  };

  public edit(i: any): void {
    this.selectedCurrency = i;
    this.openForm();
  }

  public modifyPrice(price): string {
    return Number(price).toFixed(2);
  }

  public currenciesFormData(event): void {
    this.currencyFormData = event;

    this.sendCurrencyEditableData = {
      currency_title: this.currencyFormData.currencyName,
      code: this.currencyFormData.currencyISOcode,
      value: this.currencyFormData.currencyValue,
      status: this.currencyFormData.currencyStatus,
      default: 0,
      simbol_left: this.currencyFormData.currencySymbolOnTheLeft,
      simbol_right: this.currencyFormData.currencySymbolOnTheRight,
      decimal_places: 1
    }
  }

  save = () => {
    if (!this.selectedCurrency) {
      this.currenciesService.createCurrency(this.sendCurrencyEditableData).subscribe((res) => {
        this.postHandler(res);
        this.currenciesService.getCurrencies();
      });
    }

    if (this.selectedCurrency?.id) {
      this.currenciesService.editCurrencyInfo(this.sendCurrencyEditableData, this.selectedCurrency.id).subscribe((res) => {
        this.putHandler(res);
        this.currenciesService.getCurrencies();
      });
    }
    
    this.ngxService.start();
  };

  plus = () => {
    this.selectedCurrency = '';
    this.openForm();
  };

  postHandler = (data: { data: ICurrency }) => {
    this.ngxService.stopAll();

    this.currenciesService.currency.data.push(data.data);
    this.currenciesService.currency.count++;

    this.closeForm();
    this.toastr.success("CURRENCY ADDED");
  };

  putHandler = (data) => {
    this.ngxService.stopAll();
    this.closeForm();
    this.toastr.success("CURRENCY UPDATED");
  };

  updateStatus(item: ICurrency) {
    this.currenciesService
      .updateCurrencyStatus(item.id, item.status == 0 ? 1 : 0)
      .subscribe(this.updateStatusHandler);
    this.editedCurrency = item;
  }

  updateStatusHandler = (data) => {
    this.currenciesService.updateStatusCurrencyInList(
      this.editedCurrency.id,
      this.editedCurrency.status == 0 ? 1 : 0
    );
  };

  deleteSelectedCurrency(currency): void {
    this.currenciesService.deleteCurrency(currency.id).subscribe((res) => {
      console.log(res);
    })

    this.currenciesService.currency.data = this.currenciesService.currency?.data.filter((val) => {
      return val.id !== currency.id;
    })
  }

  pageToHandler(page: number): void {
    this.currenciesService.page = page;
  }
  pagePrevHandler(): void {
    this.currenciesService.page--;
  }
  pageNextHandler(): void {
    this.currenciesService.page++;
  }
  pageChangedHandler(): void {
    this.getList();
    window.scrollTo(0, 0);
  }
  Math = Math;
}
