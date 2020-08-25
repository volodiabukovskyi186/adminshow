import { Component, OnInit, Input } from "@angular/core";
import { IAttribyteGroup } from "../../interfaces";
import { ILanguage, LanguageService } from "src/app/modules/localization/language/language.service";

@Component({
  selector: "app-attribyte-group-form",
  templateUrl: "./attribyte-group-form.component.html",
  styleUrls: ["./attribyte-group-form.component.scss"],
})
export class AttribyteGroupFormComponent implements OnInit {
  @Input() model: IAttribyteGroup;
  @Input() langs: ILanguage[];
  @Input() title: string = "";

  constructor(
    public languageService: LanguageService
  ) {}

  ngOnInit(): void {}
}
