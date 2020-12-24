import {IProductOption} from '../interfaces/option-product.interface';

export class ProductOption implements IProductOption {
    constructor(
        public option_id: number ,
        public product_id: number ,
        public option_value: string ,
        public reqyired: string
      )
    { }
}
