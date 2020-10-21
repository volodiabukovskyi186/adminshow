import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { ILanguage } from "src/app/modules/localization/language/language.service";
import { PagesService } from '../../pages.service';

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

  stausId:any;

  constructor(public pages: PagesService) { 
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.pages.panelButtonSettings.plus = false;
  
  }

  ngAfterViewInit() {}

  ngOnInit(): void {
    // console.log('order =>>>>>>>>>>>', this.order);
    
  }

  public modifyPrice(price: string): string {
    return Number(price).toFixed(2);
  }
  changeStatus(i):void{
     this.userOrders=i
     this.ordersStaus.emit(this.userOrders)
     console.log( this.order)
  }

}
