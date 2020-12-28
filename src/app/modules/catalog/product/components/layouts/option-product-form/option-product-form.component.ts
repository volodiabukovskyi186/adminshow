import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {OptionService} from '../../../../option/services/option.service';
import {IOption, IOptionValue} from '../../../../option/interfaces';
import {IProductOption} from '../../../interfaces/option-product.interface';
import {ProductOption} from '../../../model/productOption.model';
import {ProductOptionService} from '../../../services/product-option.service';
import {CategoryService} from '../../../../category/category.service';

import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-option-product-form',
  templateUrl: './option-product-form.component.html',
  styleUrls: ['./option-product-form.component.scss']
})
export class OptionProductFormComponent implements OnInit, OnChanges {
  @Input() model;

  public  optionSelect: number ;
  public  optionValue: number;
  public  optionPrice: number;
  public  change = false;

  public  arrOptions: Array<IOption>;
  public  arrOptionTabs ;

  constructor(private  optionService: OptionService,
              private  productOption: ProductOptionService,
              public category: CategoryService,
              private  toastr: ToastrService) {}

  ngOnInit(): void {
    this.getProductOption();
  }
  ngOnChanges(changes: SimpleChanges) {
      this.getProductOption();
  }

  getListOptions(): void {
    this.optionService.getOptions().subscribe(data => {
        const arr1IdSet = new Set(this.arrOptionTabs.map(obj => obj.option_id));
        const arr2IdSet = new Set(data.data.map(obj => obj.id));
        this.arrOptions = [...this.arrOptionTabs, ...data.data].filter(obj => {
          const id = obj.id;
          return (arr1IdSet.has(id) || arr2IdSet.has(id)) && !(arr1IdSet.has(id) && arr2IdSet.has(id));
        });
        console.log(' this.arrOptions', this.arrOptions);
    });
  }
  getProductOption(): any {
      this.productOption.getOptionByProduct(this.model.id).subscribe(data => {
        this.arrOptionTabs = data.data;
        this.getListOptions();
        console.log('data=>', this.arrOptionTabs);
      });
  }

  saveProductOption(optionId: number): void {
    const productOption: IProductOption = new ProductOption(optionId, this.model.id,``,`` );
    this.productOption.createProductOption(productOption).subscribe(data => {
      this.getProductOption();
      this.toastr.success('Product option value  added');
    });
  }

}
