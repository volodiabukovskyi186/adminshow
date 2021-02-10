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
import { changeValueHighlight } from "src/app/modules/ui/animations";
import {ManufactrureDialogComponent} from '../../modules/dialogs/manufactrure-dialog/manufactrure-dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  animations: [changeValueHighlight],

  selector: "app-manufacturer-page",
  templateUrl: "./manufacturer-page.component.html",
  styleUrls: ["./manufacturer-page.component.scss"],
})
export class ManufacturerPageComponent extends BasePage implements OnInit {
  public editItem: IManufacturer = null;
  public animal: string;
  public name: string;
  public userRoleId: number;
  public userRoleStatus: boolean = false;
  public userId: number;
  public  showTabSize = false;
  selected: IManufacturer;
  constructor(
    protected ngxService: NgxUiLoaderService,
    protected toastr: ToastrService,
    public breadcrumbs: BreadcrumbsService,
    public pages: PagesService,
    public manufacturer: ManufacturerService,
    public langService: LanguageService,
    public manufacturerForm: ManufacturerFormService,
    public roleService: RoleService,
    public lang: Lang,
    private translate: TranslateService,
    public dialog: MatDialog,

    @Inject(DOCUMENT) private document: Document
  ) {
    super(pages);
    this.translate.onLangChange.subscribe(lang => {
      this.getList(this.userRoleId);
    });
  }

  public ngOnInit(): void {
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

  public getUserByTokin(): void {
    this.roleService.getByToken().subscribe(data => {
      this.userRoleId = data.data.user.role_id;
      if(this.userRoleId == 1 ) {
        this.userRoleStatus = true;
      }
      this.getList(this.userRoleId);
      this.userId = data.data.user.id;
    })
  }

  public initTranslate(): void {
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

  public getList(user_role): void {
    this.ngxService.start();
    this.manufacturer.getList(user_role).subscribe(this.getListHandler);
  }

  getListHandler = (data) => {
    this.ngxService.stopAll();
    this.manufacturer.manufacturer = data;
  };

  public getLangList(): void {
    this.ngxService.start();
    this.langService.getLangs().subscribe(this.getLangListHandler);
  }

  getLangListHandler = (data) => {
    this.ngxService.stopAll();
    this.langService.languages = data;
    this.manufacturerForm.initDesc(this.langService.languages.data);
  } ;

  public updateStatus(item: IManufacturer): void {
    this.manufacturer
      .updateStatus(item.id, item.status === 0 ? 1 : 0)
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
      user_id:this.userId
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
    this.getList(this.userRoleId);
  };

  postHandler = (data: { data: IManufacturer }) => {
    this.ngxService.stopAll();

    this.manufacturer.manufacturer.data.push(data.data);
    this.manufacturer.manufacturer.count++;

    this.closeForm();
    this.toastr.success('MANUFACTURER ADDED');
  };

  putHandler = (data) => {
    this.ngxService.stopAll();
    this.closeForm();
    this.toastr.success('MANUFACTURER UPDATED ^_^') ;
  };

  plus = () => {
    this.showTabSize = false;
    this.manufacturerForm.initEmptyCategory();
    this.manufacturerForm.initDesc(this.langService.languages.data);
    this.openForm();
  };

  //#endregion

  public edit(i: IManufacturer): void {
    this.showTabSize = true;
    this.selected = i;
    this.manufacturerForm.initBy(i, this.langService.languages.data);
    this.openForm();
  }

  public deleteManufactures(item): void {
    const dialogRef = this.dialog.open(ManufactrureDialogComponent, {
      width: '45vw',
      height: '300px',
      data: {name: this.name, animal: this.animal}
    });
    dialogRef.afterClosed().subscribe(result => {
      if ( result == true) {
        this.manufacturer.deleteManufacture(item.id).subscribe(data=>{
          this.getList(this.userRoleId);
        })
      }
      this.animal = result;
    });
  }

  openDialog(): void {}

  //#region pagination
  pageEvent(event): void {
    this.manufacturer.manufacturer.count = event.length;
    this.manufacturer.manufacturer.take = event.pageSize;
    this.manufacturer.manufacturer.skip = event.pageSize  * event.pageIndex;
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
