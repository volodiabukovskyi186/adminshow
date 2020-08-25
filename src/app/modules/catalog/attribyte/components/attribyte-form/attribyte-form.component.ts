import { Component, OnInit, Input } from "@angular/core";
import { IAttribyteGroup, IAttribyte } from "../../interfaces";
import { ILanguage, LanguageService } from "src/app/modules/localization/language/language.service";

@Component({
  selector: "app-attribyte-form",
  templateUrl: "./attribyte-form.component.html",
  styleUrls: ["./attribyte-form.component.scss"],
})
export class AttribyteFormComponent implements OnInit {
  @Input() model: IAttribyte;
  @Input() groups: IAttribyteGroup[];
  @Input() langs: ILanguage[];
  @Input() title: string = "";

  constructor(
    public languageService: LanguageService
  ) {}

  ngOnInit(): void {}
}
