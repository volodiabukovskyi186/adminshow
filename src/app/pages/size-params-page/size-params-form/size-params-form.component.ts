import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ILanguage, LanguageService } from '../../../../app/modules/localization/language/language.service';
import { FormGroup, FormControl } from '@angular/forms';
import { LocalizationServicesService } from "../../../pages/localization/services/localization-services.service";
import { SizeGroupsService } from '../../../pages/size-groups-page/services/size-groups-page.service';

@Component({
  selector: 'app-size-params-form',
  templateUrl: './size-params-form.component.html',
  styleUrls: ['./size-params-form.component.scss']
})
export class SizeParamsFormComponent implements OnInit, OnChanges {
  @Input() sizeParams;
  @Input() langs: ILanguage[];

  @Output() sizeGroupParamsDescriptions: EventEmitter<any> = new EventEmitter();

  public orderParamsForm: FormGroup;
  public selectedOrder: any;
  public sortOrder: number;
  public arrSizeGroup: any;
  public selectedSizeParamId: number;

  constructor(
    public langService: LanguageService,
    public localizationService: LocalizationServicesService,
    public sizeGroupsService: SizeGroupsService
  ) { }

  public ngOnChanges(): void {
    this.createTitleDesc();
    this.orderParamsForm?.get('order')?.setValue(this.sizeParams?.group?.sort_order);
    this.getAllSizeGroup();

    this.setValueInForm();
    this.sendDataForUpdate();
  }

  public ngOnInit(): void {
    this.generateOrderParamsForm();
  }

  public generateOrderParamsForm(): void {
    this.orderParamsForm = new FormGroup({
      order: new FormControl('', [])
    })
  }
  
  public createTitleDesc(): void {
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

  public setValueInForm(): void {
    this.localizationService.bSubject.subscribe(data=>{
      this.selectedOrder = data;
    })
  }

  public getAllSizeGroup(): void {
    this.sizeGroupsService.getList().subscribe(data => {
      this.arrSizeGroup = data.data;
      console.log('all', this.arrSizeGroup);
    });
  }

  public selectGroup(sizeGroupId): void {
    if (this.sizeParams) {
      this.sizeParams.group_id = sizeGroupId;
    }

    console.log(sizeGroupId);
    //this.sizeParams.group_id = sizeGroupId;
  }

  public sendDataForUpdate(): void {
    if (this.sizeParams) {
      this.sizeParams.descriptions = this.sizeParams?.descriptions?.map((val) => {
        return {
          id: val.id,
          name: val.name,
          lang_id: val.lang_id
        }
      })
    }

    this.sortOrder = this.orderParamsForm?.value.order;

    console.log('this.selectedSizeParamId ===== >>>', this.selectedSizeParamId);

    this.sizeGroupParamsDescriptions.emit({
      group_id: this.sizeParams?.group_id,
      sort_order: this.sortOrder,
      description: this.sizeParams?.descriptions
    })

    if (this.orderParamsForm?.valueChanges) {
      this.orderParamsForm?.valueChanges.subscribe((res) => {
        this.sizeGroupParamsDescriptions.emit({
          group_id: this.sizeParams?.group_id,
          sort_order: res.order,
          description: this.sizeParams?.descriptions
        })
      })
    }

    debugger;

    this.createTitleDesc();
  }

}
