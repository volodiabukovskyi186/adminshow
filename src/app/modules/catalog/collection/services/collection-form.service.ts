import { Injectable } from "@angular/core";
import { ICollection, ICollectionDescription } from "./collection.service";
import { IFormWithDescriptionService } from "../../attribyte/interfaces";
import { ILanguage } from "src/app/modules/localization/language/language.service";

@Injectable({
  providedIn: "root",
})
export class CollectionFormService
  implements IFormWithDescriptionService<ICollection, ICollectionDescription> {
  model: ICollection;
  host: string = null;

  initEmptyModel() {
    this.model = {
      created_at: null,
      descriptions: [],
      id: null,
      updated_at: null,
      status: 0,
      image_id: 0,
      image: {
        src: "assets/icons/color-none-image.svg",
        src_mini: "assets/icons/color-none-image.svg",
      },
    };
  }

  initDescription(langs: ILanguage[], category: ICollection = null) {
    let list: Array<ICollectionDescription> = [];

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

  initByModel(model: ICollection, langs: ILanguage[]) {
    this.model = model;
    this.initDescription(langs, model);
  }

  getModelDescription(
    l: ILanguage,
    cd: ICollectionDescription = null
  ): ICollectionDescription {
    if (cd != null) {
      return {
        description: cd.description,
        language: l,
        subtitle: cd.subtitle,
        title: cd.title,
        collection_id: this.model.id,
        created_at: cd.created_at,
        id: cd.id,
        lang_id: l.id,
        updated_at: cd.updated_at,
        lang: l,
      };
    }

    return {
      description: null,
      language: l,
      subtitle: null,
      title: null,
      collection_id: this.model.id,
      created_at: null,
      id: null,
      lang_id: l.id,
      updated_at: null,
      lang: l,
    };
  }

  getDescByLangId(id: number, model: ICollection): ICollectionDescription {
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
