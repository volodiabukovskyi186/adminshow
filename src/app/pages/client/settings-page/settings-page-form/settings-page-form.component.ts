import { Component, OnInit, Input } from '@angular/core';
import { ILanguage } from 'src/app/modules/localization/language/language.service';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { LanguageService as LocalizationLang } from "src/app/modules/localization/language/language.service";
import { ImagesService } from "src/app/modules/gallery/images.service";
import { IImage } from "src/app/modules/gallery/folder/interfaces";
import { ISiteSettingImg } from "../interfaces/site-descriptions";
import { environment } from "src/environments/environment";
import { SettingsPageService } from "../services/settings-page.service";

@Component({
  selector: 'app-settings-page-form',
  templateUrl: './settings-page-form.component.html',
  styleUrls: ['./settings-page-form.component.scss']
})
export class SettingsPageFormComponent implements OnInit {
  @Input() langs: ILanguage[];
  @Input() title: string = "";
  @Input() selectedPlatform;

  public generalSettingsForm: FormGroup;
  public shopDetailsForm: FormGroup;
  public siteSettingsContactForm: FormGroup;
  public imageSrc: ISiteSettingImg;
  public modalOpen: boolean = false;
  public selectedImage: IImage;
  public list: IImage[];
  public host = environment.host;
  public selectedImageSiteIcon;
  public selectedImageLogo;
  public listTwo;
  public phoneNumbers: string[];
  public numberPhone;
  public phoneNumbersForm: FormGroup;
  public siteSettingsContactTopForm: FormGroup;
  public siteSettingsContactBottomForm: FormGroup;
  public additionalPhoneNumber: string;
  public newPhoneData = {};
  public isSelectedImageSiteIcon: boolean = false;
  public isSelectedImageLogo: boolean = false;

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

  constructor(
    public languageService: LocalizationLang,
    public image: ImagesService,
    private formBuilder: FormBuilder,
    public settingsPageService: SettingsPageService
  ) { }

  ngOnInit(): void {
    this.generatePageSettingsForm();
    this.generateShopDetailsForm();
    //this.generateSiteSettingsContactForm();
    this.generateSiteSettingsContactTopForm();
    this.generateSiteSettingsContactBottomForm();

    this.image.select.subscribe(this.selectHandler);

    // this.phoneNumbersForm = this.formBuilder.group({
    //   numberPhone: this.formBuilder.array([ this.createItem() ])
    // });

    this.generalSettingsForm.get('location').setValue(this.selectedPlatform?.location);
  }

  generatePageSettingsForm() {
    this.generalSettingsForm = new FormGroup({
      logo: new FormControl('', []),
      siteIcon: new FormControl('', []),
      location: new FormControl('', [])
    })
  }

  generateShopDetailsForm() {
    this.shopDetailsForm = new FormGroup({
      shopName: new FormControl('', []),
      address: new FormControl('', []),
      workSchedule: new FormControl('', []),
      metaTagDescription: new FormControl('', []),
      metaTagKeywords: new FormControl('', [])
    })
  }

  generateSiteSettingsContactTopForm() {
    this.siteSettingsContactTopForm = new FormGroup({
      siteTelephone: new FormControl('', []),
      siteTelephonePlus: new FormControl('', [])
    })
  }

  generateSiteSettingsContactBottomForm() {
    this.siteSettingsContactBottomForm = new FormGroup({
      siteEmail: new FormControl('', []),
      siteFacebook: new FormControl('', []),
      siteInstagram: new FormControl('', []),
      siteTelegram: new FormControl('', []),
      siteViber: new FormControl('', []),
      siteYoutube: new FormControl('', [])
    })
  }

  createItem() {
    return this.formBuilder.group({
       siteTelephonePlus: new FormControl('', [])
    });
  }

  addItem(phoneNumber): void {    
    console.log(phoneNumber);

    this.newPhoneData = {
      site_id: 1,
      phone: phoneNumber,
      priority: 1
    }

    this.settingsPageService.createPhone(this.newPhoneData).subscribe((newPhones) => {
      console.log('this.newPhones', newPhones.data);
      this.selectedPlatform.phones.push(newPhones.data);
    })
    
    // this.selectedPlatform.phones.push(objPhone);

     this.additionalPhoneNumber = null;
  }

  onPressLogo() {
    this.modalOpen = true;
    this.isSelectedImageLogo = true;
  }

  onPressSiteIcon() {
    this.modalOpen = true;
    this.isSelectedImageSiteIcon = true;
  }

  onReset() {
    this.imageSrc.image_id = null;
    this.imageSrc.host = null;
    this.imageSrc.image = {
      src: "assets/icons/color-none-image.svg",
      src_mini: "assets/icons/color-none-image.svg",
    };
  }

  selectHandler = (data) => {
    this.list = this.image?.getSelected();
    this.listTwo = this.list.slice();
    
    console.log('list', this.list);
    console.log('listTwo', this.listTwo);

    if (this.list[0]) {
      this.selectedImage = this.list[0];
      this.selectedImageSiteIcon = this.selectedImage;
      
      this.modalOpen = false;
    }

    if (this.listTwo[0]) {
      this.selectedImageLogo = this.listTwo[0];
      this.modalOpen = false;
    }
  };

  deletePhoneNumber(sitePhone) {
    console.log(sitePhone);
    console.log(sitePhone.id);

    this.settingsPageService.deletePhone(sitePhone.id).subscribe((res) => {
      console.log(res);
    })

    this.selectedPlatform.phones = this.selectedPlatform?.phones.filter((val) => {
      return val.id !== sitePhone.id;
    })
  }
}
