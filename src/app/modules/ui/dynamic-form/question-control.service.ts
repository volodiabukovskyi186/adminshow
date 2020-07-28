import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { QuestionBase } from "./question-base";

@Injectable({
  providedIn: "root"
})
export class QuestionControlService {
  constructor() {}

  toFormGroup(questions: QuestionBase<string>[]) {
    let group: any = {};

    questions.forEach(question => {
      if (question.child) {
        group[question.key] = this.toFormGroup(question.child);
      } else {
        group[question.key] = question.required
          ? new FormControl(question.value || "", Validators.required)
          : new FormControl(question.value || "");
      }
    });
    return new FormGroup(group);
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
