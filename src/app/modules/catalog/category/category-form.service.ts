import { Injectable } from "@angular/core";
import { ICategory, ICategoryDesc } from "./interfaces";
import { ILanguage } from "../../localization/language/language.service";

@Injectable({
  providedIn: "root",
})
export class CategoryFormService {
  category: ICategory;

  initEmptyCategory() {
    this.category = {
      created_at: null,
      host: null,
      description: [],
      id: null,
      image_id: null,
      parent_id: null,
      sort_order: 100,
      image: {
        src: "assets/icons/color-none-image.svg",
        src_mini: "assets/icons/color-none-image.svg",
      },
      status: 0,
      updated_at: null,
    };
  }

  initDesc(langs: ILanguage[], category: ICategory = null) {
    let list: ICategoryDesc[] = [];

    langs.forEach((l) => {
      if (l.available) {
        if (category != null) {
          let descForEdit = this.getDescByLangId(l.id, category);

          if (descForEdit != null) {
            list.push(this.catDesc(l, descForEdit));
          } else {
            list.push(this.catDesc(l));
          }
        } else {
          list.push(this.catDesc(l));
        }
      }
    });

    this.category.description = list;
  }

  initBy(c: ICategory, langs: ILanguage[]) {
    this.category = c;
    this.initDesc(langs, c);
  }

  private catDesc(l: ILanguage, cd: ICategoryDesc = null) {
    if (cd != null) {
      return {
        category_id: this.category.id,
        created_at: cd.created_at,
        description: cd.description,
        id: cd.id,
        lang_id: l.id,
        name: cd.name,
        updated_at: cd.updated_at,
        lang: l,
      };
    }

    return {
      category_id: this.category.id,
      created_at: null,
      description: "",
      id: null,
      lang_id: l.id,
      name: "name" + l.id,
      updated_at: null,
      lang: l,
    };
  }

  private getDescByLangId(id: number, c: any): ICategoryDesc {
    for (let i = 0; i < c.length; i++) {
      const d = c[i];

      if (d.lang_id == id) return d;
    }
    return null;
  }

  constructor() {
    this.initEmptyCategory();
  }
}
