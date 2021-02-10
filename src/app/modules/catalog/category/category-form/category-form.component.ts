import {
  Component,
  OnInit,
  Output,
  ViewChild,
  Input,
  EventEmitter,
  OnChanges
} from "@angular/core";
import { DynamicFormComponent } from "../../../ui/dynamic-form/dynamic-form/dynamic-form.component";
import { ICategory, ICategoryDesc } from "../interfaces";
import { ILanguage } from "src/app/modules/localization/language/language.service";
import { ImagesService } from "src/app/modules/gallery/images.service";
import { IImage } from "src/app/modules/gallery/folder/interfaces";
import { LanguageService as Lang } from "src/app/core/language.service";
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { LanguageService as LocalizationLang } from "src/app/modules/localization/language/language.service";
import { environment } from '../../../../../environments/environment';

@Component({
  selector: "app-category-form",
  templateUrl: "./category-form.component.html",
  styleUrls: ["./category-form.component.scss"],
})
export class CategoryFormComponent implements OnInit, OnChanges {
  public modalOpen: boolean = false;
  public host = environment.host;

  public langShortTitle = {
    "1": {
      title: 'settings.settingsLangShortTitleEng'
    },
    "2": {
      title: 'settings.settingsLangShortTitleUa'
    },
    "3": {
      title: 'settings.settingsLangShortTitleRus'
    },
    "4": {
      title: 'settings.settingsLangShortTitlePl'
    }
  }

  //@ViewChild(DynamicFormComponent) dynamicForm: DynamicFormComponent;

  // @Input() questions$: Observable<QuestionBase<any>[]>;

  @Input() category: ICategory;
  @Input() categoryes: any[] = [];
  @Input() langs: ILanguage[];
  @Input() title: string = "";
  @Input() selectedCategory: ICategory;
  @Input() isCategoryAdded: boolean;
  @Input() isCategoryEdited: boolean;

  @Output() formSubmit: EventEmitter<any> = new EventEmitter();

  constructor(
    public image: ImagesService, 
    public lang: Lang,
    public languageService: LocalizationLang
  ) {}

  public ngOnInit(): void {
    this.image.select.subscribe(this.selectHandler);
  }

  public ngOnChanges(): void {
    console.log('selectedCategory ===== >>>> ', this.selectedCategory);
    console.log('categoryes ==== <<<<<<>>>>>>', this.categoryes);
  }

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
    //uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  public onPress(): void {
    this.modalOpen = true;
  }

  public getCatDesc(langId: number): ICategoryDesc {
    if (this.isCategoryEdited) {
      this.selectedCategory.description.forEach((cd) => {
        if (cd.lang_id == langId) return cd;
      });
    }

    if (this.isCategoryAdded) {
      this.category.description.forEach((cd) => {
        if (cd.lang_id == langId) return cd;
      });
    }
    
    return null;
  }

  public onReset(): void {
    if (this.isCategoryEdited) {
      this.selectedCategory.image_id = null;
      this.selectedCategory.host = null;
      this.selectedCategory.image = {
        src: "assets/icons/color-none-image.svg",
        src_mini: "assets/icons/color-none-image.svg",
      };
    }

    if (this.isCategoryAdded) {
      this.category.image_id = null;
      this.category.host = null;
      this.category.image = {
        src: "assets/icons/color-none-image.svg",
        src_mini: "assets/icons/color-none-image.svg",
      };
    }
  }

  selectHandler = (data) => {
    let list: IImage[] = this.image.getSelected();

    if (list[0] && this.isCategoryEdited) {
      const selectedImage: IImage = list[0];
      this.selectedCategory.image_id = selectedImage.id;

      if (this.selectedCategory.image && this.selectedCategory.image.src) {
        this.selectedCategory.image.src = selectedImage.src;
        this.selectedCategory.image.src_mini = selectedImage.src_mini;
      } else {
        this.selectedCategory.image = {
          src: selectedImage.src,
          src_mini: selectedImage.src_mini,
        };
      }
      this.selectedCategory.host = selectedImage.host;
      this.modalOpen = false;
    }
    
    if (list[0] && this.isCategoryAdded) {
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

  public submitForm() {
    console.log('selectedCategory.description ====== >>>>>', this.selectedCategory?.description);
    //console.log('this.dynamicForm ===== >>>>', this.dynamicForm);
    if (this.isCategoryEdited) {
      let dataToSend = {
        parent_id: this.selectedCategory.parent_id,
        image_id: this.selectedCategory.image_id,
        sort_order: this.selectedCategory.sort_order,
        status: this.selectedCategory.status,
        description: this.selectedCategory.description
      }

      this.onSubmit(dataToSend);
    }

    if (this.isCategoryAdded) {
      let dataToSend = {
        parent_id: this.category.parent_id,
        image_id: this.category.image_id,
        sort_order: this.category.sort_order,
        status: this.category.status,
        description: this.category.description
      }

      this.onSubmit(dataToSend);
    }
  }

  public onSubmit(data: any) {
    this.formSubmit.emit(data);
  }
}
