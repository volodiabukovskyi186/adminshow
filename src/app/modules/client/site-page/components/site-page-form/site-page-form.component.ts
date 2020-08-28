import { Component, OnInit, Input } from '@angular/core';
import { ISitePage } from '../../site-page.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { LanguageService as LocalizationLang } from "src/app/modules/localization/language/language.service";

@Component({
  selector: 'app-site-page-form',
  templateUrl: './site-page-form.component.html',
  styleUrls: ['./site-page-form.component.scss']
})
export class SitePageFormComponent implements OnInit {
  @Input() model: ISitePage;
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

  constructor(
    public languageService: LocalizationLang
  ) { }

  ngOnInit(): void {
  }

}
