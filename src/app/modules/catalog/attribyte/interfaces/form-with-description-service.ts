import { ILanguage } from "src/app/modules/localization/language/language.service";

export interface IFormWithDescriptionService<TModel, TModelDescription> {
  initEmptyModel(): void;
  initByModel(model: TModel, langs: ILanguage[]): void;
  initDescription(langs: ILanguage[], model: TModel): void;
  getModelDescription(
    l: ILanguage,
    model: TModelDescription
  ): TModelDescription;
  getDescByLangId(langId: number, model: TModel): TModelDescription;
}

