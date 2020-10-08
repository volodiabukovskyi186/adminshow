import { Component, OnInit } from '@angular/core';
import {BasePage} from "../../@core";
import {PagesService} from "../../pages.service";

@Component({
  selector: 'app-storage-status-page',
  templateUrl: './storage-status-page.component.html',
  styleUrls: ['./storage-status-page.component.scss']
})
export class StorageStatusPageComponent extends BasePage implements OnInit {
  arrStatus:Array<any>;
  selectedOrder:any;
  constructor(public pages: PagesService,) {super(pages); }

  ngOnInit(): void {
    super.initPagesSettings();
    super.initPanelButton();
  }
  edit(item):void{
    this.selectedOrder = item;
    this.openForm();
  }

  deleteStatus(item):void{

  }

}
