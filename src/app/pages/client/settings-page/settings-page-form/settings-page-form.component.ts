import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ILanguage } from 'src/app/modules/localization/language/language.service';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { LanguageService as LocalizationLang } from "src/app/modules/localization/language/language.service";
import { ImagesService } from "src/app/modules/gallery/images.service";
import { IImage } from "src/app/modules/gallery/folder/interfaces";
import { ISiteSettingImg } from "../interfaces/site-descriptions";
import { environment } from "src/environments/environment";
import { SettingsPageService } from "../services/settings-page.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-settings-page-form',
  templateUrl: './settings-page-form.component.html',
  styleUrls: ['./settings-page-form.component.scss']
})
export class SettingsPageFormComponent implements OnInit, OnChanges {
  @Input() langs: ILanguage[];
  @Input() title: string = "";
  @Input() selectedPlatform;
  @Input() siteLogoSrc;
  @Input() siteIconSrc;
  @Input() siteLogoId;
  @Input() siteIconId;

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
  public siteSettingsLocalizationForm: FormGroup;
  public defaultLanguage: any;
  public defaultAdminLanguage: any;
  public defaultCurrency: any;
  public defaultWeight: any;
  public defaultLength: any;
  public siteLanguages;
  public selectedDefaultLang;
  public selectedDefaultAdminLang;
  public siteCurrencies;
  public selectedDefaultCurrency;
  public siteLenghts;
  public selectedLength;
  public allLength: any[] = [];
  public siteWeightDesc: any[] = [];
  public selectedWeight;
  public localizationLang;
  public localizationAdminLang;
  public localizationCurrency;
  public localizationLength;
  public localizationWeight;
  public siteSocials;
  public generalSettingsData;
  public siteId: number;
  public selectedDescription;

