import { Injectable, Inject, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { DOCUMENT } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
// import { pl } from '../../../../assets/icons/pl.svg';

export interface ILangItem {
  flag: string;
  name: string;
  locale?: string;
}

@Injectable({
  providedIn: "root",
})
export class LanguageService implements OnInit {

  constructor(
    public translate: TranslateService,
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document) {
      translate.onLangChange.subscribe(lang => {
        localStorage.setItem('currentLang',lang.lang)
        console.log('vvvvvvvv=>',lang.lang);
    });
    this.getDefaultLanguage();
    this.init();
  }

  ngOnInit(): void {
    //this.getDefaultLength();
  }

  public langs: Array<ILangItem> = [];

  getBrowserLang() {
    return this.translate.getBrowserLang();
  }

  use(language: string) {
    // get browser lang
   
    const browserLang = this.getBrowserLang();
    console.log('browserLang', browserLang);

    // if data["lang"] is null set browserLang
    let lang = language ?? browserLang;
    console.log("set lang:", lang);
   
    this.translate.use(
      lang.match(/en|pl|ru|ua/) ? lang : this.translate.defaultLang
    );
    console.log('(/en|pl|ru|ua/)', lang.match(/en|pl|ru|ua/));
    console.log('defaultLang', this.translate.defaultLang);
   
    // set lang
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

  getDefaultLanguage(): Observable<any> {
    return this.http.get(`${environment.host}getDefaultLanguage`);
  }

  init() {
    // init langs

    const pl: ILangItem = { flag: "pl", name: "pl", locale: "pl" };
    const en: ILangItem = { flag: "en", name: "en", locale: "en" };
    const ru: ILangItem = { flag: "ru", name: "ru", locale: "ru" };
    const ua: ILangItem = { flag: "ua", name: "ua", locale: "ua" };

    this.langs = [pl, en, ru, ua];

    this.getDefaultLanguage().subscribe((res) => {
      this.translate.addLangs([res.data.code, en.name]);
      this.translate.defaultLang = res.data.code;
      this.use(res.data.code);
    })

    //console.log('defaultLanggggggggg =====>>>>', defaultLang);
    //console.log('this.translate.defaultLang', this.translate.defaultLang);
  }
}
