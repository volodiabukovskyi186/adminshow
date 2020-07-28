import { Injectable } from "@angular/core";
import { IFormWithDescriptionService } from "../../attribyte/interfaces";
import { IProduct, IProductDescription } from "../interfaces";
import { IImageSrc } from "src/app/modules/gallery";
import { ILanguage } from "src/app/modules/localization/language/language.service";

class Product implements IProduct {
  constructor() {}
  id: number;
  model: string = "";
  sku: string = "";
  upc: string = "";
  ean: string = "";
  jan: string = "";
  isbn: string = "";
  mpn: string = "";
  location: string = "";
  quantity: number = 1;
  stock_status_id: number = 1;
  image_id: number = null;
  manufactured_id: number = 1;
  shipping: number = 1;
  price: number = null;
  point: number = 0;
  tax_class_id: number = 1;
  date_avaliable: string = null;
  weight: string = "";
  weight_class_id: number = 1;
  lenght: string = "";
  width: string = "";
  height: string = "";
  lenght_class_id: number = 1;
  subtract: number = 1;
  minimum: number = 1;
  sort_order: number = 1;
  status: number = 0;
  viewed: number = 0;
  created_at: string;
  updated_at: string;
  host: string;
  rating: 0;
  image: IImageSrc = {
    src: "assets/icons/color-none-image.svg",
    src_mini: "assets/icons/color-none-image.svg",
  };
  descriptions: IProductDescription[] = [];
}

@Injectable({
  providedIn: "root",
})
export class ProductFormService
  implements IFormWithDescriptionService<IProduct, IProductDescription> {
  model: IProduct;
  host: string = null;

  initEmptyModel() {
    this.model = new Product();
  }

  initDescription(langs: ILanguage[], category: IProduct = null) {
    let list: Array<IProductDescription> = [];

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

  initByModel(model: IProduct, langs: ILanguage[]) {
    this.model = model;
    this.initDescription(langs, model);
  }

  getModelDescription(
    l: ILanguage,
    cd: IProductDescription = null
  ): IProductDescription {
    if (cd != null) {
      return {
        product_id: this.model.id,
        created_at: cd.created_at,
        id: cd.id,
        discription: cd.discription,
        tag: cd.tag,
        meta_discription: cd.meta_discription,
        meta_keywords: cd.meta_discription,
        lang_id: l.id,
        name: cd.name,
        updated_at: cd.updated_at,
        lang: l,
      };
    }

    return {
      product_id: this.model.id,
      discription: null,
      meta_discription: null,
      meta_keywords: null,
      tag: null,
      created_at: null,
      id: null,
      lang_id: l.id,
      name: "name" + l.id,
      updated_at: null,
      lang: l,
    };
  }

  getDescByLangId(id: number, model: IProduct): IProductDescription {
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
