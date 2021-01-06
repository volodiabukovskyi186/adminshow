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
import { ISizeGroups } from './interfaces/size-groups';

@Component({
  animations: [changeValueHighlight],
  selector: "app-size-groups-page",
  templateUrl: "./size-groups-page.component.html",
  styleUrls: ["./size-groups-page.component.scss"],
})
export class SizeGroupsPageComponent extends BasePage implements OnInit {
  public selectedSizeGroup: any;
  public sizeGroupToUpdate: any;

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
  }

  public getLangList(): void {
    this.ngxService.start();
    this.langService.getLangs().subscribe(this.getLangListHandler);
  }

  getLangListHandler = (data) => {
    this.ngxService.stopAll();
    this.langService.languages = data;
  } ;

  public getSizeGroupDescriptions(event): void {
    this.sizeGroupToUpdate = event;
  }

  public deleteSizeGroup(sizeGroupToDelete): void {
    this.sizeGroupsService.removeSizeGroup(sizeGroupToDelete.id).subscribe((res) => {
      this.getList();
    })
  }

  save = () => {
    if (this.selectedSizeGroup.id !== null) {
      this.sizeGroupsService.updateSizeGroups(this.sizeGroupToUpdate, this.selectedSizeGroup.id).subscribe(this.putHandler);
    } else {
      this.sizeGroupsService.createSizeGroups(this.sizeGroupToUpdate).subscribe(this.postHandler);
    }
    this.ngxService.start();
  };

  postHandler = (data: { data: ISizeGroups }) => {
    this.ngxService.stopAll();

    this.sizeGroupsService.sizeGroups.data.push(data.data);
    this.sizeGroupsService.sizeGroups.count++;

    this.closeForm();
    this.toastr.success('SIZE GROUP ADDED');
  };

  putHandler = (data) => {
    this.ngxService.stopAll();
    this.getList();

    this.closeForm();
    this.toastr.success('SIZE GROUP UPDATED ^_^') ;
  };

  plus = () => {
    this.sizeGroupsService.initEmptySizeGroup();
    this.selectedSizeGroup = this.sizeGroupsService.selectedSizeGroup;
    this.openForm();
  };

  //#region pagination
  pageEvent(event): void {
    this.sizeGroupsService.sizeGroups.count = event.length;
    this.sizeGroupsService.sizeGroups.take = event.pageSize;
    this.sizeGroupsService.sizeGroups.skip = event.pageSize  * event.pageIndex;
  }

  //#endregion
}
