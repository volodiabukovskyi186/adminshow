import { Injectable } from "@angular/core";
import { IFormWithDescriptionService } from "../../catalog/attribyte/interfaces";
import { ISitePage, ISitePageDescription } from "./site-page.service";
import { ILanguage } from "../../localization/language/language.service";

@Injectable({
  providedIn: "root",
})
export class SitePageFormService
  implements IFormWithDescriptionService<ISitePage, ISitePageDescription> {
  model: ISitePage;
  host: string = null;

  initEmptyModel() {
    this.model = {
      created_at: null,
      descriptions: [],
      id: null,
      updated_at: null,
      status: 0,
      alias: null,
    };
  }

  initDescription(langs: ILanguage[], category: ISitePage = null) {
    let list: Array<ISitePageDescription> = [];

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

  initByModel(model: ISitePage, langs: ILanguage[]) {
    this.model = model;
    this.initDescription(langs, model);
  }

  getModelDescription(
    l: ILanguage,
    cd: ISitePageDescription = null
  ): ISitePageDescription {
    if (cd != null) {
      return {
        meta_description: cd.meta_description,
        meta_keywords: cd.meta_keywords,
        text: cd.text,
        description: cd.description,
        title: cd.title,
        page_id: this.model.id,
        created_at: cd.created_at,
        id: cd.id,
        lang_id: l.id,
        updated_at: cd.updated_at,
        lang: l,
      };
    }

    return {
      meta_description: null,
      meta_keywords: null,
      text: null,
      description: null,
      title: null,
      page_id: this.model.id,
      created_at: null,
      id: null,
      lang_id: l.id,
      updated_at: null,
      lang: l,
    };
  }

  getDescByLangId(id: number, model: ISitePage): ISitePageDescription {
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
