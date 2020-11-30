import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, Inject } from "@angular/core";
import { BasePage } from "../@core";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ToastrService } from "ngx-toastr";
import { BreadcrumbsService } from "src/app/core/breadcrumbs.service";
import { PagesService } from "../pages.service";
import {
  ManufacturerService,
  IManufacturer,
} from "src/app/modules/manufacturer/manufacturer.service";
import { LanguageService } from "src/app/modules/localization/language/language.service";
//import { changeValueHighlight } from "src/app/modules/ui/animations";
import { ManufacturerFormService } from "src/app/modules/manufacturer/manufacturer-form.service";
import { LanguageService as Lang } from "src/app/core/language.service";
import { RoleService } from 'src/app/core/auth/models/role.service';
import { DOCUMENT } from '@angular/common';

@Component({
  //animations: [changeValueHighlight],
  selector: "app-manufacturer-page",
  templateUrl: "./manufacturer-page.component.html",
  styleUrls: ["./manufacturer-page.component.scss"],
})
export class ManufacturerPageComponent extends BasePage implements OnInit {
  editItem: IManufacturer = null;
  constructor(
    protected ngxService: NgxUiLoaderService,
    protected toastr: ToastrService,
    public breadcrumbs: BreadcrumbsService,
    public pages: PagesService,
    public manufacturer: ManufacturerService,
    public langService: LanguageService,
    public manufacturerForm: ManufacturerFormService,
    public roleService:RoleService,
    public lang: Lang,
    private translate: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) {
    super(pages);
    this.translate.onLangChange.subscribe(lang => {
      this.getList(this.userRoleId);
    })
  }
  userRoleId:number;
  userRoleStatus:boolean=false;
  ngOnInit(): void {
    super.initPagesSettings();
    super.initPanelButton();

    this.breadcrumbs.breadcrumbs = [
      { link: "", title: "Dashboard" },
      { link: "manufacturer", title: "Manufacturers" },
    ];

    this.getLangList();
    this.getUserByTokin()
    this.initTranslate();
  }
  getUserByTokin():void{
    this.roleService.getByToken().subscribe(data=>{
      this.userRoleId=data.data.user.role_id
      if(this.userRoleId==1){
        this.userRoleStatus=true;
      }
      this.getList(this.userRoleId);
    })
  }

  initTranslate() {
    this.lang.translate
      .get([
        "dashboard.dashboard",
        "MENU.manufacturer.manufacturers",
      ])
      .subscribe((tr: any) => {
        this.breadcrumbs.breadcrumbs = [
          { link: "", title: tr["dashboard.dashboard"] },
          { link: "manufacturer", title: tr["MENU.manufacturer.manufacturers"] },
        ];
      });
  }

  getList(user_role) {
    this.ngxService.start();
    this.manufacturer.getList(user_role).subscribe(this.getListHandler);
  }

  getListHandler = (data) => {
    // debugger;
    this.ngxService.stopAll();
    this.manufacturer.manufacturer = data;
    console.log('manufac====>',data)
  };

  getLangList() {
    this.ngxService.start();
    this.langService.getLangs().subscribe(this.getLangListHandler);
  }

  getLangListHandler = (data) => {
    this.ngxService.stopAll();
    this.langService.languages = data;
    this.manufacturerForm.initDesc(this.langService.languages.data);
  };

  updateStatus(item: IManufacturer) {
    this.manufacturer
      .updateStatus(item.id, item.status == 0 ? 1 : 0)
      .subscribe(this.updateStatusHandler);
    this.editItem = item;
  }
  updateStatusHandler = (data) => {
    this.manufacturer.updateStatusInList(
      this.editItem.id,
      this.editItem.status == 0 ? 1 : 0
    );
  };

  //#region override

  save = () => {
    // console.log("ADD/UPDATE", this.categoryForm.category);

    // THIS SHOULD NOT BE HERE ! ! !
    let c = this.manufacturerForm.manufacturer;

    let data = {
      image_id: c.image_id,
      code: c.code,
      rating: c.rating,
      status: c.status,
      description: [],
    };
    if (c.id != null) {
      c.description.forEach((d) => {
        data.description.push({
          id: d.id,
          lang_id: d.lang_id,
          name: d.name,
          description: d.description,
          meta_description: d.meta_description,
          meta_keywords: d.meta_keywords,
        });
      });
      console.log('updateitem__=>',data,c.id)
      this.manufacturer.put(data, c.id).subscribe(this.putHandler);
    } else {
      c.description.forEach((d) => {
        data.description.push({
          lang_id: d.lang_id,
          name: d.name,
          description: d.description,
          meta_description: d.meta_description,
          meta_keywords: d.meta_keywords,
        });
      });
      this.manufacturer.post(data).subscribe(this.postHandler);
    }
    this.ngxService.start();
  };

  postHandler = (data: { data: IManufacturer }) => {
    this.ngxService.stopAll();

    this.manufacturer.manufacturer.data.push(data.data);
    this.manufacturer.manufacturer.count++;

    this.closeForm();
    this.toastr.success("MANUFACTURER ADDED");
  };

  putHandler = (data) => {
    this.ngxService.stopAll();
    this.closeForm();
    this.toastr.success("MANUFACTURER UPDATED ^_^");
  };

  plus = () => {
    this.manufacturerForm.initEmptyCategory();
    this.manufacturerForm.initDesc(this.langService.languages.data);
    this.openForm();
  };

  //#endregion

  edit(i: IManufacturer) {
    this.manufacturerForm.initBy(i, this.langService.languages.data);
    this.openForm();
  }

  //#region pagination
  pageEvent(event):void{
    this.manufacturer.manufacturer.count=event.length
    this.manufacturer.manufacturer.take=event.pageSize
    this.manufacturer.manufacturer.skip=event.pageSize*event.pageIndex
    this.getList(this.userRoleId);
  }

  pageToHandler(page: number): void {
    this.manufacturer.page = page;
  }
  pagePrevHandler(): void {
    this.manufacturer.page--;
  }
  pageNextHandler(): void {
    this.manufacturer.page++;
  }
  pageChangedHandler(): void {
    this.getList(this.userRoleId);
    window.scrollTo(0, 0);
  }
  Math = Math;

  //#endregion
}
