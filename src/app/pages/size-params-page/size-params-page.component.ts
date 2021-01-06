import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BasePage } from "../@core";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ToastrService } from "ngx-toastr";
import { BreadcrumbsService } from "src/app/core/breadcrumbs.service";
import { PagesService } from "../pages.service";
import { LanguageService } from "src/app/modules/localization/language/language.service";
import { LanguageService as Lang } from "src/app/core/language.service";
import { changeValueHighlight } from "src/app/modules/ui/animations";
import { SizeParamsService } from './services/size-params-page.service';
import { IParams } from './interfaces/params';

@Component({
  animations: [changeValueHighlight],
  selector: "app-size-params-page",
  templateUrl: "./size-params-page.component.html",
  styleUrls: ["./size-params-page.component.scss"],
})
export class SizeParamsPageComponent extends BasePage implements OnInit {
  public selectedSizeParam: any;
  public sizeGroupParamsToUpdate: any;

  constructor(
    protected ngxService: NgxUiLoaderService,
    protected toastr: ToastrService,
    public breadcrumbs: BreadcrumbsService,
    public pages: PagesService,
    public langService: LanguageService,
    public lang: Lang,
    public sizeParamsService: SizeParamsService,
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
      { link: "size_params", title: "Size params" },
    ];

    this.initTranslate();
  }


  public initTranslate(): void {
    this.lang.translate
      .get([
        "dashboard.dashboard",
        "MENU.manufacturer.sizeParams",
      ])
      .subscribe((tr: any) => {
        this.breadcrumbs.breadcrumbs = [
          { link: "", title: tr["dashboard.dashboard"] },
          { link: "size_params", title: tr["MENU.manufacturer.sizeParams"] },
        ];
      });
  }

  public getList(): void {
    this.ngxService.start();
    this.sizeParamsService.getList().subscribe(this.getListHandler);
  }

  getListHandler = (data) => {
    this.ngxService.stopAll();
    this.sizeParamsService.sizeParams = data;
  };

  public edit(i): void {
    this.selectedSizeParam = i;
    this.openForm();

    console.log(i);
  }

  public getLangList(): void {
    this.ngxService.start();
    this.langService.getLangs().subscribe(this.getLangListHandler);
  }

  getLangListHandler = (data) => {
    this.ngxService.stopAll();
    this.langService.languages = data;
  } ;

  public getSizeGroupParamsDescriptions(event) {
    console.log(event);
    this.sizeGroupParamsToUpdate = event;
  }

  public deleteSizeGroupsParams(sizeParamsToDelete): void {
    console.log(sizeParamsToDelete);
    this.sizeParamsService.removeSizeGroupParam(sizeParamsToDelete.id).subscribe((res) => {
      console.log(res);
      this.getList();
    })
  }

  //#region override
  save = () => {
    if (this.selectedSizeParam.id !== null) {
      this.sizeParamsService.updateSizeGroupsParams(this.sizeGroupParamsToUpdate, this.selectedSizeParam.id).subscribe(this.putHandler);
    } else {
      this.sizeParamsService.createSizeGroupsParams(this.sizeGroupParamsToUpdate).subscribe(this.postHandler);
    }
    this.ngxService.start();
  };

  postHandler = (data: { data: IParams }) => {
    this.ngxService.stopAll();

    this.sizeParamsService.sizeParams?.data.push(data.data);
    this.sizeParamsService.sizeParams.count++;

    this.closeForm();
    this.toastr.success('SIZE PARAMS ADDED');
  };

  putHandler = (data) => {
    this.ngxService.stopAll();
    this.closeForm();
    this.toastr.success('SIZE PARAMS UPDATED ^_^') ;
  };

  plus = () => {
    this.sizeParamsService.initEmptySizeGroupParams();
    this.selectedSizeParam = this.sizeParamsService.selectedSizeParam;
    this.openForm();
  };

  pageEvent(event): void {
    this.sizeParamsService.sizeParams.count = event.length;
    this.sizeParamsService.sizeParams.take = event.pageSize;
    this.sizeParamsService.sizeParams.skip = event.pageSize  * event.pageIndex;
  }
}
