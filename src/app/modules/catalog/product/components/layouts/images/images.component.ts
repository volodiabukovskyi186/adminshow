import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { IProduct } from "../../../interfaces";
import { IImage } from "src/app/modules/gallery/folder/interfaces";
import { ImagesService } from "src/app/modules/gallery/images.service";
import {
  ProductImagesService,
  IProdImage,
} from "../../../services/product-images.service";
import { ToastrService } from "ngx-toastr";
import { fadeScale } from "src/app/modules/ui/animations";

@Component({
  animations: [fadeScale],
  selector: "product-form-images",
  templateUrl: "./images.component.html",
  styleUrls: ["./images.component.scss"],
})
export class ImagesComponent implements OnInit {
  private _model: IProduct;
  public modalOpen: boolean = false;

  @Output() modelChange = new EventEmitter();
  @Input() get model(): IProduct {
    return this._model;
  }

  set model(val: IProduct) {
    this._model = val;
    this.modelChange.emit(this._model);

    this.getProdImages();
  }

  constructor(
    public image: ImagesService,
    public prodImage: ProductImagesService,
    protected toastr: ToastrService
  ) {}

  public ngOnInit(): void {}

  getProdImages() {
    this.prodImage.getByProdId(this.model.id).subscribe(this.getProdImagesHandler);
  }

  getProdImagesHandler = (data) => {
    console.log(data.data.images, "|");
    let host = data.host;
    let images: Array<IProdImage> = data.data.images;

    images.forEach((element) => {
      element.image.host = host;
    });

    this.prodImage.selected = images;
  };

  onDeleteImage(prodImage: IProdImage) {
    this.prodImage.deleteProdImage(prodImage);
    // this.prodImage.deleteImages(prodImage.id,)
  }

  onPress() {
    this.modalOpen = true;
  }

  onSave() {
    this.prodImage.put(this.model.id).subscribe(this.saveHandler);
  }
  saveHandler = (data) => {
    this.toastr.success("Product images saved");
  };

  onOk() {
    let list: IImage[] = this.image.getSelected();
    this.prodImage.pushImages(list, this.model.id);
    this.modalOpen = false;
  }
}
