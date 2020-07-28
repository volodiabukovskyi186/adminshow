import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewChild,
} from "@angular/core";

import { Observable } from "rxjs";
import { QuestionBase } from "../../ui/dynamic-form";
import { DynamicFormComponent } from "../../ui/dynamic-form/dynamic-form/dynamic-form.component";
import { RoleFormService } from "../role-form.service";

@Component({
  selector: "app-role-form",
  templateUrl: "./role-form.component.html",
  styleUrls: ["./role-form.component.scss"],
})
export class RoleFormComponent implements OnInit {
  @ViewChild(DynamicFormComponent) dynamicForm: DynamicFormComponent;

  @Input() questions$: Observable<QuestionBase<any>[]>;
  @Input() title: string = "";

  public submitForm() {
    this.dynamicForm.onSubmit();
  }

  @Output() formSubmit: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {}

  constructor(public roleFormService: RoleFormService) {}

  onSubmit(data: any) {
    this.formSubmit.emit(data);
  }
}
