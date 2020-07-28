import { Component, OnInit, Input } from '@angular/core';
import { IProdAttr } from '../../../services/product-attributes.service';
import { ILanguage } from 'src/app/modules/localization/language/language.service';
import { IAttribyte } from 'src/app/modules/catalog/attribyte/interfaces';

@Component({
  selector: 'product-form-attibute-value',
  templateUrl: './attibute-value.component.html',
  styleUrls: ['./attibute-value.component.scss']
})
export class AttibuteValueComponent implements OnInit {
  @Input() langs: ILanguage[];
  @Input() model: IProdAttr;
  @Input() attributes: IAttribyte[];

  constructor() { }

  ngOnInit(): void {
  }

}
