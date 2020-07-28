import { QuestionBase } from './question-base';

export class CheckboxGroupQuestion extends QuestionBase<string> {
  controlType = 'checkbox-group';
  type: "checkbox";
  child: QuestionBase<string>[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.child = options['child'] || [];
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/