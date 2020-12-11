import { Component, OnInit, Input, Output, EventEmitter,OnChanges } from "@angular/core";
import { QuestionBase } from "..";
import { FormGroup } from "@angular/forms";
import { QuestionControlService } from "../question-control.service";
import { IImage } from 'src/app/modules/gallery/folder/interfaces';
import { ImagesService } from 'src/app/modules/gallery/images.service';
import { IProdImage, ProductImagesService } from 'src/app/modules/catalog/product/services/product-images.service';
@Component({
  selector: "rap-dynamic-form",
  templateUrl: "./dynamic-form.component.html",
  styleUrls: ["./dynamic-form.component.scss"]
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: QuestionBase<string>[] = [];
  @Input() isSubmitButton: boolean = true;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();
  selected:any;
  form: FormGroup;
  modalOpen=false;

  constructor(private qcs: QuestionControlService,
    public image: ImagesService,
    public prodImage: ProductImagesService,) {}

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }
 

  onSubmit() {
    let data = this.form.getRawValue();
    this.formSubmit.emit(data);
  }
  selectHandler = (data) => {
    let list: IImage[] = this.image.getSelected();
    if (list[0]) {
      const selectedImage: IImage = list[0];
      this.selected.image_id = selectedImage.id;
      this.selected.image.src = selectedImage.src;
      this.selected.image.src_mini = selectedImage.src_mini;
      this.selected.host = selectedImage.host;
      this.modalOpen = false;
      console.log('selectImage==>',selectedImage)
    }
  };
  onOk() {
    // console.log(this.selected,'<=====null')
    let list: IImage[] = this.image.getSelected();
    // this.prodImage.pushImages(list, this.model.id);
    this.selected.image_id=list[0].id
    this.selected.image.src = list[0].src;
    this.selected.image.src_mini = list[0].src_mini;

    this.modalOpen = false;
  }

  onReset() {
    this.selected.image_id = null;
    this.selected.host = null;
    this.selected.image = {
      src: "assets/icons/color-none-image.svg",
      src_mini: "assets/icons/color-none-image.svg",
    };
  }



  onDeleteImage(prodImage: IProdImage) {
    this.prodImage.deleteProdImage(prodImage);
  }

  onPress() {
    this.modalOpen = true;
  }
}
