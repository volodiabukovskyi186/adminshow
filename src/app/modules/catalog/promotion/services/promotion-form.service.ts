import { Injectable } from "@angular/core";
import { IPromotion, IPromotionDescription } from "./promotion.service";
import { ILanguage } from "src/app/modules/localization/language/language.service";
import { IFormWithDescriptionService } from '../../attribyte/interfaces';

@Injectable({
  providedIn: "root",
})
export class PromotionFormService
  implements IFormWithDescriptionService<IPromotion, IPromotionDescription> {
  model: IPromotion;
  host: string = null;

  initEmptyModel() {
    this.model = {
      created_at: null,
      descriptions: [],
      id: null,
      updated_at: null,
      status: 0,
    };
  }

  initDescription(langs: ILanguage[], category: IPromotion = null) {
    let list: Array<IPromotionDescription> = [];

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

    console.log('this.model.descriptions PromFormService ==== >>>>', this.model.descriptions);
  }

  initByModel(model: IPromotion, langs: ILanguage[]) {
    this.model = model;
    this.initDescription(langs, model);
  }

  getModelDescription(
    l: ILanguage,
    cd: IPromotionDescription = null
  ): IPromotionDescription {
    if (cd != null) {
      return {
        data_end: cd.data_end,
        data_start: cd.data_start,
        description: cd.description,
        language: l,
        subtitle: cd.subtitle,
        title: cd.title,
        promotion_id: this.model.id,
        created_at: cd.created_at,
        id: cd.id,
        lang_id: l.id,
        updated_at: cd.updated_at,
        lang: l,
        image_id: 0,
        image: cd.image,
      };
    }

    return {
      data_end: null,
      data_start: null,
      description: null,
      language: l,
      subtitle: null,
      title: null,
      promotion_id: this.model.id,
      created_at: null,
      id: null,
      lang_id: l.id,
      updated_at: null,
      lang: l,
      image_id: 0,
      image: {
        src: "assets/icons/color-none-image.svg",
        src_mini: "assets/icons/color-none-image.svg",
      },
    };
  }

  getDescByLangId(id: number, model: IPromotion): IPromotionDescription {
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
