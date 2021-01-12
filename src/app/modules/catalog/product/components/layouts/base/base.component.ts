import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { IProduct } from "../../../interfaces";
import { IManufacturer } from "src/app/modules/manufacturer/manufacturer.service";
import {SizeGroupsService} from '../../../../../../pages/size-groups-page/services/size-groups-page.service';

@Component({
  selector: "product-form-base",
  templateUrl: "./base.component.html",
  styleUrls: ["./base.component.scss"],
})
export class BaseComponent implements OnInit, OnChanges {
  @Input() model: IProduct;
  @Input() manufacturers: IManufacturer[] = [];
  @Input() title: string = "";
  @Input() host: string;

  @Output() press = new EventEmitter();
  @Output() reset = new EventEmitter();
  groupId: number;
  arrSizeGroup;
  constructor(private  sizeGroupsService: SizeGroupsService) {}

  ngOnInit(): void {
    this.getGroupSizes();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.getGroupSizes();
    if (this.model.group_id) {
      this.groupId = this.model.group_id;
    }
  }

  onPress = () => this.press.emit();
  onReset = () => this.reset.emit();

  selectGroup(groupId): void {
    this.model.group_id = groupId;
  }
  getGroupSizes(): void {
    this.sizeGroupsService.getListClient().subscribe(data => {
      this.arrSizeGroup = data.data;
      if (this.model) {
        this.groupId = this.arrSizeGroup[0].id;
      }
    });
  }
}
