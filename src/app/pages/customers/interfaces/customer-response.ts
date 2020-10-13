import { ICustomer } from './customer';

export interface ICustomerResponse {
  data: Array<ICustomer>;
  count: number;
  skip: number;
  take: number;
  host: string;
}
