import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { IOptionValue, IOptionValueDescription } from "../../interfaces";
import { ILanguage } from "src/app/modules/localization/language/language.service";
import { IImage } from "src/app/modules/gallery/folder/interfaces";
import { ImagesService } from "src/app/modules/gallery/images.service";


@Component({
 
  selector: "app-option-value-form",
  templateUrl: "./option-value-form.component.html",
  styleUrls: ["./option-value-form.component.scss"],
})
export class OptionValueFormComponent implements OnInit {
  @Input() model: IOptionValue;
  @Input() langs: ILanguage[];

  @Input() title: string = "";

  modalOpen: boolean = false;

  private _host: string;
  @Output() hostChange = new EventEmitter();
  
  set host(val: string) {
    this._host = val;
    this.hostChange.emit(this._host);
  }
  
  @Input() get host(): string {
    return this._host;
  }
  

  onPress() {
    this.modalOpen = true;
  }

  getCatDesc(langId: number): IOptionValueDescription {
    this.model.description.forEach((cd) => {
      if (cd.lang_id == langId) return cd;
    });
    return null;
  }

  ngOnInit(): void {
    this.image.select.subscribe(this.selectHandler);
  }

  onReset() {
    this.model.image_id = null;
    this.model.image = {
      src: "assets/icons/color-none-image.svg",
      src_mini: "assets/icons/color-none-image.svg",
    };
  }

  selectHandler = (data) => {
    let list: IImage[] = this.image.getSelected();

    if (list[0]) {
      const selectedImage: IImage = list[0];
      this.model.image_id = selectedImage.id;
      this.model.image.src = selectedImage.src;
      this.model.image.src_mini = selectedImage.src_mini;
      this.modalOpen = false;
    }
  };

  constructor(public image: ImagesService) {}

  @Output() formSubmit: EventEmitter<any> = new EventEmitter();

  onSubmit(data: any) {
    this.formSubmit.emit(data);
  }
}
