import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { ILanguage } from "src/app/modules/localization/language/language.service";
import { PagesService } from '../../pages.service';
import { TranslateService } from '@ngx-translate/core';
import { LocalizationServicesService } from '../../localization/services/localization-services.service';


@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() order;
  @Input() status;
  @Input() langs: ILanguage[];
  @Input() userOrders;
  @Output() ordersFormData = new EventEmitter<any>();
  @Output() ordersStaus = new EventEmitter<any>();
  statusIte=[];
  stausId:any;

  constructor(public pages: PagesService,
    private translate: TranslateService,
    public localizationService: LocalizationServicesService,) { 
      this.translate.onLangChange.subscribe(lang => {
        this. getStatus();
     })
  }
  ngOnChanges(changes: SimpleChanges): void {

    this.pages.panelButtonSettings.plus = false;
  
  }

  ngAfterViewInit() {}

  ngOnInit(): void {
    // console.log('order =>>>>>>>>>>>', this.order);
    this.getStatus()
    
  }
  getStatus(): void {
    // this.translate.onLangChange.subscribe(lang => {
   
    this.localizationService.getOrderAllStatus().subscribe(
        data => {
        this.statusIte = data.data;
        console.log('orderStatus===>',this.statusIte)
    })
  // })
  }

  public modifyPrice(price: string): string {
    return Number(price).toFixed(2);
  }
  changeStatus(i):void{
     this.userOrders=i
     this.ordersStaus.emit(this.userOrders)
    
  }

}
