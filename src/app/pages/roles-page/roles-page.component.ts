import { Component, OnInit, ViewChild } from "@angular/core";
import { NgxUiLoaderService } from "ngx-ui-loader"; // Import NgxUiLoaderService
import { BreadcrumbsService } from "src/app/core/breadcrumbs.service";
import { RolesService } from "src/app/modules/roles/roles.service";
import { PagesService } from "../pages.service";
import { ToastrService } from "ngx-toastr";
import { RoleFormComponent } from "src/app/modules/roles/role-form/role-form.component";
import { Role } from "src/app/modules/roles/models/role";
import { RoleFormService } from "src/app/modules/roles/role-form.service";
import { RoleResponse } from "src/app/modules/roles/models";

@Component({
  selector: "app-roles-page",
  templateUrl: "./roles-page.component.html",
  styleUrls: ["./roles-page.component.scss"]
})
export class RolesPageComponent implements OnInit {
  @ViewChild(RoleFormComponent) roleFormComponent: RoleFormComponent;

  constructor(
    private ngxService: NgxUiLoaderService,
    private toastr: ToastrService,
    public breadcrumbs: BreadcrumbsService,
    public pages: PagesService,
    public role: RolesService,
    public roleForm: RoleFormService
  ) {
    this.init();
  }

  init() {
    this.pages.defaultSetting();
    this.pages.panelSettings.left = true;
    this.pages.panelSettings.top = true;

    this.pages.panelButtonSettings.rightToggle = true;
    this.pages.panelButtonSettings.plus = true;

    this.breadcrumbs.breadcrumbs = [
      { link: "", title: "Dashboard" },
      { link: "roles", title: "Roles" }
    ];
  }

  editId: number = null;

  getRoles() {
    this.ngxService.start();
    this.role.getRoles().subscribe(this.roleHandler);
  }

  roleHandler = (data: RoleResponse) => {
    this.ngxService.stopAll();
    this.role.roles = data;
  };


  onSubmit(data: any) {
    let prms = [];

    let keys = Object.keys(data.permissions);
    keys.forEach(name => {
      if (data.permissions[name] === true) {
        prms.push({ name, state: 1 });
      }
    });

    data.permissions = prms;
  
    this.ngxService.start();

    if (this.editId == null) {
      this.role.postRole(data).subscribe(this.postRoleHandler);
    } else {
      this.role.putRole(data, this.editId).subscribe(this.putRoleHandler);
    }
  }

  postRoleHandler = (data: { data: Role }) => {
    this.role.roles.data.push(data.data);
    this.toastr.success("ROLE ADDED");
    this.ngxService.stopAll();

    this.pages.panelButtonSettings.plus = true;
    this.pages.panelButtonSettings.save = false;
    this.pages.panelButtonSettings.rightToggle = true;
    this.pages.panelSettings.form = false;
  };

  putRoleHandler = (data: { data: Role }) => {
    this.role.updateInList(data.data);
    this.toastr.success("ROLE UPDAteD");
    this.ngxService.stopAll();

    this.closeForm();
  };

  edit(role: Role) {
    this.roleForm.questions$ = this.roleForm.getQuestions(role);
    this.editId = role.id;
    this.openFormPanel();
  }

  delete(role: Role) {
    this.ngxService.start();
    this.deleteId = role.id;
    this.role.deleteRole(role.id).subscribe(this.deleteRoleHandler);
  }
  deleteId = 0;
  deleteRoleHandler = (data: any) => {
    this.role.deleteFromList(this.deleteId);
    this.toastr.success("ROLE DELETED");
    this.ngxService.stopAll();
  };

  openFormPanel() {
    this.pages.panelSettings.form = true;
    this.pages.panelButtonSettings.plus = false;
    this.pages.panelButtonSettings.rightToggle = false;
    this.pages.panelButtonSettings.save = true;
    this.pages.panelButtonSettings.cancel = true;
  }

  ngOnInit(): void {
    this.getRoles();

    this.roleForm.questions$ = this.roleForm.getQuestions();
    this.pages.onSaveClick = this.saveRole;
    this.pages.onPlusClick = this.plusRole;
    this.pages.onCancelClick = this.cancel;
  }

  saveRole = () => {
    this.roleFormComponent.submitForm();
  };
  plusRole = () => {
    this.editId = null;
    this.openFormPanel();
  };
  cancel = () => {
    this.closeForm();
  };


  private closeForm() {
    this.pages.panelButtonSettings.plus = true;
    this.pages.panelButtonSettings.save = false;
    this.pages.panelButtonSettings.rightToggle = true;
    this.pages.panelButtonSettings.cancel = false;
    this.pages.panelSettings.form = false;
  }
}
