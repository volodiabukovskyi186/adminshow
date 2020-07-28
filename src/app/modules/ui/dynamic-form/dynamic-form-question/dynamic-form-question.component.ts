import { Component, Input, OnInit } from "@angular/core";
import { QuestionBase } from "..";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "rap-dynamic-form-question",
  templateUrl: "./dynamic-form-question.component.html",
  styleUrls: ["./dynamic-form-question.component.scss"]
})
export class DynamicFormQuestionComponent implements OnInit {
  ngOnInit(): void {}
  @Input() question: QuestionBase<string>;
  @Input() form: FormGroup;
  get isValid() {
    return this.form.controls[this.question.key].valid;
  }
}
