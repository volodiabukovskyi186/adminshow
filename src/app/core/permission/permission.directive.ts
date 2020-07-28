import { Directive, TemplateRef, ViewContainerRef, Input } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { PermissionService } from "./permission.service";

@Directive({
  selector: "[permission]",
})
export class PermissionDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permissionService: PermissionService
  ) {}

  @Input("permission") permissions: Array<string>;

  difference(arr1: Array<string>, arr2: Array<string>): Array<string> {
    return arr1.filter((x) => !arr2.includes(x));
  }

  public ngOnInit() {
    let diff = this.difference(
      this.permissions,
      this.permissionService.permissions
    );

    if (diff.length == 0) {
      // If condition is true add template to DOM
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      // Else remove template from DOM
      this.viewContainer.clear();
    }
  }
}
