import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ILanguage, LanguageService } from '../../../../app/modules/localization/language/language.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-size-params-form',
  templateUrl: './size-params-form.component.html',
  styleUrls: ['./size-params-form.component.scss']
})
export class SizeParamsFormComponent implements OnInit, OnChanges {
  @Input() sizeParams;
  @Input() langs: ILanguage[];

  public orderParamsForm: FormGroup;

  constructor(
    public langService: LanguageService
  ) { }

  public ngOnChanges(): void {
    this.sizeParams?.descriptions.forEach((sizeGroupDesc) => {
      if (sizeGroupDesc.lang_id === 1) {
        sizeGroupDesc.short_title = 'Eng';
      }
      if (sizeGroupDesc.lang_id === 2) {
        sizeGroupDesc.short_title = 'Укр';
      }
      if (sizeGroupDesc.lang_id === 3) {
        sizeGroupDesc.short_title = 'Рос';
      }
      if (sizeGroupDesc.lang_id === 4) {
        sizeGroupDesc.short_title = 'Pl';
      }
    })
  }

  public ngOnInit(): void {
    this.generateOrderParamsForm();
  }

  public generateOrderParamsForm(): void {
    this.orderParamsForm = new FormGroup({
      order: new FormControl('', [])
    })
  }

}
