import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from '../../../interfaces';

@Component({
  selector: 'product-form-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.scss']
})
export class CodesComponent implements OnInit {
  @Input() model: IProduct;
  constructor() { }

  ngOnInit(): void {
  }

}
