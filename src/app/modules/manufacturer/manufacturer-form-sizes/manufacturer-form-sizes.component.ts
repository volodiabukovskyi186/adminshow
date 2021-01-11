import { Component, OnInit } from '@angular/core';
import {SizeGroupsService} from '../../../pages/size-groups-page/services/size-groups-page.service';
import {SizesServiceService} from '../../../pages/sizes-page/services/sizes-service.service';
import {SizeParamsService} from '../../../pages/size-params-page/services/size-params-page.service';
import {ManufacturerService} from '../manufacturer.service';

@Component({
  selector: 'app-manufacturer-form-sizes',
  templateUrl: './manufacturer-form-sizes.component.html',
  styleUrls: ['./manufacturer-form-sizes.component.scss']
})
export class ManufacturerFormSizesComponent implements OnInit {
  arrSizeGroup = [];
  arrSize = [];
  arrSizeParams = [];
  arrSizesValue = [];

  arrTable = [];
  arrTableParams = [];
  arrTableSizes = [];
  constructor(private sizeGroupsService: SizeGroupsService,
              private sizeService: SizesServiceService,
              private  sizeParamsServise: SizeParamsService,
              private  manufacturesService: ManufacturerService) { }

  ngOnInit(): void {
    this.getGroupSizes();
    this.getSizes();
    this.getSizeParams();
    this.getSizeTable();
  }
  getGroupSizes(): void {
    this.sizeGroupsService.getList().subscribe(data => {
      this.arrSizeGroup = data.data;
    });
  }
  getSizes(): void {
    this.sizeService.getSizes().subscribe(data => {
      this.arrSize = data.data;
    });
  }
  getSizeParams(): void {
    this.sizeParamsServise.getList().subscribe(data => {
      this.arrSizeParams = data.data;
    });
  }
  getSizeTable(): void {
    this.manufacturesService.getManufactureTable().subscribe(data => {
      console.log('data==>', data.data);
      this.arrTableParams = data.data.params;
      this.arrTableSizes = data.data.sizes;
      const arrValues = data.data.values;

      // arrValues.forEach((elem, index) => {
      //   subArray[index] = arrValues.slice((index * 3), (index * 3) + 3);
      // });
      for (let i = 0; i < Math.ceil(arrValues.length / this.arrTableParams.length); i++) {
        this.arrSizesValue[i] = arrValues.slice((i * this.arrTableParams.length), ( i * this.arrTableParams.length) + this.arrTableParams.length);
      }

      console.log('pppp=>',  this.arrSizesValue);
    });
  }

}
