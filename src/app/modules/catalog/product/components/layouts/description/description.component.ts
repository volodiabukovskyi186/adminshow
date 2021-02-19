import { Component, OnChanges, OnInit, Input, ChangeDetectorRef, AfterViewInit, OnDestroy } from "@angular/core";
import { IProduct } from "../../../interfaces";
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { LanguageService as LocalizationLang } from "src/app/modules/localization/language/language.service";
import { LanguageService } from "src/app/core/language.service";
import { ImagesService } from 'src/app/modules/gallery/images.service';
import { takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import insertTextAtCursor from 'insert-text-at-cursor';

@Component({
  selector: "product-form-description",
  templateUrl: "./description.component.html",
  styleUrls: ["./description.component.scss"],
})
export class DescriptionComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  public modalOpen: boolean = false;
  public uploadImgData: any;
  public uploadImgUrl: string;
  public isAngularEditorComp: boolean = true;
  public isDescChanged: boolean = false;

  private onDestroyed$: Subject<void> = new Subject<void>();

  public editorConfig: AngularEditorConfig = {
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
      sanitize: false,
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
    uploadUrl: this.uploadImgUrl,
    // uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize'],
      ['insertImage']
    ]
  };

  @Input() model: IProduct;

  constructor(
    public languageService: LocalizationLang,
    public langService: LanguageService,
    public imagesService: ImagesService
  ) {}

  public ngOnInit(): void {
    //this.addCustomImageBtnToEditor();
  }

  public ngOnChanges(): void {}

  public ngAfterViewInit(): void {
    //this.changeImgBtnLogic();
  }

  public ngOnDestroy(): void {
    this.onDestroyed$.next();
    this.onDestroyed$.complete();
  }

  public getSelectedImg(itemDescription): void {
    const subscription = this.imagesService.getSelectedImg$()
      .subscribe((res) => {
        if (this.model.id === itemDescription.product_id) {
          this.model.descriptions.forEach((val) => {
            if (val.id === itemDescription.id) {
              itemDescription.discription += `<img src="https://api.showu.com.ua${res.src}" />`;
              this.modalOpen = false;
            }
          })
        }
      subscription.unsubscribe();
    })
  }
  
  public uploadImgToEditor(itemDesc, event): void {
    event.stopPropagation();
    event.preventDefault();

    this.modalOpen = true;
    this.imagesService.updatedAngularEditorStream$(this.isAngularEditorComp);

    this.getSelectedImg(itemDesc);
  }
}

// let kolkovEditorTextArea = document.getElementsByClassName('angular-editor-textarea')[0];
// let img = document.createElement('img');
// img.src = `https://api.showu.com.ua${res.src}`;
// itemDescription.discription = img;
// let imgUrl = `<img src="https://api.showu.com.ua${res.src}" />`;
// let doc = new DOMParser().parseFromString(imgUrl, "text/html");
// itemDescription.discription = doc;
// insertTextAtCursor(kolkovEditorTextArea, itemDescription.discription);