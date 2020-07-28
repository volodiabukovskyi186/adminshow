import { Injectable } from "@angular/core";
import {
  IOptionValue,
  IOptionValueDescription,
  IFormWithDescriptionService,
} from "../interfaces";
import { ILanguage } from "src/app/modules/localization/language/language.service";

@Injectable({
  providedIn: "root",
})
export class OptionValueFormService
  implements
    IFormWithDescriptionService<IOptionValue, IOptionValueDescription> {
  model: IOptionValue;

  initEmptyModel() {
    this.model = {
      option_id: null,
      image: {
        src: "assets/icons/color-none-image.svg",
        src_mini: "assets/icons/color-none-image.svg",
      },
      image_id: null,
      created_at: null,
      description: [],
      id: null,
      status: 0,
      sort_order: 100,
      updated_at: null,
    };
  }

  initDescription(langs: ILanguage[], category: IOptionValue = null) {
    let list: Array<IOptionValueDescription> = [];

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

  initByModel(model: IOptionValue, langs: ILanguage[]) {
    this.model = model;
    this.initDescription(langs, model);
  }

  getModelDescription(
    l: ILanguage,
    cd: IOptionValueDescription = null
  ): IOptionValueDescription {
    if (cd != null) {
      return {
        sort_order: this.model.sort_order,
        option_value_id: this.model.id,
        created_at: cd.created_at,
        id: cd.id,
        lang_id: l.id,
        name: cd.name,
        updated_at: cd.updated_at,
        lang: l,
      };
    }

    return {
      sort_order: this.model.sort_order,
      option_value_id: this.model.id,
      created_at: null,
      id: null,
      lang_id: l.id,
      name: "name" + l.id,
      updated_at: null,
      lang: l,
    };
  }

  getDescByLangId(id: number, model: IOptionValue): IOptionValueDescription {
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
