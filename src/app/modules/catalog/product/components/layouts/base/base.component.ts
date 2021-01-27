import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { IProduct } from "../../../interfaces";
import { IManufacturer } from "src/app/modules/manufacturer/manufacturer.service";
import { SizeGroupsService } from '../../../../../../pages/size-groups-page/services/size-groups-page.service';
import { RoleService } from 'src/app/core/auth/models/role.service';

@Component({
  selector: "product-form-base",
  templateUrl: "./base.component.html",
  styleUrls: ["./base.component.scss"],
})
export class BaseComponent implements OnInit, OnChanges {
  @Input() model: IProduct;
  @Input() manufacturers: IManufacturer[] = [];
  @Input() managerManufacturers;
  @Input() title: string = "";
  @Input() host: string;

  @Output() press = new EventEmitter();
  @Output() reset = new EventEmitter();

  public groupId: number;
  public arrSizeGroup: any;
  public userRole: number;
  public isOwnerManufacturers: boolean = false;
  public isManagerManufacturers: boolean = false;

  constructor(
    private sizeGroupsService: SizeGroupsService,
    public roleService: RoleService
  ) {}

  public ngOnInit(): void {
    this.getGroupSizes();
    this.getUserByToken();
  }

  public ngOnChanges(changes: SimpleChanges) {
    this.getGroupSizes();
    this.getUserByToken();

    if (this.model.size_group_id) {
      this.groupId = this.model.size_group_id;
    }

    // console.log('managerManufacturers', this.managerManufacturers);
    // console.log('Manufacturers', this.manufacturers);
  }

  public getUserByToken(): void {
    this.roleService.getByToken().subscribe(data => {
      this.userRole = data.data.role.id;

      if (this.userRole === 1) {
        //console.log('this.userRole OWNER', this.userRole);
        this.isOwnerManufacturers = true;
        this.isManagerManufacturers = false;
      } 
      if (this.userRole !== 1) {
        //console.log('this.userRole MANAGER', this.userRole);
        this.isManagerManufacturers = true;
        this.isOwnerManufacturers = false;
      }
    });
  }

  onPress = () => this.press.emit();
  onReset = () => this.reset.emit();

  selectGroup(groupId): void {
    this.model.size_group_id = groupId;
  }

  getGroupSizes(): void {
    this.sizeGroupsService.getListClient().subscribe(data => {
      this.arrSizeGroup = data.data;
      if (!this.model.size_group_id) {
        this.model.size_group_id = this.arrSizeGroup[0].id;
      }
    });
  }
}
