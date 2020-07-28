import { Injectable } from "@angular/core";
import {
  IOption,
  IOptionDescription,
  IFormWithDescriptionService,
} from "../interfaces";
import { ILanguage } from "src/app/modules/localization/language/language.service";

@Injectable({
  providedIn: "root",
})
export class OptionFormService
  implements IFormWithDescriptionService<IOption, IOptionDescription> {
  model: IOption;

  initEmptyModel() {
    this.model = {
      type: "select",
      created_at: null,
      description: [],
      id: null,
      status: 0,
      sort_order: 100,
      updated_at: null,
    };
  }

  initDescription(langs: ILanguage[], category: IOption = null) {
    let list: Array<IOptionDescription> = [];

    langs.forEach((l) => {
      if (l.available) {
        if (category != null) {
          let descForEdit = this.getDescByLangId(l.id, category);

          if (descForEdit != null) {
            list.push(this.getModelDescription(l, descForEdit));
          } else {
            list.push(this.getModelDescription(l));
          }
        } else {
          list.push(this.getModelDescription(l));
        }
      }
    });

    this.model.description = list;
  }

  initByModel(model: IOption, langs: ILanguage[]) {
    this.model = model;
    this.initDescription(langs, model);
  }

  getModelDescription(
    l: ILanguage,
    cd: IOptionDescription = null
  ): IOptionDescription {
    if (cd != null) {
      return {
        option_id: this.model.id,
        created_at: cd.created_at,
        id: cd.id,
        lang_id: l.id,
        name: cd.name,
        updated_at: cd.updated_at,
        lang: l,
      };
    }

    return {
      option_id: this.model.id,
      created_at: null,
      id: null,
      lang_id: l.id,
      name: "name" + l.id,
      updated_at: null,
      lang: l,
    };
  }

  getDescByLangId(id: number, model: IOption): IOptionDescription {
    for (let i = 0; i < model.description.length; i++) {
      const d = model.description[i];

      if (d.lang_id == id) return d;
    }
    return null;
  }

  constructor() {
    this.initEmptyModel();
  }
}
