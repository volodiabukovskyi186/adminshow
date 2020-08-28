import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import { IProduct } from "../../../interfaces";
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { LanguageService as LocalizationLang } from "src/app/modules/localization/language/language.service";
import { LanguageService } from "src/app/core/language.service";

@Component({
  selector: "product-form-description",
  templateUrl: "./description.component.html",
  styleUrls: ["./description.component.scss"],
})
export class DescriptionComponent {
  @Input() model: IProduct;

  constructor(
    public languageService: LocalizationLang,
    public langService: LanguageService
  ) {}

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
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };
}
