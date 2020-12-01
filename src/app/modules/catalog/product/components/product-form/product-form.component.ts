import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ILanguage } from "src/app/modules/localization/language/language.service";
import { IProduct, IProductDescription } from "../../interfaces";
import { ImagesService } from "src/app/modules/gallery/images.service";
import { IManufacturer } from "src/app/modules/manufacturer/manufacturer.service";
import { IImage } from "src/app/modules/gallery/folder/interfaces";
const C10 = { name: "Blue 10", hex: "#C0E6FF" };
const COLORS = [
  C10,
  { name: "Blue 20", hex: "#7CC7FF" },
  { name: "Blue 30", hex: "#5AAAFA", disabled: true },
  { name: "Blue 40", hex: "#5596E6" },
];

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.scss"],
})
export class ProductFormComponent implements OnInit {
  @Input() model: IProduct;
  @Input() manufacturers: IManufacturer[] = [];
  @Input() langs: ILanguage[];
  @Input() host: string;
  @Input() title: string = "";

  @Output() formSubmit: EventEmitter<any> = new EventEmitter();

  public modalOpen: boolean = false;

  constructor(public image: ImagesService) {}

  onPress() {
    this.modalOpen = true;
  }

  getCatDesc(langId: number): IProductDescription {
    this.model.descriptions.forEach((cd) => {
      if (cd.lang_id == langId) return cd;
    });
    return null;
  }

  public ngOnInit(): void {
    this.image.select.subscribe(this.selectHandler);
  }

  public onReset(): void {
    this.model.image_id = null;
    this.host = null;
    this.model.image.src = "assets/icons/color-none-image.svg";
    this.model.image.src_mini = "assets/icons/color-none-image.svg";
  }

  selectHandler = (data) => {
    let list: IImage[] = this.image.getSelected();

    if (list[0]) {
      const selectedImage: IImage = list[0];
      this.host = selectedImage.host;
      this.model.image_id = selectedImage.id;
      this.model.image.src = selectedImage.src;
      this.model.image.src_mini = selectedImage.src_mini;
      this.modalOpen = false;
    }
  };

  public onSubmit(data: any) {
    this.formSubmit.emit(data);
  }
}
