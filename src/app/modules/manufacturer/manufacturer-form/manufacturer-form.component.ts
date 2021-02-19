import { Component, OnInit, Input } from '@angular/core';
import { IManufacturer } from '../manufacturer.service';
import { ILanguage, LanguageService } from '../../localization/language/language.service';
import { IImage } from '../../gallery/folder/interfaces';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ImagesService } from 'src/app/modules/gallery/images.service';
import { takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-manufacturer-form',
  templateUrl: './manufacturer-form.component.html',
  styleUrls: ['./manufacturer-form.component.scss']
})
export class ManufacturerFormComponent implements OnInit {
  @Input() manufacturer: IManufacturer;
  @Input() showTabSize;
  @Input() langs: ILanguage[];
  @Input() selected: IManufacturer;

  @Input() title: string = "";

  public modalOpen: boolean = false;
  public isAngularEditorComp: boolean = true;
  public uploadImgUrl: string;

  constructor(
    public image: ImagesService,
    public languageService: LanguageService
  ) {}

  public ngOnInit(): void {
    this.image.select.subscribe(this.selectHandler);

    console.log(this.manufacturer);
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
    uploadUrl: this.uploadImgUrl,
    //uploadUrl: 'http://localhost:4200/images',
    //uploadUrl: 'https://api.showu.com.ua/v1/image/upload',
    uploadWithCredentials: false,
    sanitize: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['insertImage']
    ]
    // toolbarHiddenButtons: [
    //   ['bold', 'italic'],
    //   ['fontSize']
    // ]
  };

  onReset(): void {
    this.manufacturer.image_id = null;
    this.manufacturer.host = null;
    this.manufacturer.image = {
      src: "assets/icons/color-none-image.svg",
      src_mini: "assets/icons/color-none-image.svg",
    };
  }

  selectHandler = (data) => {
    let list: IImage[] = this.image.getSelected();

    if (list[0]) {
      const selectedImage: IImage = list[0];
      this.manufacturer.image_id = selectedImage.id;
      this.manufacturer.image.src = selectedImage.src;
      this.manufacturer.image.src_mini = selectedImage.src_mini;
      this.manufacturer.host = selectedImage.host;
      this.modalOpen = false;
    }
  };

  onPress() {
    this.modalOpen = true;
  }

  public getSelectedImg(itemDescription): void {
    const subscription = this.image.getSelectedImg$()
      .subscribe((res) => {
        console.log(res);
        console.log(itemDescription);
        console.log(this.manufacturer);

        if (this.manufacturer.id) {
          this.manufacturer.description.forEach((manufacturerDesc) => {
            if (manufacturerDesc.id === itemDescription.id) {
              itemDescription.description += `<img src="https://api.showu.com.ua${res.src}" />`;
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
    this.image.updatedAngularEditorStream$(this.isAngularEditorComp);

    this.getSelectedImg(itemDesc);
  }
}
