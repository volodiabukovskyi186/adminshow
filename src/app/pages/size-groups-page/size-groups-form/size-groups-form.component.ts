import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ILanguage, LanguageService } from '../../../../app/modules/localization/language/language.service';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { LocalizationServicesService } from "../../../pages/localization/services/localization-services.service";
import { SizeGroupsService } from '../services/size-groups-page.service';

@Component({
  selector: 'app-size-groups-form',
  templateUrl: './size-groups-form.component.html',
  styleUrls: ['./size-groups-form.component.scss']
})
export class SizeGroupsFormComponent implements OnInit, OnChanges {
  @Input() sizeGroup;
  @Input() langs: ILanguage[];

  @Input() title: string = "";
  @Output() sizeGroupDescriptions: EventEmitter<any> = new EventEmitter();

  public modalOpen: boolean = true;
  public orderForm: FormGroup;
  public sizeGroupParams: any;
  public sizeGroupsForm: FormGroup;
  public items: any;
  public selectedOrder: any;
  public sortOrder: number;
  //public selectedParamsForm: FormGroup;

  constructor(
    public langService: LanguageService,
    private formBuilder: FormBuilder,
    public localizationService: LocalizationServicesService,
    public sizeGroupsService: SizeGroupsService
  ) { }

  public ngOnInit(): void {
    this.generateOrderForm();
    //this.generateSizeGroupsForm();
    //this.generateSelectedParamsForm();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.createTitleDesc();

    this.displayParams();
    this.orderForm?.get('order')?.setValue(this.sizeGroup?.sort_order);
    this.setValueInForm();
    this.sendDataForUpdate();
  }

  public generateOrderForm(): void {
    this.orderForm = new FormGroup({
      order: new FormControl('', [])
    })
  }

  public displayParams(): void {
    // this.sizeGroup?.params?.forEach((val) => {
    //   if (val.hasOwnProperty('descriptions')) {
    //     val.descriptions.forEach((param) => {
    //       this.sizeGroupParams.push(param);
    //     })
    //   }
    // })
    if (this.sizeGroup?.id) {
      this.sizeGroupsService.getSizeGroupByLang(this.sizeGroup?.id).subscribe((res) => {
        this.sizeGroupParams = res?.data?.params;
      })
    }
  }

  public removeProduct(paramIndex): void {
    this.sizeGroupParams.splice(paramIndex, 1);
  }

  public createTitleDesc(): void {
    this.sizeGroup?.descriptions.forEach((sizeGroupDesc) => {
      if (sizeGroupDesc.lang_id === 1) {
        sizeGroupDesc.short_title = 'Eng';
      }
      if (sizeGroupDesc.lang_id === 2) {
        sizeGroupDesc.short_title = 'Укр';
      }
      if (sizeGroupDesc.lang_id === 3) {
        sizeGroupDesc.short_title = 'Рус';
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

  public sendDataForUpdate(): void {
    if (this.sizeGroup) {
      this.sizeGroup.descriptions = this.sizeGroup?.descriptions?.map((val) => {
        return {
          id: val.id,
          name: val.name,
          lang_id: val.lang_id
        }
      })
    }

    this.sortOrder = this.orderForm?.value.order;

    this.sizeGroupDescriptions.emit({
      sort_order: this.sortOrder,
      description: this.sizeGroup?.descriptions
    })

    if (this.orderForm?.valueChanges) {
      this.orderForm?.valueChanges.subscribe((res) => {
        this.sizeGroupDescriptions.emit({
          sort_order: res.order,
          description: this.sizeGroup?.descriptions
        })
      })
    }

    this.createTitleDesc();
  }
}
