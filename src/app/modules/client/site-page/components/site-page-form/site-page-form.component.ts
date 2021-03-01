import { Component, OnInit, Input } from '@angular/core';
import { ISitePage } from '../../site-page.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { LanguageService as LocalizationLang } from "src/app/modules/localization/language/language.service";
import { ImagesService } from "src/app/modules/gallery/images.service";

@Component({
  selector: 'app-site-page-form',
  templateUrl: './site-page-form.component.html',
  styleUrls: ['./site-page-form.component.scss']
})
export class SitePageFormComponent implements OnInit {
  @Input() model: ISitePage;
  @Input() title: string = "";

  public modalOpen: boolean = false;
  public uploadImgUrl: string;
  public isAngularEditorComp: boolean = true;

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
    //uploadUrl: this.uploadImgUrl,
    uploadWithCredentials: false,
    sanitize: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      // ['bold', 'italic'],
      // ['fontSize'],
      ['insertImage']
    ]
  };

  constructor(
    public languageService: LocalizationLang,
    public image: ImagesService
  ) { }

  ngOnInit(): void {
  }

  public getSelectedImg(itemDescription): void {
    const subscription = this.image.getSelectedImg$()
      .subscribe((res) => {
        // console.log(res);
        // console.log('site-page item == >', itemDescription);
        // console.log('site-page model ==== >>>', this.model);

        if (itemDescription?.id === null) {
          if (itemDescription.description === null) {
            itemDescription.description = '';
          }

          if (itemDescription.subtitle === null) {
            itemDescription.subtitle = '';
          }

          itemDescription.description += `<img src="https://api.showu.com.ua${res.src}" />`;
          this.modalOpen = false;
        }

        if (itemDescription?.id !== null) {
          if (this.model.id === itemDescription.page_id) {
            this.model.descriptions.forEach((sitePageDesc) => {
              if (sitePageDesc.id === itemDescription.id) {
                // || (sitePageDesc.lang.id === itemDescription.lang.id)
                if (itemDescription.description == null) {
                  itemDescription.description = '';
                } 
                if (itemDescription.description != null) {
                  itemDescription.description += `<img src="https://api.showu.com.ua${res.src}" />`;
                  this.modalOpen = false;
                }
              }
            })
          }
        }
      subscription.unsubscribe();
    })
  }
  
  public uploadImgToEditor(itemDesc, event): void {
    event.stopPropagation();
    event.preventDefault();

    this.modalOpen = true;
    this.image.updatedAngularEditorStream$(this.isAngularEditorComp);

    this.getSelectedImg(itemDesc);
  }

}
