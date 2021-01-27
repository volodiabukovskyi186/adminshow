import { Permission } from './../../../core/permission/permission';
import { Component, OnInit,OnChanges, Inject, SimpleChanges } from "@angular/core";
import { BasePage } from "../../@core";
import { PaginationPage } from "src/app/modules/ui/rap/pagination/pagination-page";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ToastrService } from "ngx-toastr";
import { BreadcrumbsService } from "src/app/core/breadcrumbs.service";
import { PagesService } from "../../pages.service";
import { ProductService } from "src/app/modules/catalog/product/services/product.service";
import { LanguageService } from "src/app/modules/localization/language/language.service";
import { changeValueHighlight } from "src/app/modules/ui/animations";
import { IProduct } from "src/app/modules/catalog/product/interfaces";
import { ProductFormService } from "src/app/modules/catalog/product/services/product-form.service";
import { ManufacturerService } from "src/app/modules/manufacturer/manufacturer.service";
import { CategoryService } from "src/app/modules/catalog/category/category.service";
import { ProductCategoryService } from "src/app/modules/catalog/product/services/product-category.service";
import { LanguageService as LanguageLocalizationService } from "src/app/core/language.service";
import { RolesModule } from 'src/app/modules/roles/roles.module';
import { RoleService } from 'src/app/core/auth/models/role.service';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { SearchService } from '../../../modules/ui/rap/search/services/search.service';
import { isString } from 'util';

@Component({
  animations: [changeValueHighlight],
  selector: "app-products-page",
  templateUrl: "./products-page.component.html",
  styleUrls: ["./products-page.component.scss"],
})
export class ProductsPageComponent extends BasePage implements OnInit, OnChanges, PaginationPage {
  public userRole: number = 0;
  public search: string;
  public searchProductId: number;

  constructor(
    protected ngxService: NgxUiLoaderService,
    protected toastr: ToastrService,
    public breadcrumbs: BreadcrumbsService,
    public pages: PagesService,
    public product: ProductService,
    public prodForm: ProductFormService,
    public manufacturer: ManufacturerService,
    public langService: LanguageService,
    public category: CategoryService,
    public prodCategory: ProductCategoryService,
    public languageLocalizationService: LanguageLocalizationService,
    public searchService: SearchService,
    private roleService:RoleService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document) {
      super(pages);

      this.translate.onLangChange.subscribe(lang => {
        this.getUserByTokin();
      })
    }

  public ngOnChanges(): void {
    this.getUserByTokin();
  }

  public ngOnInit(): void {
    super.initPagesSettings();
    super.initPanelButton();

    this.breadcrumbs.breadcrumbs = [
      { link: '', title: 'Dashboard' },
      { link: 'products', title: 'Products' },
    ];

    this.getLangList();
    //this.getAllManufacturer();
    this.initTranslate();
    this.getUserByTokin();
  }

  public getUserByTokin(): void {
    this.roleService.getByToken().subscribe(data => {
      this.userRole = data.data.role.id;
      this.getList(this.userRole);
      this.getProductsBySearch(this.userRole);

      if (this.userRole === 1) {
        console.log('this.userRole OWNER', this.userRole);
        this.getAllManufacturer();
      } 
      if (this.userRole !== 1) {
        console.log('this.userRole MANAGER', this.userRole);
        this.getManagerManufacturers();
      }
    });
  }

  public initTranslate(): void {
    this.languageLocalizationService.translate
      .get([
        'dashboard.dashboard',
        'MENU.catalog.products',
      ])
      .subscribe((tr: any) => {
        this.breadcrumbs.breadcrumbs = [
          { link: '', title: tr['dashboard.dashboard'] },
          { link: 'products', title: tr['MENU.catalog.products'] },
        ];
      });
  }

  public searchHandler = (data) => {
    console.log(data);

    this.product.data.data = data.data;
    this.product.data.count = data.count;
    this.breadcrumbs[1] = {
      link: '/#',
      title: 'SearchResult',
    };
  }

  public get(): void {
    this.searchService.search(this.search).subscribe(this.searchHandler);
  }

