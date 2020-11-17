import { Component, OnInit } from '@angular/core';
import {BasePage} from "../../@core";
import {PagesService} from "../../pages.service";
import {FormControl} from "@angular/forms";
import {PaymentService} from "../../client/services/payment.service";
import {LanguageService} from "../../../modules/localization/language/language.service";
import {StorageService} from "../services/storage.service";
import {BreadcrumbsService} from "../../../core/breadcrumbs.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-storage-status-page',
  templateUrl: './storage-status-page.component.html',
  styleUrls: ['./storage-status-page.component.scss']
})
export class StorageStatusPageComponent extends BasePage implements OnInit {
  arrStorage: Array<any>
  selected: any;
  alldata:any
  public descr: FormControl = new FormControl();

  constructor(public pages: PagesService,
              public storageService:StorageService,
              public langService: LanguageService,
              public breadcrumbs: BreadcrumbsService,
              protected toastr: ToastrService,
  ) {
    super(pages);
  }
  ngOnInit(): void {
    super.initPagesSettings();
    super.initPanelButton();
    this.getWeight();
    this.getLangList();

    this.breadcrumbs.breadcrumbs = [
      { link: "", title: "Dashboard" },
      { link: "storage_status", title: "Storage status" },
    ];
  }


  getLangList() {
    this.langService.getLangs().subscribe(this.getLangListHandler);
  }

  getLangListHandler = (data) => {
    this.langService.languages = data;
  };


  getWeight(): void {
    this.storageService.getWeight().subscribe(data => {
      this.arrStorage = data.data;
      this.alldata=data;
      console.log(this.arrStorage)
    })
  }

  deleteStatus(order): void {
    this.storageService.deleteWeight(order.id).subscribe(data => {
      this.getWeight()
    })
  }

  edit(i) {
    this.selected = i;
    console.log(this.selected)
    this.openForm();
  }

  save = () => {
    const updateWeight = {
      color:this.selected.color,
      description: this.selected.descriptions,
    }
    if (this.selected.id !== undefined) {
      this.storageService.editWeight(this.selected.id, updateWeight).subscribe(data => {
      })
      this.getWeight()
      this.toastr.success("STATUS EDIT");
    }
    else {
      this.storageService.addNewOrderStatus(this.selected.id, updateWeight).subscribe(data => {
        this.getWeight()
        this.toastr.success("STATUS ADDED");
      })
    }
    this.closeForm();


  }
  plus = () => {
    this.storageService.initEmptyWeightForm();
    this.selected = this.storageService.selected;
    this.openForm();
  };

  postHandler = (data) => {
    // this.ngxService.stopAll();
    this.storageService.data.data.push(data.data);
    this.storageService.data.count++;
    this.closeForm();
    // this.toastr.success("option ADDED");
  };
  // getListHandler = (data) => {
  //     this.ngxService.stopAll();
  //     this.localizationService.data = data;
  // };

  //#region pagination
  pageEvent(event):void{
    this.storageService.data.count=event.length
    this.storageService.data.take=event.pageSize
    this.storageService.data.skip=event.pageSize*event.pageIndex
    this.getWeight()
  }


  pageToHandler(page: number): void {
    this.storageService.page = page;
  }
  pagePrevHandler(): void {
    this.storageService.page--;
  }
  pageNextHandler(): void {
    this.storageService.page++;
  }
  pageChangedHandler(): void {
    this.getWeight();
    window.scrollTo(0, 0);
  }
  Math = Math;

}
