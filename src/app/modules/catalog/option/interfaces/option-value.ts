import { IImageSrc } from "src/app/modules/gallery";
import { IOptionValueDescription } from './option-value-description';

export interface IOptionValue {
  id: number;
  option_id: number;
  image_id: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
  image: IImageSrc;
  status: number;
  descriptions: IOptionValueDescription[];
}
