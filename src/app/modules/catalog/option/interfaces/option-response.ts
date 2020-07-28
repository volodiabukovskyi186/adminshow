import { IOption } from './option';

export interface IOptionResponse {
  count: number;
  data: Array<IOption>;
  skip: number;
  take: number;
}
