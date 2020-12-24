import {ILanguage} from '../../../localization/language/language.service';

export interface IProductOptionValue {
    option_value_id: number;
    option_id: number;
    product_id: number;
    product_option_id: number;
    quantity: null;
    subtract: null;
    price: number;
    price_prefix: null;
    points: null;
    points_prefix: null;
    weight: null;
    weight_prefix: null;
}
