import { ProductImagesService, IProdImage } from './../../../catalog/product/services/product-images.service';
import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {LanguageService, LanguageService as LocalizationLang} from "../../language/language.service";
import {PaymentService} from "../../../../pages/client/services/payment.service";
import { ImagesService } from 'src/app/modules/gallery/images.service';
import { IImage } from 'src/app/modules/gallery/folder/interfaces';

@Component({
  selector: 'app-country-form-main',
  templateUrl: './country-form-main.component.html',
  styleUrls: ['./country-form-main.component.scss']
})
export class CountryFormMainComponent implements OnInit {

  @Input() selected;
  arrOrders:Array<any>
  oneOrderStatus:any;
  modalOpen: boolean = false;
  @Input() public descr: FormControl = new FormControl();
  constructor(public languageService: LocalizationLang,
              public langService: LanguageService,
              public paymentService: PaymentService,
              public image: ImagesService,
              public prodImage: ProductImagesService,) {
  }
  ngOnInit(): void {
    this.sub()
  }
  sub():void{
    this.paymentService.bSubject.subscribe(data=>{
      this.selected = data;
    })
    console.log( this.selected)
  }

  getProdImages() {
    // this.prodImage
    //   .getByProdId(this.model.id)
    //   .subscribe(this.getProdImagesHandler);
    this.image.select.subscribe(this.selectHandler);
  }
  selectHandler = (data) => {
    let list: IImage[] = this.image.getSelected();
      console.log(data,"<=======")
    if (list[0]) {
      const selectedImage: IImage = list[0];
      this.selected.image_id = selectedImage.id;
      this.selected.image.src = selectedImage.src;
      this.selected.image.src_mini = selectedImage.src_mini;
      this.selected.host = selectedImage.host;
      this.modalOpen = false;
      console.log('selectImage==>',selectedImage)
    }
  };

  onOk() {
    console.log(this.selected,'<=====null')
    let list: IImage[] = this.image.getSelected();
    // this.prodImage.pushImages(list, this.model.id);
    this.selected.image_id=list[0].id
    this.selected.image.src = list[0].src;
    this.selected.image.src_mini = list[0].src_mini;
    console.log(list)
    this.modalOpen = false;
  }

  onReset() {
    this.selected.image_id = null;
    this.selected.host = null;
    this.selected.image = {
      src: "assets/icons/color-none-image.svg",
      src_mini: "assets/icons/color-none-image.svg",
    };
  }



  onDeleteImage(prodImage: IProdImage) {
    this.prodImage.deleteProdImage(prodImage);
  }

  onPress() {
    this.modalOpen = true;
  }
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

}
