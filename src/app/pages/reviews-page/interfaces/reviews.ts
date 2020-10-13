import { IComment } from './comments';
import { IProduct } from './product';

export interface IReview {
  id: number,
  product_id: number,
  user_id: number,
  author: string,
  text: string,
  rating: number,
  status: number,
  created_at: string,
  updated_at: string
  comments: Array<IComment>,
  product: IProduct
}
