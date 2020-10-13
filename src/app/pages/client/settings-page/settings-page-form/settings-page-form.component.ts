import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
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
export class SettingsPageFormComponent implements OnInit, OnChanges {
  @Input() langs: ILanguage[];
  @Input() title: string = "";
  @Input() selectedPlatform;

  @Output() formDataChange = new EventEmitter(); 

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
  public items: FormArray;
  public tabTitleName: string = 'Eng';
  public langId: number = 1;

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

  public ngOnChanges(changes: SimpleChanges) {
    if(changes.selectedPlatform?.currentValue) {
      this.setDataInForm(this.tabTitleName);
    }
  }

  public onClickChangeTabDescription(tab) {
    // console.log('---tab--->', tab);
    // console.log('---selectedPlatform--->', this.selectedPlatform);

    this.setDataInForm(tab.title, this.langId);
  }

  ngOnInit(): void {
    this.generatePageSettingsForm();
    this.generateShopDetailsForm();
    
    this.generateSiteSettingsContactTopForm();
    this.generateSiteSettingsContactBottomForm();

    this.image.select.subscribe(this.selectHandler);

    this.generalSettingsForm.get('location').setValue(this.selectedPlatform?.location);
    this.getEditSettingsPageFormData();
    this.getGenerateShopDetailsForm();
    this.getSiteSettingsContactTopForm();
    this.getSiteSettingsContactBottomForm();

  }

  generatePageSettingsForm() {
    this.generalSettingsForm = new FormGroup({
      logo: new FormControl('', []),
      siteIcon: new FormControl('', []),
      location: new FormControl('', [])
    })
  }

  generateShopDetailsForm() {
    this.shopDetailsForm = this.formBuilder.group({
      items: this.formBuilder.array([ this.createDescription() ])
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
      facebook: new FormControl('', []),
      instagram: new FormControl('', []),
      telegram: new FormControl('', []),
      viber: new FormControl('', []),
      youtube: new FormControl('', [])
    })
  }

  createDescription(): FormGroup {
    return this.formBuilder.group({
      name: new FormControl('', []),
      adress: new FormControl('', []),
      work_schedule: new FormControl('', []),
      meta_description: new FormControl('', []),
      meta_keywords: new FormControl('', [])
    });
  }

  setDataInForm(tabTitleN, id?) {
    // console.log('selectedPlatform==>', this.selectedPlatform);

    this.selectedPlatform?.descriptions?.forEach((description) => {
      // console.log(Boolean(tabTitleN === 'Eng' && !description.lang_id));
      // console.log('description =====>', description);

      if (tabTitleN === 'Eng' && description.lang_id === 1) {
        this.shopDetailsForm.controls.items['controls'][0].patchValue({...description});
      }

      if (tabTitleN === 'Укр' && description.id === 2) {
        this.shopDetailsForm.controls.items['controls'][0].patchValue({...description});
      }

      if (tabTitleN === 'Рус' && description.id === 3) {
        this.shopDetailsForm.controls.items['controls'][0].patchValue({...description});
      }

      if (tabTitleN === 'Pl' && description.id === 4) {
        this.shopDetailsForm.controls.items['controls'][0].patchValue({...description});
      }

      console.log(this.shopDetailsForm.controls.items['controls']);
    })
  }

  getDescription(selectedDescription) {
    // console.log(selectedDescription);
    // console.log(this.shopDetailsForm.controls.items['controls']);
    // console.log(this.shopDetailsForm.controls.items.value[0]?.name);

    this.selectedPlatform?.descriptions?.forEach((description) => {

      // console.log(description);
      // console.log(Boolean(selectedDescription.id === description.id));
      // console.log(Boolean(this.shopDetailsForm.controls.items.value[0]?.name > 0));

      if ((selectedDescription) &&
          (selectedDescription.id === description.id) && 
          
          (this.shopDetailsForm.controls.items.value[0]?.name > 0)) {
          description.name = this.shopDetailsForm.controls.items.value[0]?.name; 
      }

      if ((selectedDescription) &&
          (selectedDescription.id === description.id) && 
          
          (this.shopDetailsForm.controls.items.value[0]?.adress > 0)) {
          description.adress = this.shopDetailsForm.controls.items.value[0]?.adress;
      }

      if ((selectedDescription) &&
          (selectedDescription.id === description.id) && 
          
          (this.shopDetailsForm.controls.items.value[0]?.work_schedule > 0)) {
          description.work_schedule = this.shopDetailsForm.controls.items.value[0]?.work_schedule;
      }

      if ((selectedDescription) &&
          (selectedDescription.id === description.id) && 
          
          (this.shopDetailsForm.controls.items.value[0]?.meta_description > 0)) {
          description.meta_description = this.shopDetailsForm.controls.items.value[0]?.meta_description;
      }

      if ((selectedDescription) &&
          (selectedDescription.id === description.id) && 
          
          (this.shopDetailsForm.controls.items.value[0]?.meta_keywords > 0)) {
          description.meta_keywords = this.shopDetailsForm.controls.items.value[0]?.meta_keywords;
      }
    })

    console.log(this.selectedPlatform?.descriptions);
  }

