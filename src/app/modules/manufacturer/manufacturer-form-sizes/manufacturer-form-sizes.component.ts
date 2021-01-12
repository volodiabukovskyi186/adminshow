import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SizeGroupsService} from '../../../pages/size-groups-page/services/size-groups-page.service';
import {SizesServiceService} from '../../../pages/sizes-page/services/sizes-service.service';
import {SizeParamsService} from '../../../pages/size-params-page/services/size-params-page.service';
import {IManufacturer, ManufacturerService} from '../manufacturer.service';
import {ManufactureTableModel} from '../modules/manufacture-table.model';

@Component({
  selector: 'app-manufacturer-form-sizes',
  templateUrl: './manufacturer-form-sizes.component.html',
  styleUrls: ['./manufacturer-form-sizes.component.scss']
})
export class ManufacturerFormSizesComponent implements OnInit, OnChanges {
  @Input() selected: IManufacturer;
  arrSizeGroup = [];
  arrSize: any;
  arrSizeParams: any;
  arrSizesValue = [];
  arrTableParams ;
  arrTableSizes ;
  allTable ;
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
      if (this.selected) {
        this.groupId = this.arrSizeGroup[0].id;
        this.getSizeTable(this.groupId);
      }
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    this.getGroupSizes();
  }

  selectGroup(groupId): void {
      if (groupId) {
          this.getSizeTable(groupId);
          this.max = 0;
          this.min = 0;
      }
  }
  getSizeTable(groupId: number): void {
    this.arrTableParams = [];
    this.arrTableSizes = [];
    this.arrSize = [];
    this.arrSizeParams = [];
    this.arrSizesValue = [];
    this.allTable = '';
    this.manufacturesService.getManufactureTable(groupId, this.selected.id).subscribe(data => {
      this.allTable = data.data;
      this.arrTableParams = data.data.params;
      this.arrTableSizes = data.data.sizes;
      this.arrSize = data.data.sizes;
      this.arrSizeParams = data.data.params;

      const arrValues = data.data.values;
        for (let i = 0; i < Math.ceil(arrValues.length / this.arrTableParams.length); i++) {this.arrSizesValue[i] = arrValues.slice((i * this.arrTableParams.length), ( i * this.arrTableParams.length) + this.arrTableParams.length);
      }
    });
  }
  createNewSizeItem(): void {
    const  newTableItem = new ManufactureTableModel(this.min, this.max, this.sizeId, this.paramId, this.groupId, this.selected.id);
    this.manufacturesService.createManufacturesSize(newTableItem).subscribe();
    this.getSizeTable(this.groupId);
    this.max = 0;
    this.min = 0;
  }

}
