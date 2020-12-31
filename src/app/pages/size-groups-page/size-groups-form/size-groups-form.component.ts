import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ILanguage, LanguageService } from '../../../../app/modules/localization/language/language.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-size-groups-form',
  templateUrl: './size-groups-form.component.html',
  styleUrls: ['./size-groups-form.component.scss']
})
export class SizeGroupsFormComponent implements OnInit, OnChanges {
  @Input() sizeGroup;
  @Input() langs: ILanguage[];

  @Input() title: string = "";

  public modalOpen: boolean = true;
  public orderForm: FormGroup;

  constructor(
    public langService: LanguageService
  ) { }

  public ngOnInit(): void {
    this.generateOrderForm();
  }

  public ngOnChanges(): void {
    this.sizeGroup?.descriptions.forEach((sizeGroupDesc) => {
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

  public generateOrderForm(): void {
    this.orderForm = new FormGroup({
      order: new FormControl('', [])
    })
  }

}
