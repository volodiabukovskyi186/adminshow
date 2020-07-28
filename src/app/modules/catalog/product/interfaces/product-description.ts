import { ILanguage } from 'src/app/modules/localization/language/language.service';

export interface IProductDescription {
  id: number;
  product_id: number;
  lang_id: number;
  name: string;
  discription: string;
  meta_discription: string;
  meta_keywords: string;
  tag: string;
  created_at: string;
  updated_at: string;
  lang?: ILanguage;
}
