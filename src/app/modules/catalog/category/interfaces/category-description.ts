import { ILanguage } from 'src/app/modules/localization/language/language.service';

export interface ICategoryDesc {
  id: number;
  category_id: number;
  lang_id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  lang?: ILanguage
}
