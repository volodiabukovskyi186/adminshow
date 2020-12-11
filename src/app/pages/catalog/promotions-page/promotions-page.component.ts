import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BasePage } from '../../@core';
import { PaginationPage } from 'src/app/modules/ui/rap/pagination/pagination-page';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { BreadcrumbsService } from 'src/app/core/breadcrumbs.service';
import { PagesService } from '../../pages.service';
import { PromotionService, IPromotion } from 'src/app/modules/catalog/promotion/services/promotion.service';
import { LanguageService } from 'src/app/modules/localization/language/language.service';
import { PromotionFormService } from 'src/app/modules/catalog/promotion/services/promotion-form.service';
import { LanguageService as Lang } from "src/app/core/language.service";
import { Router, NavigationEnd, Event } from '@angular/router';
@Component({
  selector: 'app-promotions-page',
  templateUrl: './promotions-page.component.html',
  styleUrls: ['./promotions-page.component.scss']
})
export class PromotionsPageComponent extends BasePage
implements OnInit, PaginationPage {

public productsList;
public products: any[];
public selectedProductsPromotion: any[];
public editItem: IPromotion = null;

// @Output() products: EventEmitter<any> = new EventEmitter();

constructor(
  protected ngxService: NgxUiLoaderService,
  protected toastr: ToastrService,
  public breadcrumbs: BreadcrumbsService,
  public pages: PagesService,
  public prom: PromotionService,
  public promForm: PromotionFormService,
  public langService: LanguageService,
  public lang: Lang,
  public router :Router
) {
  super(pages);
  this.router.events.subscribe((event: Event) => {
    if (event instanceof NavigationEnd) {
      this.getList();
    }
  })
}

public ngOnInit(): void {
  super.initPagesSettings();
  super.initPanelButton();

  this.breadcrumbs.breadcrumbs = [
    { link: "", title: "Dashboard" },
    { link: "promotions", title: "Promotions" },
  ];

  this.getLangList();
  this.getList();
  this.initTranslate();
}

public initTranslate(): void {
  this.lang.translate
    .get([
      "dashboard.dashboard",
      "MENU.catalog.promotions",
    ])
    .subscribe((tr: any) => {
      this.breadcrumbs.breadcrumbs = [
        { link: "", title: tr["dashboard.dashboard"] },
        { link: "promotions", title: tr["MENU.catalog.promotions"] },
      ];
    });
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
  // THIS SHOULD NOT BE HERE ! ! !
  let c = this.promForm.model;
    
  let data = {
    status: c.status,
    description: [],
  };

  //debugger;

  if (c.id != null) {
    c.descriptions.forEach((d) => {
      if (d.image_id == 0) {
        data.description.push({
          id: d.id,
          lang_id: d.lang_id,
          description: d.description,
          image_id: d.image.id,
          subtitle: d.subtitle,
          title: d.title,
          data_start: d.data_start,
          data_end: d.data_end,
        })
      } else {
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
      }
    });
    this.prom.put(data, c.id).subscribe(this.putHandler);

    if (this.selectedProductsPromotion) {
      this.prom.updatePromotionProducts(this.selectedProductsPromotion, c.id).subscribe((res) => {
        this.ngxService.stopAll();
        this.toastr.success("PROMOTION UPDATED ^_^");
      })
    }
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
    
    this.prom.post(data).subscribe((res) => {
      //debugger;

      this.postHandler(res);
      if (this.selectedProductsPromotion) {
        this.prom.updatePromotionProducts(this.selectedProductsPromotion, res.data.id).subscribe((res) => {
          this.ngxService.stopAll();
          this.toastr.success("PROMOTION ADDED");
        })
      }
    })
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

public edit(i): void {
  this.prom.getByPromotionId(i.id).subscribe((res) => {
    this.products = res.data;

    this.productsList = this.products.map(function(val) {
      return val.product;
    })
  })

  this.promForm.initByModel(i, this.langService.languages.data);
  this.openForm();
}

public deletePromotion(promotionId) {
  this.prom.removePromotion(promotionId).subscribe((res) => {
    this.getList()
  });

  this.prom.data.data = this.prom.data.data.filter((d) => {
    return d.id !== promotionId;
  });
}

public selectedProducts(event): void {
  this.selectedProductsPromotion = event?.map(function(product) {
    return product.id;
  })
}

  //
  updateStatus(item: IPromotion) {
    this.prom
      .updateStatus(item.id, item.status === 0 ? 1 : 0)
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
pageEvent(event): void {
  this.prom.data.count = event.length;
  this.prom.data.take = event.pageSize;
  this.prom.data.skip = event.pageSize * event.pageIndex;
  this.getList();
}

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
