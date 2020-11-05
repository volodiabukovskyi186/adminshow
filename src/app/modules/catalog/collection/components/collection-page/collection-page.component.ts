import { Component, OnInit, OnDestroy } from "@angular/core";
// import { BasePage } from "../../@core";
import { PaginationPage } from "src/app/modules/ui/rap/pagination/pagination-page";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ToastrService } from "ngx-toastr";
import { BreadcrumbsService } from "src/app/core/breadcrumbs.service";
// import { PagesService } from "../../pages.service";
import { LanguageService } from "src/app/modules/localization/language/language.service";
import {
  CollectionService,
  ICollection,
} from "src/app/modules/catalog/collection/services/collection.service";
import { CollectionFormService } from "src/app/modules/catalog/collection/services/collection-form.service";
import { changeValueHighlight } from "src/app/modules/ui/animations";
import { BasePage } from "src/app/pages/@core";
import { PagesService } from "src/app/pages/pages.service";
import { LanguageService as Lang } from "src/app/core/language.service";
import { Title } from "@angular/platform-browser";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  animations: [changeValueHighlight],
  selector: "app-collection-page",
  templateUrl: "./collection-page.component.html",
  styleUrls: ["./collection-page.component.scss"],
})
export class CollectionPageComponent extends BasePage
  implements OnInit, OnDestroy, PaginationPage {
  private _routerSubscription: any;

  public productsList;
  public products: any[];
  public selectedProductsPromotion: any[];

  constructor(
    protected ngxService: NgxUiLoaderService,
    protected toastr: ToastrService,
    public breadcrumbs: BreadcrumbsService,
    public pages: PagesService,
    public collection: CollectionService,
    public collectionForm: CollectionFormService,
    public langService: LanguageService,
    public lang: Lang,
    private _title: Title,
    private _router: Router
  ) {
    super(pages);
  }

  ngOnInit(): void {
    super.initPagesSettings();
    super.initPanelButton();

    // this.breadcrumbs.breadcrumbs = [
    //   { link: "", title: "Dashboard" },
    //   { link: "collection", title: "Collection" },
    // ];

    this.getLangList();
    this.getList();

    this.initTranslate();
    this._routerSubscription = this._router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.initTranslate();
        this.getList();
      }
    });
  }

  ngOnDestroy(): void {
    this._routerSubscription.unsubscribe();
  }

  initTranslate() {
    this.lang.translate
      .get([
        "collection.collections",
        "collection.collection",
        "collection.msgDeleted",
        "collection.msgUpdated",
        "collection.msgAdded",
        "dashboard.dashboard",
        "APP.TITLE",
      ])
      .subscribe((tr: any) => {
        this.msgAdded = tr["collection.msgAdded"];
        this.msgDeleted = tr["collection.msgDeleted"];
        this.msgUpdated = tr["collection.msgUpdated"];
        this._title.setTitle(
          `${tr["collection.collections"]} | ${tr["APP.TITLE"]}`
        );
        this.breadcrumbs.breadcrumbs = [
          { link: "", title: tr["dashboard.dashboard"] },
          { link: "collection", title: tr["collection.collections"] },
        ];
      });
  }

  getList() {
    this.ngxService.start();
    this.collection.getList().subscribe(this.getListHandler);
  }

  getListHandler = (data) => {
    this.ngxService.stopAll();
    this.collection.data = data;
  };

  getLangList() {
    this.ngxService.start();
    this.langService.getLangs().subscribe(this.getLangListHandler);
  }

  getLangListHandler = (data) => {
    this.ngxService.stopAll();
    this.langService.languages = data;

    this.collectionForm.initDescription(this.langService.languages.data);
  };

  //#region override

  save = () => {
    // THIS SHOULD NOT BE HERE ! ! !
    let c = this.collectionForm.model;

    let data = {
      image_id: c.image_id,
      status: c.status,
      description: [],
    };
    if (c.id != null) {
      c.descriptions.forEach((d) => {
        data.description.push({
          id: d.id,
          lang_id: d.lang_id,
          title: d.title,
          subtitle: d.subtitle,
          description: d.description,
        });
      });
      this.collection.put(data, c.id).subscribe(this.putHandler);
      if(this.selectedProductsPromotion){
        this.collection.updateCollectionProducts(this.selectedProductsPromotion, c.id).subscribe((res) => {
          this.ngxService.stopAll();
          this.toastr.success("COLLECTION UPDATED ^_^");
        })
      }
     
    } else {
      c.descriptions.forEach((d) => {
        data.description.push({
          lang_id: d.lang_id,
          title: d.title,
          subtitle: d.subtitle,
          description: d.description,
        });
      });
      this.collection.post(data).subscribe((res) => {
        this.postHandler(res);
        if(this.selectedProductsPromotion){
         this.collection.updateCollectionProducts(this.selectedProductsPromotion, res.data.id).subscribe((res) => {
          this.ngxService.stopAll();
          this.toastr.success("COLLECTION ADDED");
        })
      }
      });
    }
    this.ngxService.start();
  };

  postHandler = (data) => {
    this.ngxService.stopAll();

    this.collection.data.data.push(data.data);
    this.collection.data.count++;

    this.closeForm();
    this.toastr.success(this.msgAdded);
  };

  putHandler = (data) => {
    this.ngxService.stopAll();
    this.closeForm();
    this.toastr.success(this.msgUpdated);
  };

  plus = () => {
    this.collectionForm.initEmptyModel();
    this.collectionForm.initDescription(this.langService.languages.data);
    this.collectionForm.host = null;
    this.openForm();
  };

  //#endregion

  edit(i) {
    console.log(i);
    this.collection.getByCollectionId(i.id).subscribe((res) => {
      this.products = res.data;
      console.log(this.products);
  
      this.productsList = this.products.map(function(val) {
        return val.product;
      })
      
      console.log(this.productsList);
    })

    this.collectionForm.initByModel(i, this.langService.languages.data);
    this.collectionForm.host = this.collection.data.host;
    this.openForm();
  }

  selectedProducts(event) {
    console.log(event);
  
    this.selectedProductsPromotion = event?.map(function(product) {
      return product.id;
    })
  
    console.log(this.selectedProductsPromotion);
  }

  editItem: ICollection = null;

  //
  updateStatus(item: ICollection) {
    this.collection
      .updateStatus(item.id, item.status == 0 ? 1 : 0)
      .subscribe(this.updateStatusHandler);
    this.editItem = item;
  }
  updateStatusHandler = (data) => {
    this.collection.updateStatusInList(
      this.editItem.id,
      this.editItem.status == 0 ? 1 : 0
    );
  };

  //#region pagination

  pageToHandler(page: number): void {
    this.collection.page = page;
  }
  pagePrevHandler(): void {
    this.collection.page--;
  }
  pageNextHandler(): void {
    this.collection.page++;
  }
  pageChangedHandler(): void {
    this.getList();
    window.scrollTo(0, 0);
  }
  Math = Math;

  //#endregion
}
