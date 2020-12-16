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

  @Input() selected;
  // @Input() optionValue;
  @Input() selectedValue;
  @Input() model: IOption;

  constructor(
    public langService: LanguageService
  ) {}
  ngOnInit(): void {

  }


}
