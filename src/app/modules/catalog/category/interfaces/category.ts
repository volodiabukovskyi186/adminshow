import { IImageSrc } from "src/app/modules/gallery";
import { ICategoryDesc } from ".";

export interface ICategory {
  id: number;
  parent_id: number;
  image_id: number;
  sort_order: number;
  status: number;
  created_at: string;
  updated_at: string;
  host: string;
  image: IImageSrc;
  description: Array<ICategoryDesc>;
  parents?: Array<{ id: number; name: string; parent_id: number }>;
  title?: string;
}
