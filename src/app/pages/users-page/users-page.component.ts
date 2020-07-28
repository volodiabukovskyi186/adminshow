import { Component, OnInit } from "@angular/core";
import { BasePage } from "../@core";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ToastrService } from "ngx-toastr";
import { BreadcrumbsService } from "src/app/core/breadcrumbs.service";
import { PagesService } from "../pages.service";
import { UserService } from "src/app/modules/user/user.service";
import { PaginationPage } from "src/app/modules/ui/rap/pagination/pagination-page";
import { UserFormService } from "src/app/modules/user/user-form.service";
import { RolesService } from "src/app/modules/roles/roles.service";

@Component({
  selector: "app-users-page",
  templateUrl: "./users-page.component.html",
  styleUrls: ["./users-page.component.scss"],
})
export class UsersPageComponent extends BasePage
  implements OnInit, PaginationPage {
  constructor(
    protected ngxService: NgxUiLoaderService,
    protected toastr: ToastrService,
    public breadcrumbs: BreadcrumbsService,
    public pages: PagesService,
    public user: UserService,
    public userForm: UserFormService,
    public role: RolesService
  ) {
    super(pages);
  }

  ngOnInit(): void {
    super.initPagesSettings();
    super.initPanelButton();

    this.breadcrumbs.breadcrumbs = [
      { link: "", title: "Dashboard" },
      { link: "users", title: "Users" },
    ];

    this.getAllRoles();
    this.getList();
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

  //#region override

  save = () => {
    // console.log("ADD/UPDATE", this.categoryForm.category);
    // THIS SHOULD NOT BE HERE ! ! !
    let c = this.userForm.model;
    let data = {
      role_id: c.role_id,
      email: c.email,
      password: c.password,
      first_name: c.first_name,
      last_name: c.last_name,
      permissions: "[]",
      secret: null,
      phone: c.tel,
    };
    if (c.id != null) {
      this.user.put(data, c.id).subscribe(this.putHandler);
    } else {
      this.user.post(data).subscribe(this.postHandler);
    }
    this.ngxService.start();
    console.log("SEND PROD DATA: ", data);
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

  isEdit: boolean = false;

  plus = () => {
    this.userForm.initEmptyModel();
    this.isEdit = false;
    this.openForm();
  };

  //#endregion

  edit(i) {
    this.userForm.initByModel(i);
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
