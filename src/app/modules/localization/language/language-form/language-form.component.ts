import { LanguageService } from 'src/app/modules/localization/language/language.service';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DynamicFormComponent } from 'src/app/modules/ui/dynamic-form/dynamic-form/dynamic-form.component';
import { Observable } from 'rxjs';
import { QuestionBase } from 'src/app/modules/ui/dynamic-form';
import { LanguageFormService } from '../language-form.service';
import { IImage } from 'src/app/modules/gallery/folder/interfaces';
import { ImagesService } from 'src/app/modules/gallery/images.service';
import { IProdImage, ProductImagesService } from 'src/app/modules/catalog/product/services/product-images.service';

@Component({
  selector: 'app-language-form',
  templateUrl: './language-form.component.html',
  styleUrls: ['./language-form.component.scss']
})
export class LanguageFormComponent implements OnInit, OnChanges {
  public modalOpen: boolean = false;

  @ViewChild(DynamicFormComponent) dynamicForm: DynamicFormComponent;

  @Input() questions$: Observable<QuestionBase<any>[]>;
  @Input() title: string = "";
  @Input() selected;

  @Output() formSubmit: EventEmitter<any> = new EventEmitter();

  public submitForm() {
    this.dynamicForm.onSubmit();
  }

  ngOnInit(): void {}

  ngOnChanges(): void {}

  constructor(public LangFormService: LanguageFormService,
    public image: ImagesService,
    public prodImage: ProductImagesService,
    public languageService: LanguageService) {}

  onSubmit(data: any) {
    this.formSubmit.emit(data);
  }
  
  selectHandler = (data) => {
    let list: IImage[] = this.image.getSelected();
    if (list[0]) {
      const selectedImage: IImage = list[0];
      this.selected.flag = selectedImage[0].src;
      this.modalOpen = false;
    }

  };

  onOk() {
    let list: IImage[] = this.image.getSelected();
    this.languageService.flagFlag = list[0].src;
  
    this.languageService.bSubjectFlag.next(this.selected.flag);
    this.selected.flag = list[0].src;
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
