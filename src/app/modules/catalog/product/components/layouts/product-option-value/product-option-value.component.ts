import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ProductOptionService} from '../../../services/product-option.service';
import {OptionService} from '../../../../option/services/option.service';
import {IOptionValue} from '../../../../option/interfaces';
import {IProductOptionValue} from '../../../interfaces/product-option-value.interface';
import {ProductValueOption} from '../../../model/product-option-value.model';

@Component({
    selector: 'app-product-option-value',
    templateUrl: './product-option-value.component.html',
    styleUrls: ['./product-option-value.component.scss']
})
export class ProductOptionValueComponent implements OnInit, OnChanges {
    @Input() optionValue;
    @Input() product;
    @Input() optionSelect;


    public optionSelectVal: IOptionValue;
    public optionPrice: number;
    public arrOptionValues: Array<IOptionValue>;
    public arrProductOptionValues = [];

    constructor(private  optionService: OptionService,
                private  productOption: ProductOptionService,
                ) {
    }

    ngOnInit(): void {
        this.getOptionValue();
        this.getProductOptionValues();
    }

    ngOnChanges(changes: SimpleChanges) {

    }
    getOptionValue(): void {
        this.optionService.getSelectedOptionValue(this.optionValue.option_id).subscribe(data => {
            this.arrOptionValues = data.data;
            console.log('optios-product==>', this.arrOptionValues);
        });
    }
    getProductOptionValues(): void {
        this.productOption.getProductOptionValues(this.product.id, this.optionValue.option_id).subscribe(data => {
            this.arrProductOptionValues = data.data;
            console.log('arrProductOptionValues==>', this.arrProductOptionValues);
        });
    }
    saveProductOptionValue(): void {
        const newOptionValue: IProductOptionValue = new ProductValueOption(
            this.optionSelectVal.id,
            this.optionValue.option_id,
            this.product.id,
            this.optionValue.id,
            null,
            null,
            this.optionPrice,
            null,
            null,
            null,
            null,
            null);
        this.productOption.createProductOptionValue(newOptionValue).subscribe(data => {

        });
        console.log('newOptionValue===>', newOptionValue);
    }

}