  public isNumber(n) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
  }

  public getList(role_id): void {
    this.ngxService.start();
    this.product.getList(role_id).subscribe(this.getListHandler);

  }

  public getProductsBySearch(roleId): void {
    this.route.queryParams
      .subscribe(data => {
        console.log(data);

        if (data.hasOwnProperty('search')) {
          if (this.isNumber(data.search)) {
            this.product.getProductById(Number(data.search)).subscribe((res) => {
              this.product.data.data = [res.data];
            });
          }
          if (!this.isNumber(data.search)) {
            this.search = data.search;
            this.get();
          }
        } else {
        }
    });
  }

  getListHandler = (data) => {
    this.ngxService.stopAll();
    this.product.data = data;
  };

  getLangList() {
    this.ngxService.start();
    this.langService.getLangs().subscribe(this.getLangListHandler);
  }

  getLangListHandler = (data) => {
    this.ngxService.stopAll();
    this.langService.languages = data;

    this.prodForm.initDescription(this.langService.languages.data);
  };

  getAllManufacturer() {
    this.ngxService.start();
    this.manufacturer.getAll().subscribe(this.getAllManufacturerHandler);
  }

  getAllManufacturerHandler = (data) => {
    this.manufacturer.all = data.data;
    // console.log(data, this.manufacturer.all);

    this.ngxService.stopAll();
  };

  getManagerManufacturers() {
    this.ngxService.start();
    this.manufacturer.getManagerManufacturers().subscribe(this.getManagerManufacturerHandler);
  }

  getManagerManufacturerHandler = (data) => {
    this.manufacturer.managerManufacturers = data.data;
    console.log('this.manufacturer.managerManufacturers', this.manufacturer.managerManufacturers);

    this.ngxService.stopAll();
  };
  //#region override

  save = () => {
    // console.log("ADD/UPDATE", this.categoryForm.category);

    // THIS SHOULD NOT BE HERE ! ! !
    let c = this.prodForm.model;

    let data = {
      rating: c.rating,
      sort_order: c.sort_order, //+
      image_id: c.image_id, //+
      point: c.point, //+
      lenght: c.lenght, //+
      width: c.width, //+
      height: c.height, //+
      shipping: c.shipping, //+
      subtract: c.subtract, //+
      weight: c.weight, //+

      lenght_class_id: c.lenght_class_id, //+
      stock_status_id: c.stock_status_id, //+
      weight_class_id: c.weight_class_id, //+
      tax_class_id: c.tax_class_id, //+

      date_avaliable: c.date_avaliable, //+
      ean: c.ean, // +
      isbn: c.isbn, // +
      jan: c.jan, // +
      location: c.location, // +
      manufactured_id: c.manufactured_id, // +
      minimum: c.minimum, // +
      model: c.model, // +
      mpn: c.mpn, // +
      price: c.price, // +
      quantity: c.quantity, // +
      sku: c.sku, // +
      status: c.status, // +
      upc: c.upc, // +
      viewed: 0, // +
      description: [], // +
      size_group_id: c.size_group_id,
    };
    if (c.id != null) {
      c.descriptions.forEach((d) => {
        data.description.push({
          id: d.id,
          lang_id: d.lang_id,
          name: d.name,
          discription: d.discription,
          meta_discription: d.meta_discription,
          meta_keywords: d.meta_keywords,
          tag: d.tag,
        });
      });
      this.product.put(data, c.id).subscribe(this.putHandler);
    } else {
      c.descriptions.forEach((d) => {
        data.description.push({
          lang_id: d.lang_id,
          name: d.name,
          discription: d.discription,
          meta_discription: d.meta_discription,
          meta_keywords: d.meta_keywords,
          tag: d.tag,
        });
      });
      console.log('oooo', data);
      this.product.post(data).subscribe(this.postHandler);
    }
    this.ngxService.start();
  };

  postHandler = (data) => {
    this.ngxService.stopAll();

    this.product.data.data.push(data.data);
    this.product.data.count++;

    this.closeForm();
    this.toastr.success("PRODUCT ADDED");
  };

  putHandler = (data) => {
    this.ngxService.stopAll();
    this.closeForm();
    this.toastr.success("PRODUCT UPDATED ^_^");
  };

  plus = () => {
    this.prodForm.initEmptyModel();
    this.prodForm.host = null;
    this.prodForm.initDescription(this.langService.languages.data);
    this.openForm();
  };

  //#endregion

  public edit(i): void {
    this.prodForm.initByModel(i, this.langService.languages.data);
    this.prodForm.host = this.product.data.host;

    this.getAllCategory();
    this.getProdCategory();

    this.openForm();
  }

  public getAllCategory(): void {
    this.category.getAll().subscribe(this.getAllCategoryHandler);
  }

  getAllCategoryHandler = (data) => {
    this.category.all = data.data;
    this.category.all.forEach((element) => {
      // let t = "";
      // element.parents.forEach((p) => {
      //   t += p.name + " | ";
      // });
      element.title = element.parents
        .map(function (k) {
          return k.name;
        })
        .join(" > ");
    });
  };

  getProdCategory() {
    this.prodCategory
      .getByProdId(this.prodForm.model.id)
      .subscribe(this.getProdCategoryHandler);
  }
  getProdCategoryHandler = (data) => {
    this.prodCategory.list = data.data;
    this.prodCategory.initVales();
  };

  editItem: IProduct = null;

  //
  updateStatus(item: IProduct) {
    this.product
      .updateStatus(item.id, item.status == 0 ? 1 : 0)
      .subscribe(this.updateStatusHandler);
    this.editItem = item;
  }
  updateStatusHandler = (data) => {
    this.product.updateStatusInList(
      this.editItem.id,
      this.editItem.status == 0 ? 1 : 0
    );
  };
  pageEvent(event):void{
    // console.log('event===>',event)
    this.product.data.count=event.length
    this.product.data.take=event.pageSize
    this.product.data.skip=event.pageSize*event.pageIndex
    this.getList(this.userRole);
  }

  //#region pagination

  pageToHandler(page: number): void {
    this.product.page = page;
  }
  pagePrevHandler(): void {
    this.product.page--;
  }
  pageNextHandler(): void {
    this.product.page++;
  }
  pageChangedHandler(): void {
    this.getList(this.userRole);
    window.scrollTo(0, 0);
  }
  Math = Math;

  //#endregion
}
