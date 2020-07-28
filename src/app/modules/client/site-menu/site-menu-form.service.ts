import { Injectable } from "@angular/core";
import { IFormWithDescriptionService } from "../../catalog/attribyte/interfaces";
import { ISiteMenu, ISiteMenuDescription } from "./site-menu.service";
import { ILanguage } from "../../localization/language/language.service";

@Injectable({
  providedIn: "root",
})
export class SiteMenuFormService
  implements IFormWithDescriptionService<ISiteMenu, ISiteMenuDescription> {
  model: ISiteMenu;
  host: string = null;

  initEmptyModel() {
    this.model = {
      created_at: null,
      descriptions: [],
      id: null,
      updated_at: null,
      status: 0,
      link: null,
      sort_order: 100,
      type: "main",
      parent_id: null,
    };
  }

  initDescription(langs: ILanguage[], category: ISiteMenu = null) {
    let list: Array<ISiteMenuDescription> = [];

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

    this.model.descriptions = list;
  }

  initByModel(model: ISiteMenu, langs: ILanguage[]) {
    this.model = model;
    this.initDescription(langs, model);
  }

  getModelDescription(
    l: ILanguage,
    cd: ISiteMenuDescription = null
  ): ISiteMenuDescription {
    if (cd != null) {
      return {
        title: cd.title,
        menu_id: this.model.id,
        created_at: cd.created_at,
        id: cd.id,
        lang_id: l.id,
        updated_at: cd.updated_at,
        lang: l,
      };
    }

    return {
      title: null,
      menu_id: this.model.id,
      created_at: null,
      id: null,
      lang_id: l.id,
      updated_at: null,
      lang: l,
    };
  }

  getDescByLangId(id: number, model: ISiteMenu): ISiteMenuDescription {
    for (let i = 0; i < model.descriptions.length; i++) {
      const d = model.descriptions[i];

      if (d.lang_id == id) return d;
    }
    return null;
  }

  constructor() {
    this.initEmptyModel();
  }
}
