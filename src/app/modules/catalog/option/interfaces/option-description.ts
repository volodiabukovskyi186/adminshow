import { ILanguage } from 'src/app/modules/localization/language/language.service';

export interface IOptionDescription {
  id: number;
  option_id: number;
  lang_id: number;
  name: string;
  created_at: string;
  updated_at: string;
  lang?: ILanguage;

}
