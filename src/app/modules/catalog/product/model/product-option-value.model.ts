import {IProductOptionValue} from '../interfaces/product-option-value.interface';

export  class ProductValueOption implements IProductOptionValue {
    constructor(
        public option_value_id: number,
        public  option_id: number,
        public  product_id: number,
        public  product_option_id: number,
        public  quantity: null,
        public  subtract: null,
        public  price: number,
        public  price_prefix: null,
        public  points: null,
        public   points_prefix: null,
        public   weight: null,
        public   weight_prefix: null
) {}
}
