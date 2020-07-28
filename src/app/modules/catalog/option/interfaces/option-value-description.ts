import { ILanguage } from 'src/app/modules/localization/language/language.service';

export interface IOptionValueDescription {
  id: number;
  option_value_id: number;
  lang_id: number;
  sort_order: number;
  name: string;
  created_at: string;
  updated_at: string;
  lang: ILanguage;
}
