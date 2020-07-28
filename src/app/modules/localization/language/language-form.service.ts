import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { QuestionBase, TextboxQuestion } from "../../ui/dynamic-form";
import { ILanguage } from "./language.service";

@Injectable({
  providedIn: "root",
})
export class LanguageFormService {
  questions$: Observable<QuestionBase<any>[]>;

  constructor() {}

  getQuestions(lang: ILanguage = null): Observable<QuestionBase<string>[]> {
    let questions: QuestionBase<string>[] = [
      new TextboxQuestion({
        key: "code",
        label: "Lang code",
        value: lang?.code ?? "code",
        required: true,
        order: 1,
      }),
      new TextboxQuestion({
        key: "title",
        label: "Lang title",
        value: lang?.title ?? "tile",
        required: true,
        order: 3,
      }),

      new TextboxQuestion({
        key: "short_title",
        label: "Lang short title",
        value: lang?.short_title ?? "sh t",
        required: true,
        order: 4,
      }),

      new TextboxQuestion({
        key: "flag",
        label: "Lang flag (emojipedia.org/flags)",
        value: lang?.flag ?? "flag",
        required: true,
        order: 1,
      }),

      new TextboxQuestion({
        key: "locate",
        label: "Lang locate (UK, GR, etc.)",
        value: lang?.locate ?? "locate",
        required: true,
        order: 2,
      }),

      new TextboxQuestion({
        key: "available",
        label: "Lang available",
        value: lang?.available ?? "0",
        required: true,
        order: 5,
        type: "number",
        max: 0,
      }),

      new TextboxQuestion({
        key: "default",
        label: "Lang default",
        value: lang?.default ?? "0",
        type: "hidden",
        required: true,
        order: 6,
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
