import { Component, OnInit, Input } from '@angular/core';
import { ISiteMenu } from '../../site-menu.service';
import { LanguageService as LocalizationLang } from "src/app/modules/localization/language/language.service";

@Component({
  selector: 'app-site-menu-form',
  templateUrl: './site-menu-form.component.html',
  styleUrls: ['./site-menu-form.component.scss']
})
export class SiteMenuFormComponent implements OnInit {

  @Input() model: ISiteMenu;
  @Input() title: string = "";

  constructor(
    public languageService: LocalizationLang
  ) {}
  ngOnInit(): void {}

}
