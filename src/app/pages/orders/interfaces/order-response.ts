import { IOrder } from './order';

export interface IOrderResponse {
    data: Array<IOrder>;
    count: number;
    skip: number;
    take: number;
    host: string;
  }