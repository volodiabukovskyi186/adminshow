import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {LanguageService, LanguageService as LocalizationLang} from '../../../../localization/language/language.service';
import {PaymentService} from '../../../../../pages/client/services/payment.service';
import {ImagesService} from '../../../../gallery/images.service';
import {IProdImage, ProductImagesService} from '../../../product/services/product-images.service';
import {IImage} from '../../../../gallery/folder/interfaces';
import {OptionService} from '../../services/option.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-option-information',
  templateUrl: './option-information.component.html',
  styleUrls: ['./option-information.component.scss']
})
export class OptionInformationComponent implements OnInit {
  @Input() selected;

  modalOpen = false;
  @Input() public descr: FormControl = new FormControl();

  public langShortTitle = {
    '1' : {
      title: 'settings.settingsLangShortTitleEng'
    },
    '2': {
      title: 'settings.settingsLangShortTitleUa'
    },
    '3': {
      title: 'settings.settingsLangShortTitleRus'
    },
    '4': {
      title: 'settings.settingsLangShortTitlePl'
    }
  };
  constructor(public languageService: LocalizationLang,
              public langService: LanguageService,
              public paymentService: PaymentService,
              public image: ImagesService,
              private option: OptionService,
              protected toastr: ToastrService,
             ) {
  }
  ngOnInit(): void {
    this.sub();
  }
  sub(): void {
    this.paymentService.bSubject.subscribe(data => {
      this.selected = data;
    });

  }
  save = () => {
    const option = {
      type: this.selected.type,
      sort_order: this.selected.sort_order,
      status: this.selected.status,
      description: [
        {
          id: this.selected.description[0].id,
          lang_id: 1,
          name: this.selected.description[0].name
        },
        {
          id: this.selected.description[1].id,
          lang_id: 2,
          name: this.selected.description[1].name
        },
        {
          id: this.selected.description[2].id,
          lang_id: 3,
          name: this.selected.description[2].name
        },
        {
          id: this.selected.description[3].id,
          lang_id: 4,
          name: this.selected.description[3].name
        }
      ]
    };
    if (this.selected.id) {
      this.option.put(option, this.selected.id).subscribe(() => {
        this.toastr.success('option UPDATED ^_^');
      });
    } else {
      this.option.post(option).subscribe(() => {
        this.toastr.success('option ADDED');
      });
    }
    // this.ngxService.start();
  };



}
