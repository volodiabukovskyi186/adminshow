import { Component, OnInit } from '@angular/core';
import {PagesService} from "../../pages.service";
import {LocalizationServicesService} from "../services/localization-services.service";
import {BasePage} from "../../@core";
import {FormControl} from "@angular/forms";
import {LanguageService} from "../../../modules/localization/language/language.service";
import {WeightService} from "../services/weight.service";
import {BreadcrumbsService} from "../../../core/breadcrumbs.service";
import { ToastrService } from 'ngx-toastr';
import { LanguageService as Lang } from "src/app/core/language.service";

@Component({
  selector: 'app-unit-weight-page',
  templateUrl: './unit-weight-page.component.html',
  styleUrls: ['./unit-weight-page.component.scss']
})
export class UnitWeightPageComponent extends BasePage implements OnInit {
  arrWeight: Array<any>
  selected: any;
  alldata:any;
  public descr: FormControl = new FormControl();

  constructor(
    public pages: PagesService,
    public weightService:WeightService,
    public langService: LanguageService,
    public breadcrumbs: BreadcrumbsService,
    public lang: Lang,
    protected toastr: ToastrService,
  ) {
    super(pages);
  }

  public ngOnInit(): void {
    super.initPagesSettings();
    super.initPanelButton();
    this.initTranslate();
    this.getWeight();
    this.getLangList();

    // this.breadcrumbs.breadcrumbs = [
    //   { link: "", title: "Dashboard" },
    //   { link: "unit_weight", title: "Weight" },
    // ];
  }

  public initTranslate(): void {
    this.lang.translate
      .get([
        "dashboard.dashboard",
        "MENU.weight.weight",
      ])
      .subscribe((tr: any) => {
        this.breadcrumbs.breadcrumbs = [
          { link: "", title: tr["dashboard.dashboard"] },
          { link: "unit_weight", title: tr["MENU.weight.weight"] },
        ];
      });
  }

  getLangList() {
    this.langService.getLangs().subscribe(this.getLangListHandler);
  }

  getLangListHandler = (data) => {
    this.langService.languages = data;
  };


  getWeight(): void {
    this.weightService.getWeight().subscribe(data => {
      this.arrWeight = data.data;
      this.alldata=data
      console.log(this.arrWeight)
    })

  }

  deleteStatus(order): void {
      this.weightService.deleteWeight(order.id).subscribe(data => {
        this.getWeight()
      })
  }

  edit(i) {
    this.selected = i;
    this.openForm();

  }

  save = () => {

    const updateWeight = {
      value: this.selected.value,
      default: null,
      description: this.selected.description,
    }


    if (this.selected.id !== undefined) {
      this.weightService.editWeight(this.selected.id, updateWeight).subscribe(data => {
      })
      this.getWeight()
      this.toastr.success("WEIGHT EDIT");
    }
    else {
      this.weightService.addNewOrderStatus(this.selected.id, updateWeight).subscribe(data => {
        this.getWeight()
        this.toastr.success("WEIGHT ADDED");
      })
    }
    this.closeForm();


  }
  plus = () => {
    this.weightService.initEmptyWeightForm();
    this.selected = this.weightService.selected;
    this.openForm();
  };

  postHandler = (data) => {
    // this.ngxService.stopAll();
    this.weightService.data.data.push(data.data);
    this.weightService.data.count++;
    this.closeForm();
    // this.toastr.success("option ADDED");
  };
  // getListHandler = (data) => {
  //     this.ngxService.stopAll();
  //     this.localizationService.data = data;
  // };

  //#region pagination

  pageEvent(event):void{
    this.weightService.data.count=event.length
    this.weightService.data.take=event.pageSize
    this.weightService.data.skip=event.pageSize*event.pageIndex
    this.getWeight();
  }


  pageToHandler(page: number): void {
    this.weightService.page = page;
  }
  pagePrevHandler(): void {
    this.weightService.page--;
  }
  pageNextHandler(): void {
    this.weightService.page++;
  }
  pageChangedHandler(): void {
    this.getWeight();
    window.scrollTo(0, 0);
  }
  Math = Math;
}
