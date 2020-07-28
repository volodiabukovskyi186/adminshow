import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { DynamicFormComponent } from 'src/app/modules/ui/dynamic-form/dynamic-form/dynamic-form.component';
import { Observable } from 'rxjs';
import { QuestionBase } from 'src/app/modules/ui/dynamic-form';
import { LanguageFormService } from '../language-form.service';

@Component({
  selector: 'app-language-form',
  templateUrl: './language-form.component.html',
  styleUrls: ['./language-form.component.scss']
})
export class LanguageFormComponent implements OnInit {

  @ViewChild(DynamicFormComponent) dynamicForm: DynamicFormComponent;

  @Input() questions$: Observable<QuestionBase<any>[]>;
  @Input() title: string = "";

  public submitForm() {
    this.dynamicForm.onSubmit();
  }

  @Output() formSubmit: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {}

  constructor(public LangFormService: LanguageFormService) {}

  onSubmit(data: any) {
    this.formSubmit.emit(data);
  }

}