  public selectedLogo: string;
  public selectedIcon: string;
  public selectedLogoId: number;
  public selectedIconId: number;

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
    protected toastr: ToastrService,
    public languageService: LocalizationLang,
    public image: ImagesService,
    private formBuilder: FormBuilder,
    public settingsPageService: SettingsPageService
  ) {}

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedPlatform?.currentValue) {
      this.setDataInForm(this.tabTitleName);
      this.setSocialsValue();

      this.generalSettingsForm?.get('location').setValue(this.selectedPlatform?.location);

      // console.log('selectedPlatform ========>>>>>>>>', this.selectedPlatform);
      // console.log(this.siteLogoSrc);
      // console.log(this.siteIconSrc);

      this.selectedLogo = this.siteLogoSrc;
      this.selectedIcon = this.siteIconSrc;

      this.selectedLogoId = this.siteLogoId;
      this.selectedIconId = this.siteIconId;

      // console.log(this.selectedLogoId);
      // console.log(this.selectedIconId);
    }
  }

  public onClickChangeTabDescription(tab) {
    this.setDataInForm(tab.title, this.langId);
  }

  public ngOnInit(): void {
    this.generatePageSettingsForm();
    this.generateShopDetailsForm();
    
    this.generateSiteSettingsContactTopForm();
    this.generateSiteSettingsContactBottomForm();

    this.image.select.subscribe(this.selectHandler);

    //this.getEditSettingsPageFormData();
    // this.getGenerateShopDetailsForm();
    // this.getSiteSettingsContactTopForm();
    // this.getSiteSettingsContactBottomForm();
    this.generateSiteSettingsLocalizationForm();

    this.getSiteDefaultLanguage();
    this.getSiteLanguageAdminDefault();
    this.getSiteDefaultCurrency();
    this.getSiteDefaultWeight();
    this.getSiteDefaultLength();
    this.getLanguages();
    this.getCurrencies();
    this.getLenghts();
    this.getWeightDesc();
    this.setSocialsValue();
    this.getSocials();

    // console.log(this.siteLogoSrc);
    // console.log(this.siteIconSrc);
  }

  public generatePageSettingsForm(): void {
    this.generalSettingsForm = new FormGroup({
      logo: new FormControl('', []),
      siteIcon: new FormControl('', []),
      location: new FormControl('', [])
    })
  }

  public generateShopDetailsForm(): void {
    this.shopDetailsForm = this.formBuilder.group({
      items: this.formBuilder.array([ this.createDescription() ])
    })
  }

  public generateSiteSettingsContactTopForm(): void {
    this.siteSettingsContactTopForm = new FormGroup({
      siteTelephone: new FormControl('', []),
      siteTelephonePlus: new FormControl('', [])
    })
  }

  public generateSiteSettingsContactBottomForm(): void {
    this.siteSettingsContactBottomForm = new FormGroup({
      siteEmail: new FormControl('', []),
      facebook: new FormControl('', []),
      instagram: new FormControl('', []),
      telegram: new FormControl('', []),
      viber: new FormControl('', []),
      youtube: new FormControl('', [])
    })
  }

  public createDescription(): FormGroup {
    return this.formBuilder.group({
      name: new FormControl('', []),
      adress: new FormControl('', []),
      work_schedule: new FormControl('', []),
      meta_description: new FormControl('', []),
      meta_keywords: new FormControl('', [])
    });
  }

  public generateSiteSettingsLocalizationForm(): void {
    this.siteSettingsLocalizationForm = new FormGroup({
      language: new FormControl('', []),
      adminLanguage: new FormControl('', []),
      currency: new FormControl('', []),
      unitsOfMeasurement: new FormControl('', []),
      weight: new FormControl('', [])
    })
  }

  public setDataInForm(tabTitleN, id?): void {
    this.selectedPlatform?.descriptions?.forEach((description) => {
      if (tabTitleN === 'Eng' && description?.id === 1) {
        this.shopDetailsForm?.controls?.items['controls'][0]?.patchValue({...description});
        console.log('eng', this.shopDetailsForm?.controls?.items['controls']);
      }

      if (tabTitleN === 'Укр' && description?.id === 2) {  
        this.shopDetailsForm?.controls?.items['controls'][0]?.patchValue({...description});
        console.log('укр', this.shopDetailsForm?.controls?.items['controls']);
      }

      if (tabTitleN === 'Рус' && description?.id === 3) {
        this.shopDetailsForm?.controls?.items['controls'][0]?.patchValue({...description});
        console.log('рус', this.shopDetailsForm?.controls?.items['controls']);
      }

      if (tabTitleN === 'Pl' && description?.id === 4) { 
        this.shopDetailsForm?.controls?.items['controls'][0]?.patchValue({...description});
        console.log('pl', this.shopDetailsForm?.controls?.items['controls']);
      }
    })
  }

  public getDescription(selectedDescription): void {
    this.selectedDescription = selectedDescription;
    this.selectedPlatform?.descriptions?.forEach((description) => {
      if (selectedDescription.id === description.id) {
        if (this.shopDetailsForm.valueChanges) {
          this.shopDetailsForm.valueChanges.subscribe((res) => {
            console.log(res.items[0]);
            description.name = res.items[0]?.name;
            description.adress = res.items[0]?.adress;
            description.work_schedule = res.items[0]?.work_schedule;
            description.meta_description = res.items[0]?.meta_description;
            description.meta_keywords = res.items[0]?.meta_keywords;
          })
        }
      }
    });

    this.shopDetailsForm.controls.items['controls'][0].patchValue({...selectedDescription});

    this.selectedPlatform?.descriptions?.forEach((description) => {
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

  public addDescription(): void {
    this.items = this.shopDetailsForm.get('items') as FormArray;
    
    this.items.push(this.createDescription());
  }

  public addItem(phoneNumber): void {    
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

  public onPressLogo(): void {
    this.modalOpen = true;
    this.isSelectedImageLogo = true;
  }

  public onPressSiteIcon(): void {
    this.modalOpen = true;
    this.isSelectedImageSiteIcon = true;
  }

  public onReset(): void {
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

  public settingsDataToSend(): void {
    // console.log(this.shopDetailsForm.get('items')['controls']);
    // console.log(this.shopDetailsForm.get('items')['controls'][0].value);

    // console.log(this.items);
    // console.log(this.formBuilder);

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

    // const selectedImageLogoObj = {
    //   id: this.selectedImageLogo?.id,
    //   src: this.selectedImageLogo?.src,
    //   src_mini: this.selectedImageLogo?.src_mini
    // }

    // const selectedImageSiteIconObj = {
    //   id: this.selectedImageSiteIcon?.id,
    //   src: this.selectedImageSiteIcon?.src,
    //   src_mini: this.selectedImageSiteIcon?.src_mini
    // }

    this.generalSettingsData = {
      id: this.selectedPlatform?.id,
      logo_id: this.selectedImageLogo?.id,
      icon_id: this.selectedImageSiteIcon?.id,
      description: this.selectedPlatform?.descriptions,
      email: this.siteSettingsContactBottomForm?.value?.siteEmail,
      location: this.selectedPlatform?.location
    };

    if (!this.generalSettingsData.logo_id) {
      this.generalSettingsData.logo_id = this.selectedLogoId;
    }

    if (!this.generalSettingsData.icon_id) {
      this.generalSettingsData.icon_id = this.selectedIconId;
    }

    this.siteId = 1;

  }

  public saveGeneralSettingsData(): void {
    this.settingsDataToSend();

    //if (this.selectedImageSiteIcon && this.selectedImageLogo) {
      this.settingsPageService.editSettingsPageInfo(this.generalSettingsData, this.siteId).subscribe((res) => {
        console.log(res);
        this.selectedPlatform.descriptions = res.data.descriptions;

        this.toastr.success("SETTINGS UPDATED ^_^");
      })
    //}
  }

  public deletePhoneNumber(sitePhone): void {
    this.settingsPageService.deletePhone(sitePhone.id).subscribe((res) => {
      console.log(res);
    })

    this.selectedPlatform.phones = this.selectedPlatform?.phones.filter((val) => {
      return val.id !== sitePhone.id;
    })
  }

  public getSiteDefaultLanguage(): void {
    this.settingsPageService.getDefaultLanguage().subscribe((res) => {
      this.defaultLanguage = res.data;
      console.log(res);
    })
  }

  public getSiteLanguageAdminDefault(): void {
    this.settingsPageService.getlanguageAdminDefault().subscribe((res) => {
      this.defaultAdminLanguage = res.data;
      console.log(res);
    })
  }

  public getSiteDefaultCurrency(): void {
    this.settingsPageService.getDefaultCurrency().subscribe((res) => {
      this.defaultCurrency = res.data;
      console.log(res);
    })
  }

  public getSiteDefaultWeight(): void {
    this.settingsPageService.getDefaultWeight().subscribe((res) => {
      this.defaultWeight = res.data;
      console.log(res);
    })
  }

  public getSiteDefaultLength(): void {
    this.settingsPageService.getDefaultLength().subscribe((res) => {
      this.defaultLength = res.data;
      console.log(res);
    })
  }

  public getLanguages(): void {
    this.settingsPageService.getAllLanguages().subscribe((res) => {
      this.siteLanguages = res.data;

      this.siteLanguages.forEach((val) => {
        if (val.code === this.defaultLanguage?.code) {
          this.selectedDefaultLang = this.defaultLanguage?.title;
          console.log(this.selectedDefaultLang);
        }

        if (val.code === this.defaultAdminLanguage?.code) {
          this.selectedDefaultAdminLang = this.defaultAdminLanguage?.title;
          console.log(this.selectedDefaultAdminLang);
        }
      })
    })
  }

  public getCurrencies(): void {
    this.settingsPageService.getAllCurrencies().subscribe((res) => {
      this.siteCurrencies = res.data;

      this.siteCurrencies.forEach((currency) => {
        if (currency.code === this.defaultCurrency?.code) {
          this.selectedDefaultCurrency = this.defaultCurrency?.currency_title;
          console.log(this.selectedDefaultCurrency);
        }
      })
    })
  }

  public getLenghts(): void {
    this.settingsPageService.getAllLenghts().subscribe((res) => {
      this.siteLenghts = res.data;
      console.log(this.siteLenghts);

      this.siteLenghts.forEach((length) => {
        this.allLength.push(length);
      })

      this.allLength?.forEach((val) => {
        if (val?.id === this.defaultLength?.description?.id) {
          this.selectedLength = this.defaultLength?.description?.title;
        }
      })

      console.log(this.selectedLength);
    })
  }

  public getWeightDesc(): void {
    this.settingsPageService.getWeightDescription().subscribe((res) => {
      this.siteWeightDesc = res.data;
      console.log(this.siteWeightDesc);

      this.siteWeightDesc?.forEach((val) => {
        if (val.id === this.defaultWeight?.descriptions[0]?.id) {
          this.selectedWeight = this.defaultWeight?.descriptions[0]?.unit;
        }
      })

      console.log(this.selectedWeight);
    })
  }

  public setSocialsValue(): void {
    this.siteSettingsContactBottomForm?.get('siteEmail').setValue(this.selectedPlatform?.email);

    this.selectedPlatform?.socials?.forEach((val) => {
      if (val.name === "Facebook") {
        this.siteSettingsContactBottomForm?.get('facebook').setValue(val.url);
      }

      if (val.name === "Instagram") {
        this.siteSettingsContactBottomForm?.get('instagram').setValue(val.url);
      }

      if (val.name === "Telegram") {
        this.siteSettingsContactBottomForm?.get('telegram').setValue(val.url);
      }

      if (val.name === "Viber") {
        this.siteSettingsContactBottomForm?.get('viber').setValue(val.url);
      }

      if (val.name === "Youtube") {
        this.siteSettingsContactBottomForm?.get('youtube').setValue(val.url)
      }
    });
  }

  public onChangeLocalizationLang(eventValue): void {
    this.localizationLang = eventValue;
    console.log(this.localizationLang);
  }

  public onChangeLocalizationAdminLang(eventValue): void {
    this.localizationAdminLang = eventValue;
    console.log(this.localizationLang);
  }

  public onChangeLocalizationCurrency(eventValue): void {
    this.localizationCurrency = eventValue;
    console.log(this.localizationCurrency)
  }

  public onChangeLocalizationLength(eventValue): void {
    this.localizationLength = eventValue;
    console.log(this.localizationLength);
  }

  public onChangeLocalizationWeight(eventValue): void {
    this.localizationWeight = eventValue;
    console.log(this.localizationWeight);
  }

  public saveSiteDefaultLang(): void {
    this.siteLanguages.forEach((val) => {
      if (val.title === this.localizationLang?.value) {
        this.settingsPageService.updateDefaultSiteLang(val.id, { "default": 1}).subscribe((res) => {
          console.log(res);
        })
      }
    })
  }

  public saveSiteDefaultAdminLang(): void {
    this.siteLanguages.forEach((val) => {
      if (val.title === this.localizationAdminLang?.value) {
        this.settingsPageService.updateDefaultSiteAdminLang(val.id, { "admin_default": 1 }).subscribe((res) => {
          console.log(res);
        })
      }
    })
  }

  public saveSiteCurrency(): void {
    this.siteCurrencies.forEach((currency) => {
      if (currency.currency_title === this.localizationCurrency?.value) {
        this.settingsPageService.updateDefaultSiteCurrency(currency.id, { "default": 1 }).subscribe((res) => {
          console.log(res);
        })
      }
    })
  }

  public saveSiteunitsOfMeasurement(): void {
    this.siteLenghts.forEach((length) => {
      if (length.title === this.localizationLength?.value) {
        this.settingsPageService.updateDefaultSiteLenght(length.id, { "default": 1 }).subscribe((res) => {
          console.log(res);
        })
      }
    })
  }

  public saveSiteWeight(): void {
    this.siteWeightDesc.forEach((weight) => {
      if (weight.description.title === this.localizationWeight?.value) {
        this.settingsPageService.updateDefaultSiteWeight(weight.id, { "default": 1 }).subscribe((res) => {
          console.log(res);
        })
      }
    })
  }

  public getSocials(): void {
    this.settingsPageService.getSiteSocials().subscribe((res) => {
      this.siteSocials = res.data;
    })
  }

  public socialsToSend(socialName, socialUrl, socialIconId) {
    return {
      site_id: 1,
      name: socialName,
      url: socialUrl,
      priority: 1,
      icon_id: socialIconId
    }
  }

  public saveSiteFacebookData(): void {
    let iconId = 587;

    this.siteSocials.forEach((val) => {
      if (val.name === "facebook") {
        this.settingsPageService.updateSiteSocials(
          val.id, this.socialsToSend(val.name, this.siteSettingsContactBottomForm.get('facebook').value, iconId)
        ).subscribe((res) => {
          console.log(res);
        })
      }
    })
  }

  public saveSiteInstagramData(): void {
    let iconId = 586;

    this.siteSocials.forEach((val) => {
      if (val.name === "Instagram") {
        this.settingsPageService.updateSiteSocials(
          val.id, this.socialsToSend(val.name, this.siteSettingsContactBottomForm.get('instagram').value, iconId)
        ).subscribe((res) => {
          console.log(res);
        })
      }
    })
  }

  public saveSiteTelegramData(): void {
    let iconId = 588;

    this.siteSocials.forEach((val) => {
      if (val.name === "Telegram") {
        this.settingsPageService.updateSiteSocials(
          val.id, this.socialsToSend(val.name, this.siteSettingsContactBottomForm.get('telegram').value, iconId)
        ).subscribe((res) => {
          console.log(res);
        })
      }
    })
  }

  public saveSiteViberData(): void {
    let iconId = 589;

    this.siteSocials.forEach((val) => {
      if (val.name === "Viber") {
        this.settingsPageService.updateSiteSocials(
          val.id, this.socialsToSend(val.name, this.siteSettingsContactBottomForm.get('viber').value, iconId)
        ).subscribe((res) => {
          console.log(res);
        })
      }
    })
  }

  public saveSiteYoutubeData(): void {
    let iconId = 590;

    this.siteSocials.forEach((val) => {
      if (val.name === "Youtube") {
        this.settingsPageService.updateSiteSocials(
          val.id, this.socialsToSend(val.name, this.siteSettingsContactBottomForm.get('youtube').value, iconId)
        ).subscribe((res) => {
          console.log(res);
        })
      }
    })
  }

  // public getEditSettingsPageFormData(): void {
  //   console.log(this.generalSettingsForm.value.logo);
  //   this.generalSettingsForm.value.logo = this.selectedImageLogo?.src;
  //   this.generalSettingsForm.value.siteIcon = this.selectedImageSiteIcon?.src;

  //   this.generalSettingsForm.valueChanges
  //   .subscribe(() => this.emitFormDataChanges());
  // }

  // public getGenerateShopDetailsForm() {
  //   this.shopDetailsForm.valueChanges
  //   .subscribe(() => this.settingsDataToSend());
  // }

  // public getSiteSettingsContactTopForm() {
  //   this.siteSettingsContactTopForm.valueChanges
  //   .subscribe(() => this.emitFormDataChanges());
  // }

  // public getSiteSettingsContactBottomForm() {
  //   this.siteSettingsContactBottomForm.valueChanges
  //   .subscribe(() => this.emitFormDataChanges());
  // }

  // public getSiteSettingsLocalizationForm() {
  //   this.siteSettingsLocalizationForm.valueChanges
  //   .subscribe(() => this.emitFormDataChanges());
  // }

  // emitFormDataChanges() {}
}
