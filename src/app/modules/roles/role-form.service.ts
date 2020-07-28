import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import {
  QuestionBase,
  CheckboxGroupQuestion,
  TextboxQuestion
} from "../ui/dynamic-form";
import { Role } from "./models/role";
import { Permission } from "src/app/core/permission/permission";
import { ALL_PERMISSIONS } from './models/all-permissions';
@Injectable({
  providedIn: "root"
})
export class RoleFormService {
  questions$: Observable<QuestionBase<any>[]>;
  // ALL_PERMISSION = ALL_PERMISSIONS;
  constructor() {}

  private getPermissions(permissions: Permission[] = []) {
    let result = [];

    ALL_PERMISSIONS.forEach(p => {
      console.log(p);
      
      let v = this.foo(permissions, p.key).length > 0;
      result.push({ key: p.key, label: p.label, value: v });
    });

    return result;
  }

  foo(permissions: Permission[], name: string) {
    var result = permissions.filter(obj => {
      return obj.name === name;
    });
    return result;
  }



  getQuestions(role: Role = null): Observable<QuestionBase<string>[]> {
    let questions: QuestionBase<string>[] = [];
    if (role == null) {
      questions = [
        new CheckboxGroupQuestion({
          key: "permissions",
          label: "Permissions",
          order: 2,
          child: this.getPermissions()
        }),

        new TextboxQuestion({
          key: "name",
          label: "Role name",
          // value: "Client",
          required: true,
          order: 1
        })
      ];
    } else {
      
      
      questions = [
        new CheckboxGroupQuestion({
          key: "permissions",
          label: "Permissions",
          order: 2,
          child: this.getPermissions(role.permissions)
        }),

        new TextboxQuestion({
          key: "name",
          label: "Role name",
          value: role.name,
          required: true,
          order: 1
        })
      ];
    }

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
