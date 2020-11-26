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
  public allManufacturers;
  public allClients;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public ordersSearchClientsData: any;
  public isSelectedClient: boolean = false;
  public selectedClientId: number;
  public allStatus:Array<any>;
  constructor(
    public manufacturerService: ManufacturerService,
    public orderService: OrderService,
    public localizationService: LocalizationServicesService,
    public user:UserService
  ) { }

  public ngOnInit(): void {
    this.generateOrderFiltersForm();
    this.getEditOrderFiltersFormFormData();
    this.getManufactures();
    this.getStatus();
    this.getManager()
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
      status: new FormControl('', [])
    })
  }
  getManager() {
    // this.ngxService.start();
    this.user.getList().subscribe(data=>{
      console.log('maneger==>',data)
    });
  }


  getStatus(): void {
    // this.translate.onLangChange.subscribe(lang => {
    this.localizationService.getOrderAllStatus().subscribe(data => {
        this.allStatus = data.data;
        console.log('orderStatus===>',this.allStatus);
    })
  // })
  }

  public getEditOrderFiltersFormFormData(): void {
    // this.orderFiltersForm.valueChanges
    // .subscribe(() => this.orderFiltersFormData.emit({ 
    //   date_start: this.orderFiltersForm.value.date_start,
    //   date_end: this.orderFiltersForm.value.date_end,
    //   manufacturer: this.orderFiltersForm.value.manufacturer,
    //   client: this.orderFiltersForm.value.client
    // }));
  }

  public getManufactures(): void {
    this.manufacturerService.getAllManufactures().pipe(takeUntil(this.destroy$))
    .subscribe((res) => {
      this.allManufacturers = res.data;
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
    console.log('block==>',status)

    this.orderService.filterOrders(
      this.orderFiltersForm.value.date_start,
      this.orderFiltersForm.value.date_end,
      manufacturers,
      status,
      this.selectedClientId
    ).subscribe((res) => {
      this.orderFiltersFormData.emit(res);
    })
  }

  public searchClient(): void {
    console.log(this.orderFiltersForm.value.client);
    this.isSelectedClient = true;
    const user=this.orderFiltersForm.value.client
    
    this.orderService.searchClient(this.orderFiltersForm.value.client).subscribe((res) => {
    
      this.ordersSearchClientsData = res.data;
      if (res.count > 0){
        this.selectedClientId = this.ordersSearchClientsData[0].id
        console.log('good',res);
      }
      else{
        console.log('bad',res);
      }
     
    })
  }

  public selectedClient(seletedClient): void {
    
    this.selectedClientId = seletedClient.id;
    console.log('userid++++>',this.selectedClientId)
    console.log('userid++++>',seletedClient)
    this.orderFiltersForm.get('client').setValue(`${seletedClient.first_name} ${seletedClient.last_name}`);

    if (seletedClient) {
      this.isSelectedClient = false;
    }

  }

}
