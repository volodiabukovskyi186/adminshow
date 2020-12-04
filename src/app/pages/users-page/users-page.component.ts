import { Component, OnInit, Input } from "@angular/core";
import { BasePage } from "../@core";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ToastrService } from "ngx-toastr";
import { BreadcrumbsService } from "src/app/core/breadcrumbs.service";
import { PagesService } from "../pages.service";
import { UserService } from "src/app/modules/user/user.service";
import { PaginationPage } from "src/app/modules/ui/rap/pagination/pagination-page";
import { UserFormService } from "src/app/modules/user/user-form.service";
import { RolesService } from "src/app/modules/roles/roles.service";
import { LanguageService as Lang } from "src/app/core/language.service";
import { Angular5Csv } from "angular5-csv/dist/Angular5-csv";
import { IProduct } from "src/app/modules/catalog/product/interfaces/product";
import { CategoryService } from "src/app/modules/catalog/category/category.service";
import { ProductCategoryService } from "src/app/modules/catalog/product/services/product-category.service";

@Component({
  selector: "app-users-page",
  templateUrl: "./users-page.component.html",
  styleUrls: ["./users-page.component.scss"],
})
export class UsersPageComponent extends BasePage implements OnInit, PaginationPage {
  public isEdit: boolean = false;
  @Input() model: IProduct;

  constructor(
    protected ngxService: NgxUiLoaderService,
    protected toastr: ToastrService,
    public breadcrumbs: BreadcrumbsService,
    public pages: PagesService,
    public user: UserService,
    public userForm: UserFormService,
    public role: RolesService,
    public lang: Lang,
    public category: CategoryService,
    public prodCategory: ProductCategoryService
  ) {
    super(pages);
  }

  public ngOnInit(): void {
    super.initPagesSettings();
    super.initPanelButton();

    this.breadcrumbs.breadcrumbs = [
      { link: "", title: "Dashboard" },
      { link: "users", title: "Users" },
    ];

    this.getAllRoles();
    this.getList();
    this.initTranslate();
  }

  public initTranslate(): void {
    this.lang.translate
      .get([
        "dashboard.dashboard",
        "MENU.users.users",
      ])
      .subscribe((tr: any) => {
        this.breadcrumbs.breadcrumbs = [
          { link: "", title: tr["dashboard.dashboard"] },
          { link: "users", title: tr["MENU.users.users"] },
        ];
      });
  }

  getList() {
    this.ngxService.start();
    this.user.getList().subscribe(this.getListHandler);
  }

  getListHandler = (data) => {
    this.ngxService.stopAll();
    this.user.data = data;
  };

  getAllRoles() {
    this.ngxService.start();
    this.role.getAllRoles().subscribe(this.getAllRolesHandler);
  }

  getAllRolesHandler = (data) => {
    this.ngxService.stopAll();
    this.role.all = data.data;
  };

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
      .getByProdId(this.userForm.model.id)
      .subscribe(this.getProdCategoryHandler);
  }

  getProdCategoryHandler = (data) => {
    this.prodCategory.list = data.data;
    this.prodCategory.initVales();
  };

  //#region override

  save = () => {
    // THIS SHOULD NOT BE HERE ! ! !
    let c = this.userForm.model;

    let data = {
      role_id: c.role_id,
      id: c.id,
      email: c.email,
      //password: c.password,
      first_name: c.first_name,
      last_name: c.last_name,
      permissions: "[]",
      secret: null,
      phone: c.tel,
      is_confirm_email: 0,
      is_confirm_tel: 0,
      album_id: 1,
      tel: c.tel,
      city: c.city,
      country: c.country,
      delivery_adress: c.delivery_adress
    };
    if (c.id != null) {
      this.user.put(data, c.id).subscribe(this.putHandler);
    } else {
      this.user.post(data).subscribe(this.postHandler);
    }
    this.ngxService.start();
  };

  postHandler = (data) => {
    this.ngxService.stopAll();

    this.user.data.data.push(data.data);
    this.user.data.count++;

    this.closeForm();
    this.toastr.success("user ADDED");
  };

  putHandler = (data) => {
    this.ngxService.stopAll();
    this.closeForm();
    this.toastr.success("user UPDATED ^_^");
  };

  plus = () => {
    this.userForm.initEmptyModel();
    this.isEdit = false;
    this.openForm();
  };

  //#endregion

  edit(i) {
    console.log('i===========>>>>>>>>', i);

    this.userForm.initByModel(i);
    //this.userForm.host = this.product.data.host;

    this.getAllCategory();
    this.getProdCategory();

    this.isEdit = true;
    this.openForm();
  }

  // editItem: IProduct = null;

  //
  // updateStatus(item: IProduct) {
  //   this.product
  //     .updateStatus(item.id, item.status == 0 ? 1 : 0)
  //     .subscribe(this.updateStatusHandler);
  //   this.editItem = item;
  // }
  // updateStatusHandler = (data) => {
  //   this.product.updateStatusInList(
  //     this.editItem.id,
  //     this.editItem.status == 0 ? 1 : 0
  //   );
  // };

  //#region pagination
  public pageEvent(event): void {
    this.user.data.count = event.length;
    this.user.data.take = event.pageSize;
    this.user.data.skip = event.pageSize * event.pageIndex;
    this.getList();
  }

  pageToHandler(page: number): void {
    this.user.page = page;
  }

  pagePrevHandler(): void {
    this.user.page--;
  }

  pageNextHandler(): void {
    this.user.page++;
  }

  pageChangedHandler(): void {
    this.getList();
    window.scrollTo(0, 0);
  }

  Math = Math;

  //#endregion
}
