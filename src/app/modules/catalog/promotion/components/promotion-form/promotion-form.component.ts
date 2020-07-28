import { Component, OnInit, Input } from "@angular/core";
import {
  IPromotion,
  IPromotionDescription,
} from "../../services/promotion.service";
import { IImage } from "src/app/modules/gallery/folder/interfaces";
import { ImagesService } from "src/app/modules/gallery/images.service";

@Component({
  selector: "app-promotion-form",
  templateUrl: "./promotion-form.component.html",
  styleUrls: ["./promotion-form.component.scss"],
})
export class PromotionFormComponent implements OnInit {
  @Input() model: IPromotion;
  // @Input() langs: ILanguage[];
  @Input() title: string = "";
  @Input() host: string = null;

  descEdit: IPromotionDescription = null;

  onPress(model: IPromotionDescription) {
    this.descEdit = model;
    this.modalOpen = true;
  }
  onReset(model: IPromotionDescription) {
    model.image_id = null;
    this.host = null;
    model.image = {
      src: "assets/icons/color-none-image.svg",
      src_mini: "assets/icons/color-none-image.svg",
    };
  }
  modalOpen: boolean = false;
  selectHandler = (data) => {
    let list: IImage[] = this.image.getSelected();
    if (list[0]) {
      const selectedImage: IImage = list[0];
      this.descEdit.image_id = selectedImage.id;
      this.descEdit.image.src = selectedImage.src;
      this.descEdit.image.src_mini = selectedImage.src_mini;
      this.host = selectedImage.host;
      this.modalOpen = false;
    }
  };

  constructor(public image: ImagesService) {}
  ngOnInit(): void {
    this.image.select.subscribe(this.selectHandler);
  }
}
