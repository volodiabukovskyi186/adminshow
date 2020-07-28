import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { IProduct } from "../../../interfaces";
import { ILanguage } from "src/app/modules/localization/language/language.service";
import { ProductAttributesService } from "../../../services/product-attributes.service";
import { AttribyteService } from "src/app/modules/catalog/attribyte/services/attribyte.service";
import { IAttribyte } from "src/app/modules/catalog/attribyte/interfaces";
import { fadeScale } from "src/app/modules/ui/animations";

@Component({
  animations: [fadeScale],
  selector: "product-form-attributes",
  templateUrl: "./attributes.component.html",
  styleUrls: ["./attributes.component.scss"],
})
export class AttributesComponent implements OnInit {
  // @Input() model: IProduct;
  @Input() langs: ILanguage[];

  private _model: IProduct;
  @Output() modelChange = new EventEmitter();

  set model(val: IProduct) {
    this._model = val;
    this.modelChange.emit(this._model);
    this.getProdAttr();
    this.getAllAttr();
  }

  @Input() get model(): IProduct {
    return this._model;
  }

  constructor(
    public prodAttr: ProductAttributesService,
    public attr: AttribyteService
  ) {}

  ngOnInit(): void {}

  getAllAttr() {
    this.attr.getAll().subscribe(this.getAllAttrHandler);
  }
  getAllAttrHandler = (data) => {
    this.attr.all = data.data;
  };

  getProdAttr() {
    this.prodAttr.getByProdId(this.model.id).subscribe(this.getProdAttrHandler);
  }
  getProdAttrHandler = (data) => {
    this.prodAttr.list = data.data.attrybutes;
  };
  //

  getLang(langId: number): ILanguage {
    for (let i = 0; i < this.langs.length; i++) {
      const l = this.langs[i];
      if (l.id == langId) return l;
    }
    return null;
  }
  getAttr(attr: number, lang: number): IAttribyte {
    return this.attr.getAttr(attr, lang);
  }

  //
  formOpen: boolean = false;
  edit(item) {
    this.prodAttr.initModel(this.model.id, item);
    this.formOpen = true;
  }
  add() {
    this.prodAttr.initModel(this.model.id);
    this.formOpen = true;
  }
  save() {
    console.log("ADD/UPDATE", this.prodAttr.model);

    // THIS SHOULD NOT BE HERE ! ! !
    let c = this.prodAttr.model;

    let data = {
      lang_id: c.lang_id,
      attribyte_id: c.attribyte_id,
      product_id: this._model.id,
      text: c.text,
    };
    if (c.id != null) {
      this.prodAttr.put(data, c.id).subscribe(this.putHandler);
    } else {
      this.prodAttr.post(data).subscribe(this.postHandler);
    }
  }

  delete(item) {
    this.prodAttr.delete(item.id).subscribe((data) => {
      this.prodAttr.deleteProdAttr(item);
    });
  }

  postHandler = (data) => {
    this.prodAttr.list.push(data.data);
    this.formOpen = false;
  };

  putHandler = (data) => {
    this.formOpen = false;
  };
}
