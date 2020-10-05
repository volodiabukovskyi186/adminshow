import { ICurrency } from './currency';

export interface ICurrencyResponse {
  data: Array<ICurrency>;
  count: number;
  skip: number;
  take: number;
  host: string;
}
