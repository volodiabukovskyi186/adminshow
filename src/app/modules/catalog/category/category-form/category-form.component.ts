import {
  Component,
  OnInit,
  Output,
  ViewChild,
  Input,
  EventEmitter,
} from "@angular/core";
import { DynamicFormComponent } from "src/app/modules/ui/dynamic-form/dynamic-form/dynamic-form.component";
import { ICategory, ICategoryDesc } from "../interfaces";
import { ILanguage } from "src/app/modules/localization/language/language.service";
import { ImagesService } from "src/app/modules/gallery/images.service";
import { IImage } from "src/app/modules/gallery/folder/interfaces";
import { LanguageService as Lang } from "src/app/core/language.service";
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { LanguageService as LocalizationLang } from "src/app/modules/localization/language/language.service";

@Component({
  selector: "app-category-form",
  templateUrl: "./category-form.component.html",
  styleUrls: ["./category-form.component.scss"],
})
export class CategoryFormComponent implements OnInit {
  @ViewChild(DynamicFormComponent) dynamicForm: DynamicFormComponent;

  // @Input() questions$: Observable<QuestionBase<any>[]>;

  @Input() category: ICategory;
  @Input() categoryes: any[] = [];
  @Input() langs: ILanguage[];
  @Input() title: string = "";

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'no',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  public submitForm() {
    this.dynamicForm.onSubmit();
  }

  modalOpen: boolean = false;

  onPress() {
    this.modalOpen = true;
  }

  getCatDesc(langId: number): ICategoryDesc {
    this.category.description.forEach((cd) => {
      if (cd.lang_id == langId) return cd;
    });
    return null;
  }

  @Output() formSubmit: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    this.image.select.subscribe(this.selectHandler);
    console.log(this.categoryes);
  }

  onReset() {
    this.category.image_id = null;
    this.category.host = null;
    this.category.image = {
      src: "assets/icons/color-none-image.svg",
      src_mini: "assets/icons/color-none-image.svg",
    };
  }

  selectHandler = (data) => {
    let list: IImage[] = this.image.getSelected();

    if (list[0]) {
      const selectedImage: IImage = list[0];
      this.category.image_id = selectedImage.id;

      if (this.category.image && this.category.image.src) {
        this.category.image.src = selectedImage.src;
        this.category.image.src_mini = selectedImage.src_mini;
      } else {
        this.category.image = {
          src: selectedImage.src,
          src_mini: selectedImage.src_mini,
        };
      }
      this.category.host = selectedImage.host;
      this.modalOpen = false;
    }
  };

  constructor(
    public image: ImagesService, 
    public lang: Lang,
    public languageService: LocalizationLang
  ) {}

  onSubmit(data: any) {
    this.formSubmit.emit(data);
  }
}
