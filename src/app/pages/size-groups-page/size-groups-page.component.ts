import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, Inject } from "@angular/core";
import { BasePage } from "../@core";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ToastrService } from "ngx-toastr";
import { BreadcrumbsService } from "src/app/core/breadcrumbs.service";
import { PagesService } from "../pages.service";
import { LanguageService } from "src/app/modules/localization/language/language.service";
import { LanguageService as Lang } from "src/app/core/language.service";
import { changeValueHighlight } from "src/app/modules/ui/animations";
import { SizeGroupsService } from './services/size-groups-page.service';

@Component({
  animations: [changeValueHighlight],
  selector: "app-size-groups-page",
  templateUrl: "./size-groups-page.component.html",
  styleUrls: ["./size-groups-page.component.scss"],
})
export class SizeGroupsPageComponent extends BasePage implements OnInit {
  public selectedSizeGroup: any;

  constructor(
    protected ngxService: NgxUiLoaderService,
    protected toastr: ToastrService,
    public breadcrumbs: BreadcrumbsService,
    public pages: PagesService,
    public langService: LanguageService,
    public lang: Lang,
    public sizeGroupsService: SizeGroupsService,
    private translate: TranslateService
  ) {
    super(pages);
  }
  public ngOnInit(): void {
    super.initPagesSettings();
    super.initPanelButton();
    this.getList();
    this.getLangList();

    this.breadcrumbs.breadcrumbs = [
      { link: "", title: "Dashboard" },
      { link: "size_groups", title: "Size groups" },
    ];

    this.initTranslate();
  }


  public initTranslate(): void {
    this.lang.translate
      .get([
        "dashboard.dashboard",
        "MENU.manufacturer.sizeGroups",
      ])
      .subscribe((tr: any) => {
        this.breadcrumbs.breadcrumbs = [
          { link: "", title: tr["dashboard.dashboard"] },
          { link: "size_groups", title: tr["MENU.manufacturer.sizeGroups"] },
        ];
      });
  }

  public getList(): void {
    this.ngxService.start();
    this.sizeGroupsService.getList().subscribe(this.getListHandler);
  }

  getListHandler = (data) => {
    this.ngxService.stopAll();
    this.sizeGroupsService.sizeGroups = data;
  };

  public edit(i): void {
    this.selectedSizeGroup = i;
    this.openForm();

    console.log(i);
  }

  public getSizeGroupDescriptions() {
    
  }

  public getLangList(): void {
    this.ngxService.start();
    this.langService.getLangs().subscribe(this.getLangListHandler);
  }

  getLangListHandler = (data) => {
    this.ngxService.stopAll();
    this.langService.languages = data;
    //this.manufacturerForm.initDesc(this.langService.languages.data);
  } ;

  // public updateStatus(item: IManufacturer): void {
  //   this.manufacturer
  //     .updateStatus(item.id, item.status === 0 ? 1 : 0)
  //     .subscribe(this.updateStatusHandler);
  //     this.editItem = item;
  // }
  // updateStatusHandler = (data) => {
  //   this.manufacturer.updateStatusInList(
  //     this.editItem.id,
  //     this.editItem.status == 0 ? 1 : 0
  //   );
  // };

  //#region override
  // save = () => {
  //   // console.log("ADD/UPDATE", this.categoryForm.category);
  //   // THIS SHOULD NOT BE HERE ! ! !
  //   let c = this.manufacturerForm.manufacturer;
  //   let data = {
  //     image_id: c.image_id,
  //     code: c.code,
  //     rating: c.rating,
  //     status: c.status,
  //     description: [],
  //     user_id:this.userId
  //   };
  //   if (c.id != null) {
  //     c.description.forEach((d) => {
  //       data.description.push({
  //         id: d.id,
  //         lang_id: d.lang_id,
  //         name: d.name,
  //         description: d.description,
  //         meta_description: d.meta_description,
  //         meta_keywords: d.meta_keywords,
  //       });
  //     });
  //     this.manufacturer.put(data, c.id).subscribe(this.putHandler);
  //   } else {
  //     c.description.forEach((d) => {
  //       data.description.push({
  //         lang_id: d.lang_id,
  //         name: d.name,
  //         description: d.description,
  //         meta_description: d.meta_description,
  //         meta_keywords: d.meta_keywords,
  //       });
  //     });
  //     this.manufacturer.post(data).subscribe(this.postHandler);
  //   }
  //   this.ngxService.start();
  // };

  // postHandler = (data: { data: IManufacturer }) => {
  //   this.ngxService.stopAll();

  //   this.manufacturer.manufacturer.data.push(data.data);
  //   this.manufacturer.manufacturer.count++;

  //   this.closeForm();
  //   this.toastr.success('MANUFACTURER ADDED');
  // };

  // putHandler = (data) => {
  //   this.ngxService.stopAll();
  //   this.closeForm();
  //   this.toastr.success('MANUFACTURER UPDATED ^_^') ;
  // };

  // plus = () => {
  //   this.manufacturerForm.initEmptyCategory();
  //   this.manufacturerForm.initDesc(this.langService.languages.data);
  //   this.openForm();
  // };

  // //#endregion

  // openDialog(): void {}

  //#region pagination
  pageEvent(event): void {
    this.sizeGroupsService.sizeGroups.count = event.length;
    this.sizeGroupsService.sizeGroups.take = event.pageSize;
    this.sizeGroupsService.sizeGroups.skip = event.pageSize  * event.pageIndex;
  }

  // pageToHandler(page: number): void {
  //   this.sizeGroupsService.sizeGroups.page = page;
  // }
  // pagePrevHandler(): void {
  //   this.sizeGroupsService.sizeGroups.page--;
  // }
  // pageNextHandler(): void {
  //   this.sizeGroupsService.sizeGroups.page++;
  // }
  // pageChangedHandler(): void {
  //   window.scrollTo(0, 0);
  // }
  // Math = Math;

  //#endregion
}
