import { Component, OnInit, Input } from "@angular/core";
import { ICollection } from "../../services/collection.service";
import { ILanguage } from "src/app/modules/localization/language/language.service";
import { IImage } from "src/app/modules/gallery/folder/interfaces";
import { ImagesService } from "src/app/modules/gallery/images.service";

@Component({
  selector: "app-collection-form",
  templateUrl: "./collection-form.component.html",
  styleUrls: ["./collection-form.component.scss"],
})
export class CollectionFormComponent implements OnInit {
  @Input() model: ICollection;
  // @Input() langs: ILanguage[];
  @Input() title: string = "";
  @Input() host: string = null;
  onPress() {
    this.modalOpen = true;
  }
  onReset() {
    this.model.image_id = null;
    this.host = null;
    this.model.image = {
      src: "assets/icons/color-none-image.svg",
      src_mini: "assets/icons/color-none-image.svg",
    };
  }
  modalOpen: boolean = false;
  selectHandler = (data) => {
    let list: IImage[] = this.image.getSelected();

    if (list[0]) {
      const selectedImage: IImage = list[0];
      this.model.image_id = selectedImage.id;
      this.model.image.src = selectedImage.src;
      this.model.image.src_mini = selectedImage.src_mini;
      this.host = selectedImage.host;
      this.modalOpen = false;
    }
  };

  constructor(public image: ImagesService) {}
  ngOnInit(): void {
    this.image.select.subscribe(this.selectHandler);
  }
}
