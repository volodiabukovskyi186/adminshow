import { IReview } from './reviews';

export interface IReviewsResponse {
  data: Array<IReview>;
  host: string;
  count: number;
  skip: number;
  take: number;
}