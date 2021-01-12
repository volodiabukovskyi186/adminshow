import { Component, OnInit } from '@angular/core';
import {SizeGroupsService} from '../../../pages/size-groups-page/services/size-groups-page.service';
import {SizesServiceService} from '../../../pages/sizes-page/services/sizes-service.service';
import {SizeParamsService} from '../../../pages/size-params-page/services/size-params-page.service';
import {ManufacturerService} from '../manufacturer.service';
import {ManufactureTableModel} from '../modules/manufacture-table.model';

@Component({
  selector: 'app-manufacturer-form-sizes',
  templateUrl: './manufacturer-form-sizes.component.html',
  styleUrls: ['./manufacturer-form-sizes.component.scss']
})
export class ManufacturerFormSizesComponent implements OnInit {
  arrSizeGroup = [];
  arrSize = [] ;
  arrSizeParams: any;
  arrSizesValue = [];
  arrTableParams ;
  arrTableSizes ;
  groupId: number;
  sizeId: number;
  paramId: number;
  max: number;
  min: number;
  constructor(private sizeGroupsService: SizeGroupsService,
              private sizeService: SizesServiceService,
              private  sizeParamsServise: SizeParamsService,
              private  manufacturesService: ManufacturerService) { }

  ngOnInit(): void {
    this.getGroupSizes();

  }
  getGroupSizes(): void {
    this.sizeGroupsService.getListClient().subscribe(data => {
      this.arrSizeGroup = data.data;
      const groupId = this.arrSizeGroup[0].id;
      console.log('some', this.arrSizeGroup);
      // this.getSizes(groupId);
      // this.getSizeParams(groupId);
      // this.getSizeTable(groupId);
    });
  }
  selectGroup(groupId): void {
      console.log('id', groupId);
      if (groupId) {
          // this.getSizes(groupId);
          // this.getSizeParams(groupId);
          this.getSizeTable(groupId);
      }
  }
  getSizes(groupId: number): void {
    //   this.arrSize = [];
    // this.sizeService.getSizesClient(groupId).subscribe(data => {
    //   this.arrSize.push(data.data);
    //
    // });
  }
  getSizeParams(groupId: number): void {
    //   this.arrSizeParams = [];
    // this.sizeParamsServise.getListClient(groupId).subscribe(data => {
    //   if (data.data) {
    //       this.arrSizeParams.push(data.data);
    //   }
    //   console.log('sizes==>',   this.arrSizeParams);
    // });
  }
  getSizeTable(groupId: number): void {
    this.manufacturesService.getManufactureTable(groupId).subscribe(data => {
      this.arrTableParams = data.data.params;
      this.arrTableSizes = data.data.sizes;
      this.arrSize = data.data.sizes;
      this.arrSizeParams = data.data.params;

      const arrValues = data.data.values;
      for (let i = 0; i < Math.ceil(arrValues.length / this.arrTableParams.length); i++) {
        this.arrSizesValue[i] = arrValues.slice((i * this.arrTableParams.length), ( i * this.arrTableParams.length) + this.arrTableParams.length);
      }
      console.log('pppp=>',   this.arrTableSizes);
    });
  }
  createNewSizeItem(): void {
    const  newTableItem = new ManufactureTableModel(this.min, this.max, this.sizeId, this.paramId, this.groupId,6);
    this.manufacturesService.createManufacturesSize(newTableItem).subscribe();
    console.log('item', newTableItem);
  }

}
