export interface IResponseDataPagination<T> {
  count: number;
  data: Array<T>;
  take: number;
  skip: number;
}
