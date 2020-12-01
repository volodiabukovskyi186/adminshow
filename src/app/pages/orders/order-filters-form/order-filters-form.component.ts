import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ManufacturerService } from '../../../modules/manufacturer/manufacturer.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OrderService } from '../services/order.service';
import { LocalizationServicesService } from '../../localization/services/localization-services.service';
import { UserService } from 'src/app/modules/user/user.service';

@Component({
  selector: 'app-order-filters-form',
  templateUrl: './order-filters-form.component.html',
  styleUrls: ['./order-filters-form.component.scss']
})
export class OrderFiltersFormComponent implements OnInit, OnDestroy {
  @Output() orderFiltersFormData = new EventEmitter();

  public orderFiltersForm: FormGroup;
  public allManufacturersManager: any;
  public allManufacturersOwner: any;
  public allClients;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public ordersSearchClientsData: any;
  public isSelectedClient: boolean = false;
  public selectedClientId: number;
  public allStatus: Array<any>;
  public allManagers: any;
  public currentUserRoleId: number;

  public isManufacturersManager: boolean = false;
  public isManufacturersOwner: boolean = false;

  constructor(
    public manufacturerService: ManufacturerService,
    public orderService: OrderService,
    public localizationService: LocalizationServicesService,
    public user: UserService
  ){
    this.getUserRoleId();
  }

  public ngOnInit(): void {
    this.generateOrderFiltersForm();
    this.getEditOrderFiltersFormFormData();

    this.getManufactures();
    this.getStatus();
    this.getManager();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public generateOrderFiltersForm(): void {
    this.orderFiltersForm = new FormGroup({
      date_start: new FormControl('', []),
      date_end: new FormControl('', []),
      manufacturer: new FormControl('', []),
      client: new FormControl('', []),
      status: new FormControl('', []),
      manager: new FormControl('', [])
    })
  }

  public getManager(): void {
    // this.ngxService.start();
    this.user.getManagers().subscribe((res) => {
      this.allManagers = res.data;
    });
  }


  public getStatus(): void {
    // this.translate.onLangChange.subscribe(lang => {
    this.localizationService.getOrderAllStatus().subscribe(data => {
      this.allStatus = data.data;
    })
  // })
  }

  public getEditOrderFiltersFormFormData(): void {}

  public getUserRoleId(): void {
    this.user.getByToken().subscribe((res) => {
      this.currentUserRoleId = res.data.user.role_id;
    });
  }
  
  public getManufactures(): void {
    this.manufacturerService.getManufacturersByRoleId().pipe(takeUntil(this.destroy$))
    .subscribe((res) => {
      if (this.currentUserRoleId !== 1) {
        this.isManufacturersManager = true;
        this.allManufacturersManager = res?.data?.manufacturers;
      }

      if (this.currentUserRoleId === 1) {
        this.isManufacturersOwner = true;
        this.allManufacturersOwner = res?.data;
      }

    })
  }

  get formAuthControls(): any {
    return this.orderFiltersForm['controls'];
  }

  public filterClientOrders(): void {
    let manufacturers = [];
    let status = [];

    if (this.orderFiltersForm.value.status) {
      status.push(this.orderFiltersForm.value.status);
    }

    if (this.orderFiltersForm.value.manufacturer) {
      manufacturers.push(this.orderFiltersForm.value.manufacturer);
    }

    this.orderService.filterOrders(
      this.orderFiltersForm.value.date_start,
      this.orderFiltersForm.value.date_end,
      manufacturers,
      status,
      this.orderFiltersForm.value.manager,
      this.selectedClientId
    ).subscribe((res) => {
      this.orderFiltersFormData.emit(res);
    })
  }

  public searchClient(): void {
    this.isSelectedClient = true;
    
    this.orderService.searchClient(this.orderFiltersForm.value.client).subscribe((res) => {
    
      this.ordersSearchClientsData = res.data;
      if (res.count > 0) {
        this.selectedClientId = this.ordersSearchClientsData[0].id;
      } 
    })
  }

  public selectedClient(seletedClient): void {
    this.selectedClientId = seletedClient.id;
    this.orderFiltersForm.get('client').setValue(`${seletedClient.first_name} ${seletedClient.last_name}`);

    if (seletedClient) {
      this.isSelectedClient = false;
    }
  }
}
