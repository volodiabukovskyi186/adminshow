import { Injectable } from "@angular/core";
import { IManufacturer, IManufacturerDesc } from "./manufacturer.service";
import { ILanguage } from "../localization/language/language.service";

@Injectable({
  providedIn: "root",
})
export class ManufacturerFormService {
  manufacturer: IManufacturer;

  initEmptyCategory() {
    this.manufacturer = {
      created_at: null,
      host: null,
      description: [],
      id: null,
      image_id: null,
      code: null,
      rating: 4,
      image: {
        src: "assets/icons/color-none-image.svg",
        src_mini: "assets/icons/color-none-image.svg",
      },
      status: 0,
      updated_at: null,
    };
  }

  initDesc(langs: ILanguage[], manufacturer: IManufacturer = null) {
    let list: IManufacturerDesc[] = [];

    langs.forEach((l) => {
      if (l.available) {
        if (manufacturer != null) {
          let descForEdit = this.getDescByLangId(l.id, manufacturer);

          if (descForEdit != null) {
            list.push(this.manDesc(l, descForEdit));
          } else {
            list.push(this.manDesc(l));
          }
        } else {
          list.push(this.manDesc(l));
        }
      }
    });

    this.manufacturer.description = list;
  }
  initBy(c: IManufacturer, langs: ILanguage[]) {
    this.manufacturer = c;
    this.initDesc(langs, c);
  }

  private manDesc(
    l: ILanguage,
    cd: IManufacturerDesc = null
  ): IManufacturerDesc {
    if (cd != null) {
      return {
        created_at: cd.created_at,
        description: cd.description,
        id: cd.id,
        lang_id: l.id,
        name: cd.name,
        updated_at: cd.updated_at,
        lang: l,
        manufactured_id: cd.manufactured_id,
        meta_description: cd.meta_description,
        meta_keywords: cd.meta_description,
      };
    }

    return {
      manufactured_id: this.manufacturer.id,
      created_at: null,
      description: "",
      id: null,
      lang_id: l.id,
      name: "name" + l.id,
      updated_at: null,
      lang: l,
      meta_description: null,
      meta_keywords: null,
    };
  }

  private getDescByLangId(id: number, c: IManufacturer): IManufacturerDesc {
    for (let i = 0; i < c.description.length; i++) {
      const d = c.description[i];

      if (d.lang_id == id) return d;
    }
    return null;
  }

  constructor() {
    this.initEmptyCategory();
  }
}
