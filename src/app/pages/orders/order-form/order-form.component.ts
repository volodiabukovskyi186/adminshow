import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ILanguage } from "src/app/modules/localization/language/language.service";

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  @Input() order;
  @Input() langs: ILanguage[];

  @Output() ordersFormData = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
