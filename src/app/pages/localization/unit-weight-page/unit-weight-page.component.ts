import { Component, OnInit } from '@angular/core';
import {PagesService} from "../../pages.service";
import {LocalizationServicesService} from "../services/localization-services.service";
import {BasePage} from "../../@core";

@Component({
  selector: 'app-unit-weight-page',
  templateUrl: './unit-weight-page.component.html',
  styleUrls: ['./unit-weight-page.component.scss']
})
export class UnitWeightPageComponent extends BasePage implements OnInit {

  arrStatus:Array<any>
  selectedOrder
  constructor( public pages: PagesService,
               public localizationService: LocalizationServicesService) {super(pages); }

  ngOnInit(): void {
    super.initPagesSettings();
    super.initPanelButton();
  }
  getStatus():void{
    // this.localizationService.getOrderStatus().subscribe(data=>{
    //   this.arrStatus=data.data;
    //   console.log(this.arrStatus)
    // })
  }
  deleteStatus(order):void{
    // this.localizationService.deleteOrderStatus(order).subscribe(data=>{
    //   this.arrStatus=data.data;
    // })
  }
  edit(i) {
    this.selectedOrder = i;
    this.openForm();
  }
}
