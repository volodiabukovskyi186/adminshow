import { Component, OnInit, Input } from '@angular/core';
import { IManufacturer } from '../manufacturer.service';
import { ILanguage } from '../../localization/language/language.service';
import { IImage } from '../../gallery/folder/interfaces';
import { ImagesService } from '../../gallery/images.service';

@Component({
  selector: 'app-manufacturer-form',
  templateUrl: './manufacturer-form.component.html',
  styleUrls: ['./manufacturer-form.component.scss']
})
export class ManufacturerFormComponent implements OnInit {

  @Input() manufacturer: IManufacturer;
  @Input() langs: ILanguage[];

  @Input() title: string = "";

  ngOnInit(): void {
    this.image.select.subscribe(this.selectHandler);
  }

  onReset() {
    this.manufacturer.image_id = null;
    this.manufacturer.host = null;
    this.manufacturer.image = {
      src: "assets/icons/color-none-image.svg",
      src_mini: "assets/icons/color-none-image.svg",
    };
  }

  selectHandler = (data) => {
    let list: IImage[] = this.image.getSelected();

    if (list[0]) {
      const selectedImage: IImage = list[0];
      this.manufacturer.image_id = selectedImage.id;
      this.manufacturer.image.src = selectedImage.src;
      this.manufacturer.image.src_mini = selectedImage.src_mini;
      this.manufacturer.host = selectedImage.host;
      this.modalOpen = false;
    }
  };

  constructor(public image: ImagesService) {}

  modalOpen: boolean = false;

  onPress() {
    this.modalOpen = true;
  }

}
