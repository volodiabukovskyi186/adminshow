import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from '../../../interfaces';

@Component({
  selector: 'product-form-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  @Input() model: IProduct;
  constructor() { }

  ngOnInit(): void {
  }

}
