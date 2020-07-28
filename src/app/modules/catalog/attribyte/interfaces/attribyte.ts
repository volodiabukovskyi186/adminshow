import { IAttribyteDescription } from "./attribyte-description";

export interface IAttribyte {
  id: number;
  group_id: number;
  group?: {
    id: number;
    name: string;
  };
  sort_order: number;
  created_at: string;
  updated_at: string;
  status: number;
  description: Array<IAttribyteDescription>;
}
