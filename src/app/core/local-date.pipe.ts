/**
 * Usage: dateString | localDate:'format'
 **/

import { Pipe, PipeTransform } from "@angular/core";
import { formatDate } from "@angular/common";
import { LanguageService } from "./language.service";

@Pipe({
  name: "localDate",
})
export class LocalDatePipe implements PipeTransform {
  constructor(private lang: LanguageService) {}

  transform(value: any, format: string = "longDate") {
    if (!value) {
      return "";
    }

    // let locale = this.lang.getLanguage(this.lang.current)?.locale;
    let locale = localStorage.getItem('currentLang')

    // console.log("locale: ", locale);

    return locale ? formatDate(value, format, locale) : value;
  }
}
