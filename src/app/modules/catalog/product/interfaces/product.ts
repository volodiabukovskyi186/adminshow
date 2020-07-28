import { IImageSrc } from "src/app/modules/gallery";
import { IProductDescription } from "./product-description";

export interface IProduct {
  id: number;
  model: string;
  sku: string;
  upc: string;
  ean: string;
  jan: string;
  isbn: string;
  mpn: string;
  rating: number;
  location: string;
  quantity: number;
  stock_status_id: number;
  image_id: number;
  manufactured_id: number;
  shipping: number;
  price: number;
  point: number;
  tax_class_id: number;
  date_avaliable: string;
  weight: string;
  weight_class_id: number;
  lenght: string;
  width: string;
  height: string;
  lenght_class_id: number;
  subtract: number;
  minimum: number;
  sort_order: number;
  status: number;
  viewed: number;
  created_at: string;
  updated_at: string;
  host: string;

  image: IImageSrc;
  descriptions: IProductDescription[];
}
