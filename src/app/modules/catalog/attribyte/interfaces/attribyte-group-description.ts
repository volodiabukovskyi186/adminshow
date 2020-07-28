import { ILanguage } from 'src/app/modules/localization/language/language.service';

export interface IAttribyteGroupDescription {
  id: number;
  attribyte_group_id: number;
  lang_id: number;
  lang?: ILanguage
  name: string;
  created_at: string;
  updated_at: string;
}
