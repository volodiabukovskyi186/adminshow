import { IParams } from './params';

export interface ISizeParamsResponse {
  count: number,
  data: Array<IParams>,
  skip: number,
  take: number,
  host: string
}