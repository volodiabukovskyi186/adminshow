import { IAttribyteGroupDescription } from './attribyte-group-description';

export interface IAttribyteGroup {
  id: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
  status: number;
  description: Array<IAttribyteGroupDescription>;
}
