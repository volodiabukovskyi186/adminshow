import { IProduct } from './product';

export interface IProductResponse {
  count: number;
  data: Array<IProduct>;
  skip: number;
  take: number;
  host: string;
}
