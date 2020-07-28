import { Injectable } from "@angular/core";
import { ILanguage } from "src/app/modules/localization/language/language.service";
import {
  IFormWithDescriptionService,
  IAttribyte,
  IAttribyteDescription,
} from "../interfaces";

@Injectable({
  providedIn: "root",
})
export class AttribyteFormService
  implements IFormWithDescriptionService<IAttribyte, IAttribyteDescription> {
  model: IAttribyte;

  initEmptyModel() {
    this.model = {
      created_at: null,
      group_id: 0,
      description: [],
      id: null,
      status: 0,
      sort_order: 100,
      updated_at: null,
    };
  }

  initDescription(langs: ILanguage[], category: IAttribyte = null) {
    let list: Array<IAttribyteDescription> = [];

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

  initByModel(model: IAttribyte, langs: ILanguage[]) {
    this.model = model;
    this.initDescription(langs, model);
  }

  getModelDescription(
    l: ILanguage,
    cd: IAttribyteDescription = null
  ): IAttribyteDescription {
    if (cd != null) {
      return {
        attribyte_id: this.model.id,
        created_at: cd.created_at,
        id: cd.id,
        lang_id: l.id,
        name: cd.name,
        updated_at: cd.updated_at,
        lang: l,
      };
    }

    return {
      attribyte_id: this.model.id,
      created_at: null,
      id: null,
      lang_id: l.id,
      name: "name" + l.id,
      updated_at: null,
      lang: l,
    };
  }

  getDescByLangId(id: number, model: IAttribyte): IAttribyteDescription {
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
