import { IOptionDescription } from './option-description';

export interface IOption {
  id: number;
  type: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
  status: number;
  description: Array<IOptionDescription>;
}
