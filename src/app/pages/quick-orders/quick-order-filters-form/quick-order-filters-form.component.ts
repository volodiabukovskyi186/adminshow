import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { OrderService } from '../../../pages/orders/services/order.service';
import { UserService } from 'src/app/modules/user/user.service';
import { ManufacturerService } from '../../../modules/manufacturer/manufacturer.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LocalizationServicesService } from '../../localization/services/localization-services.service';

@Component({
  selector: 'app-quick-order-filters-form',
  templateUrl: './quick-order-filters-form.component.html',
  styleUrls: ['./quick-order-filters-form.component.scss']
})
export class QuickOrderFiltersFormComponent implements OnInit {
  @Output() quickOrderFiltersFormData: EventEmitter<any> = new EventEmitter();

  public quickOrderFiltersForm: FormGroup;
  public currentUserRoleId: number;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public isManufacturersManager: boolean = false;
  public isManufacturersOwner: boolean = false;
  public allManufacturers: any;
  public allManagers;
  public allStatus;
  public isSelectedClient: boolean = false;
  public ordersSearchClientsData: any;
  public selectedClientId: number;

  public allManufacturersManager: any;
  public allManufacturersOwner: any;

  constructor(
    public orderService: OrderService,
    public userService: UserService,
    public manufacturerService: ManufacturerService,
    public localizationService: LocalizationServicesService
  ) { }

  public ngOnInit(): void {
    this.generateQuickOrderFiltersForm();
    this.getManufactures();
    this.getStatus();
    this.getManager();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public generateQuickOrderFiltersForm(): void {
    this.quickOrderFiltersForm = new FormGroup({
      date_start: new FormControl('', []),
      date_end: new FormControl('', []),
      manufacturer: new FormControl('', []),
      client: new FormControl('', []),
      manager: new FormControl('', []),
      status: new FormControl('', [])
    })
  }

  public getManufactures(): void {
    this.manufacturerService.getManufacturersByRoleId().pipe(takeUntil(this.destroy$))
    .subscribe((res) => {
      console.log(res)
      this.allManufacturers = res.data;
    })
  }

  public getManager(): void {
    this.userService.getManagers().subscribe((res) => {
      this.allManagers = res.data;
    });
  }


  public getStatus(): void {
    this.localizationService.getOrderAllStatus().subscribe(data => {
      this.allStatus = data.data;
    })
  }

  public searchClient(): void {
    this.isSelectedClient = true;
    
    this.orderService.searchClient(this.quickOrderFiltersForm.value.client).subscribe((res) => {
      console.log(res);
    
      this.ordersSearchClientsData = res.data;
      if (res.count > 0) {
        this.selectedClientId = this.ordersSearchClientsData[0].id;
      } 
    })
  }

  public selectedClient(seletedClient): void {
    this.selectedClientId = seletedClient.id;
    console.log(this.selectedClientId);

    this.quickOrderFiltersForm.get('client').setValue(`${seletedClient.first_name} ${seletedClient.last_name}`);

    if (seletedClient) {
      this.isSelectedClient = false;
    }
  }


  public filterClientOrders(): void {
    let manufacturers = [];
    let status = [];
    let isOneClickQuickOrder = 1;

    if (this.quickOrderFiltersForm.value.status) {
      status.push(this.quickOrderFiltersForm.value.status);
    }

    if (this.quickOrderFiltersForm.value.manufacturer) {
      manufacturers.push(this.quickOrderFiltersForm.value.manufacturer);
    }

    this.userService.getByToken().subscribe((res) => {
      this.currentUserRoleId = res.data.user.role_id;

      console.log(this.selectedClientId);

      this.orderService.filterQuickOrders(
        this.currentUserRoleId,
        this.quickOrderFiltersForm.value.date_start,
        this.quickOrderFiltersForm.value.date_end,
        manufacturers,
        status,
        this.quickOrderFiltersForm.value.manager,
        this.selectedClientId,
        isOneClickQuickOrder
      ).subscribe((res) => {
        this.quickOrderFiltersFormData.emit(res);
      })
    });
  }

}
