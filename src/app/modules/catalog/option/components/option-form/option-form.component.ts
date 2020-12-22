import { Component, OnInit, Input, OnChanges, SimpleChanges } from "@angular/core";
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
  @Input() isOptionEdited: boolean;

  //public isOptionSelected: boolean = false;

  constructor(
    public langService: LanguageService
  ) {}

  // public ngOnChanges(changes: SimpleChanges) {
  //   if (changes.isOptionEdited) {
  //     this.isOptionSelected = true;
  //   }
  // }

  public ngOnInit(): void {}

}
