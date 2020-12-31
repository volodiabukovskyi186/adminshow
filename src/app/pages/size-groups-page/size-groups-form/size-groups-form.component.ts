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
  public sizeGroupParams = [];
  //public selectedParamsForm: FormGroup;

  constructor(
    public langService: LanguageService
  ) { }

  public ngOnInit(): void {
    this.generateOrderForm();
    //this.generateSelectedParamsForm();
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

    this.displayParams();
  }

  public generateOrderForm(): void {
    this.orderForm = new FormGroup({
      order: new FormControl('', [])
    })
  }

  public displayParams(): void {
    this.sizeGroup?.params?.forEach((val) => {
      if (val.hasOwnProperty('descriptions')) {
        val.descriptions.forEach((param) => {
          this.sizeGroupParams.push(param);
        })
      }
    })

    console.log('this.sizeGroupParams', this.sizeGroupParams);
  }

  public removeProduct(paramIndex): void {
    console.log(paramIndex);
    this.sizeGroupParams.splice(paramIndex, 1);

    console.log('this.sizeGroupParams === >> after remove', this.sizeGroupParams);
    //sthis.selectedProducts.emit(this.products);
  }

  // public generateSelectedParamsForm(): void {
  //   this.selectedParamsForm = new FormGroup({
  //     params: new FormControl('', [])
  //   })
  // }

  // public setValueInSelectedParamsForm(): void {
  //   this.sizeGroup?.params[0]?.descriptions?.forEach((val) => {
  //     this.selectedParamsForm?.controls['params']?.setValue(val.name);
  //   })
  // }

}
