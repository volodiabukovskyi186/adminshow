import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { IOption, IOptionValue } from "../../interfaces";
import {
  ILanguage,
  LanguageService,
} from "src/app/modules/localization/language/language.service";
import { OptionValueService } from "../../services/option-value.service";
import { OptionFormService } from "../../services/option-form.service";
import { OptionValueFormService } from "../../services/option-value-form.service";
import { fadeScale } from "src/app/modules/ui/animations";

@Component({
  animations: [fadeScale],
  selector: "app-option-form",
  templateUrl: "./option-form.component.html",
  styleUrls: ["./option-form.component.scss"],
})
export class OptionFormComponent implements OnInit {
  // @Input() model: IOption;

  private _model: IOption;
  @Output() modelChange = new EventEmitter();

  set model(val: IOption) {
    this._model = val;
    this.modelChange.emit(this._model);
    this.getOptionValues();
  }

  @Input() get model(): IOption {
    return this._model;
  }

  @Input() langs: ILanguage[];
  // @Input() title: string = "";

  constructor(
    public optionVal: OptionValueService,
    public optionValForm: OptionValueFormService,
    public langService: LanguageService
  ) {}

  ngOnInit(): void {
    this.getOptionValues();
  }

  //
  //
  //
  loading: number = 0;
  getOptionValues() {
    this.formOpen = false;
    this.loading++;
    if (this.model.id)
      this.optionVal
        .getListByOption(this.model.id)
        .subscribe(this.getOptionValuesHandler);
  }
  getOptionValuesHandler = (data) => {
    this.loading--;
    this.optionVal.data = data;
  };
  formTitle: string = "Add option value";
  formOpen: boolean = false;
  //
  // Edit option value
  edit(i: IOptionValue) {
    this.formTitle = `Edit ${i.description[0].name}`;
    this.optionValForm.initByModel(i, this.langService.languages.data);
    this.formOpen = true;
  }
  //
  // Add option value
  add() {
    this.formTitle = "Add option value";
    this.optionValForm.initEmptyModel();
    this.optionValForm.initDescription(this.langService.languages.data);
    this.formOpen = true;
  }

  save() {
    console.log("ADD/UPDATE", this.optionValForm.model);

    // THIS SHOULD NOT BE HERE ! ! !
    let c = this.optionValForm.model;

    let data = {
      option_id: this.model.id,
      image_id: c.image_id,
      sort_order: c.sort_order,
      status: c.status,
      description: [],
    };
    if (c.id != null) {
      c.description.forEach((d) => {
        data.description.push({
          id: d.id,
          lang_id: d.lang_id,
          name: d.name,
          sort_order: 1
        });
      });
      this.optionVal.put(data, c.id).subscribe(this.putHandler);
    } else {
      c.description.forEach((d) => {
        data.description.push({
          lang_id: d.lang_id,
          name: d.name,
          sort_order: 1
        });
      });
      this.optionVal.post(data).subscribe(this.postHandler);
    }
    this.loading++;
  }

  postHandler = (data) => {
    this.loading--;
    this.optionVal.data.data.push(data.data);
    this.formOpen = false;
  };

  putHandler = (data) => {
    this.loading--;
    this.formOpen = false;
  };
}
