import { Component, OnInit, Input } from "@angular/core";
import { IOption } from "../../interfaces";
import {
  LanguageService,
} from "src/app/modules/localization/language/language.service";
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
