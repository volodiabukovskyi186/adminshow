import { ICategory } from '.';

export interface ICategoryResponse {
    data: Array<ICategory>;
    count: number;
    skip: number;
    take: number;
    host: string;
  }