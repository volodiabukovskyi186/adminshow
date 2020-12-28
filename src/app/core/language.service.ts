import { Injectable, Inject, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { DOCUMENT } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";


export interface ILangItem {
  flag: string;
  name: string;
  locale?: string;
  src?:string;
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
   
  }
  public langs: Array<ILangItem> = [];

  getBrowserLang() {
    return this.translate.getBrowserLang();
  }

  use(language: string) {

    const browserLang = this.getBrowserLang();

    let lang = language ?? browserLang;
  
    this.translate.use(
      lang.match(/en|pl|ru|ua/) ? lang : this.translate.defaultLang
    );
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

  getDefaultLanguage(): Observable <any> {
    return this.http.get(`${environment.host}getDefaultLanguage`);
  }

  init() {
    // init langs
    const pl: ILangItem = { flag: "pl", name: "Poland", locale: "pl", src:'assets/icons/poland.jpg' };
    const en: ILangItem = { flag: "en", name: "England", locale: "en"  ,src:'assets/icons/eangland.png'};
    const ru: ILangItem = { flag: "ru", name: "Russia", locale: "ru" , src:'assets/icons/russia.webp'};
    const ua: ILangItem = { flag: "ua", name: "Ukraine", locale: "ua", src:'assets/icons/ukraine.webp' };

    this.langs = [pl, en, ru, ua];

    this.getDefaultLanguage().subscribe((res) => {
      console.log(res);
      
      this.translate.addLangs([res.data.code, en.name]);
      this.translate.defaultLang = res.data.code;
      this.use(res.data.code);
      // if(localStorage.getItem('currentLang')){
      //   const userLang = localStorage.getItem('currentLang');
      //   this.use(userLang);
      // }
      // else{
      //   this.translate.addLangs([res.data.code, en.name]);
      //   this.translate.defaultLang = res.data.code;
      //   this.use(res.data.code);
      // }
      localStorage.setItem('currentLang',res.data.code)
    })
  }
}
