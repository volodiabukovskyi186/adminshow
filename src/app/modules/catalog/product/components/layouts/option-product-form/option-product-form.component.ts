import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {OptionService} from '../../../../option/services/option.service';
import {IOption, IOptionValue} from '../../../../option/interfaces';
import {IProductOption} from '../../../interfaces/option-product.interface';
import {ProductOption} from '../../../model/productOption.model';
import {ProductOptionService} from '../../../services/product-option.service';
import {CategoryService} from '../../../../category/category.service';

@Component({
  selector: 'app-option-product-form',
  templateUrl: './option-product-form.component.html',
  styleUrls: ['./option-product-form.component.scss']
})
export class OptionProductFormComponent implements OnInit,OnChanges {
  @Input() model;

  public  optionSelect: number ;
  public  optionValue: number;
  public  optionPrice: number;
  public  change = false;

  public  arrOptions: Array<IOption>;
  public  arrOptionTabs ;

  constructor(private  optionService: OptionService,
              private  productOption: ProductOptionService,
              public category: CategoryService) {}

  ngOnInit(): void {
    this.getListOptions();
    this.getProductOption();
  }
  ngOnChanges(changes: SimpleChanges) {
      this.getProductOption()
  }

  getListOptions(): void {
    this.optionService.getOptions().subscribe(data => {
      this.arrOptions = data.data;
    });
  }
  getProductOption(): void {
      this.productOption.getOptionByProduct(this.model.id).subscribe(data => {
        this.arrOptionTabs = data.data;
        console.log('data=>', data);
      });
  }

  saveProductOption(optionId: number): void {
    const productOption: IProductOption = new ProductOption(optionId, this.model.id,'','' );
    this.productOption.createProductOption(productOption).subscribe(data => {

    });
  }

}
