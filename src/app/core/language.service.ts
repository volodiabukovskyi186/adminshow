import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

export interface ILangItem {
  flag: string;
  name: string;
  locale?: string;
}

@Injectable({
  providedIn: "root",
})
export class LanguageService {
  constructor(public translate: TranslateService) {
    this.init();
  }

  langs: Array<ILangItem> = [];

  getBrowserLang() {
    return this.translate.getBrowserLang();
  }

  use(language: string) {
    // get browser lang
    const browserLang = this.getBrowserLang();

    // if data["lang"] is null set browserLang
    let lang = language ?? browserLang;

    console.log("set lang:", lang);

    // set lang
    this.translate.use(
      lang.match(/en|pl|ru|ua/) ? lang : this.translate.defaultLang
    );
    console.log("CURRENT LANG: ", this.translate.currentLang);
  }

  public get routeLang(): string {
    return this.translate.currentLang != undefined &&
      this.translate.defaultLang != this.translate.currentLang
      ? this.translate.currentLang
      : "";
  }

  get current() {
    return this.translate.currentLang;
  }

  getLanguage(langName: string) {
    for (let i = 0; i < this.langs.length; i++) {
      const lang = this.langs[i];
      if (lang.name == langName) {
        return lang;
      }
    }
  }

  init() {
    // init langs
    const pl: ILangItem = { flag: "🇵🇱", name: "pl", locale: "pl" };
    const en: ILangItem = { flag: "🇺🇸", name: "en", locale: "en" };
    const ru: ILangItem = { flag: "🇷🇺", name: "ru", locale: "ru" };
    const ua: ILangItem = { flag: "🇺🇦", name: "ua", locale: "ua" };

    let defaultLang = pl;

    this.langs = [pl, en, ru, ua];
    this.translate.addLangs([defaultLang.name, en.name]);
    this.translate.defaultLang = defaultLang.name;
    this.use(defaultLang.name);
  }
}
