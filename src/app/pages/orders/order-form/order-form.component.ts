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
  @Input() roleStatus
  @Output() ordersFormData = new EventEmitter<any>();
  @Output() ordersStaus = new EventEmitter<any>();

  public statusIte = [];
  public stausId: any;

  constructor(public pages: PagesService,
    private translate: TranslateService,
    public localizationService: LocalizationServicesService
  ){ 
    this.translate.onLangChange.subscribe((lang) => {
      this.getStatus();
    })
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.pages.panelButtonSettings.plus = false;
  }

  public ngAfterViewInit(): void {}

  public ngOnInit(): void {
    this.getStatus();
  }

  public getStatus(): void {
    this.localizationService.getOrderAllStatus().subscribe(data => {
      this.statusIte = data.data;
    })
  }

  public modifyPrice(price: string): string {
    return Number(price).toFixed(2);
  }

  public changeStatus(i): void {
    this.userOrders = i;
    this.ordersStaus.emit(this.userOrders);
  }
}