  addDescription(): void {
    this.items = this.shopDetailsForm.get('items') as FormArray;
    
    this.items.push(this.createDescription());
  }

  addItem(phoneNumber): void {    
    this.newPhoneData = {
      site_id: 1,
      phone: phoneNumber,
      priority: 1
    }

    this.settingsPageService.createPhone(this.newPhoneData).subscribe((newPhones) => {
      this.selectedPlatform.phones.push(newPhones.data);
    })

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
    //this.imageSrc.image_id = null;
    //this.imageSrc.host = null;
    this.imageSrc.image = {
      src: "assets/icons/color-none-image.svg",
      src_mini: "assets/icons/color-none-image.svg",
    };
  }

  selectHandler = (data) => {
    this.list = this.image?.getSelected();
    if (this.list[0] && this.isSelectedImageLogo) {
      this.selectedImageLogo = this.list[0];
    }

    if (this.list[0] && this.isSelectedImageSiteIcon) {
      this.selectedImageSiteIcon = this.list[0];
    }
    this.modalOpen = false;
    this.isSelectedImageLogo = false;
    this.isSelectedImageSiteIcon = false;
  };

  deletePhoneNumber(sitePhone) {
    this.settingsPageService.deletePhone(sitePhone.id).subscribe((res) => {
      console.log(res);
    })

    this.selectedPlatform.phones = this.selectedPlatform?.phones.filter((val) => {
      return val.id !== sitePhone.id;
    })
  }

  getEditSettingsPageFormData(): void {
    console.log(this.generalSettingsForm.value.logo);
    this.generalSettingsForm.value.logo = this.selectedImageLogo?.src;
    this.generalSettingsForm.value.siteIcon = this.selectedImageSiteIcon?.src;

    this.generalSettingsForm.valueChanges
    .subscribe(() => this.emitFormDataChanges());
  }

  getGenerateShopDetailsForm() {
    this.shopDetailsForm.valueChanges
    .subscribe(() => this.emitFormDataChanges());
  }

  getSiteSettingsContactTopForm() {
    this.siteSettingsContactTopForm.valueChanges
    .subscribe(() => this.emitFormDataChanges());
  }

  getSiteSettingsContactBottomForm() {
    this.siteSettingsContactBottomForm.valueChanges
    .subscribe(() => this.emitFormDataChanges());
  }

  emitFormDataChanges(){
    if (this.selectedPlatform && 
        this.selectedPlatform?.logo && 
        this.selectedPlatform?.logo?.src) {
        this.selectedPlatform.logo.id = this.selectedImageLogo?.id;
        this.selectedPlatform.logo.src = this.selectedImageLogo?.src;
        this.selectedPlatform.logo.src_mini = this.selectedImageLogo?.src_mini;
    }

    if (this.selectedPlatform && 
        this.selectedPlatform?.icon && 
        this.selectedPlatform?.icon?.src) {
        this.selectedPlatform.icon.id = this.selectedImageSiteIcon?.id;
        this.selectedPlatform.icon.src = this.selectedImageSiteIcon?.src;
        this.selectedPlatform.icon.src_mini = this.selectedImageSiteIcon?.src_mini;
    }

    const selectedImageLogoObj = {
      id: this.selectedImageLogo?.id,
      src: this.selectedImageLogo?.src,
      src_mini: this.selectedImageLogo?.src_mini
    }

    const selectedImageSiteIconObj = {
      id: this.selectedImageSiteIcon?.id,
      src: this.selectedImageSiteIcon?.src,
      src_mini: this.selectedImageSiteIcon?.src_mini
    }

    this.selectedPlatform?.socials.forEach((val) => {
      if (val.name === "facebook") {
        val.url = this.siteSettingsContactBottomForm.value.facebook;
      }
      if (val.name === "Instagram") {
        val.url = this.siteSettingsContactBottomForm.value.instagram;
      }
      if (val.name === "Telegram") {
        val.url = this.siteSettingsContactBottomForm.value.telegram;
      }
      if (val.name === "Viber") {
        val.url = this.siteSettingsContactBottomForm.value.viber;
      }
      if (val.name === "Youtube") {
        val.url = this.siteSettingsContactBottomForm.value.youtube;
      }
    })

    this.formDataChange.emit({
      id: this.selectedPlatform?.id,
      logo_id: this.selectedPlatform?.logo_id,
      icon_id: this.selectedPlatform?.icon_id,
      created_at: this.selectedPlatform?.created_at,
      updated_at: this.selectedPlatform?.updated_at,
      phones: this.selectedPlatform?.phones,
      logo: selectedImageLogoObj,
      icon: selectedImageSiteIconObj,
      socials: this.selectedPlatform?.socials,
      description: this.selectedPlatform?.descriptions,
      email: this.siteSettingsContactBottomForm?.value?.siteEmail,
      location: this.selectedPlatform?.location
    });
  }
}
