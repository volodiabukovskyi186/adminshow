import { IUser } from './user';

export interface IUserResponse {
  data: IUser[];
  host: string;
  count: number;
  skip: number;
  take: number;
}
