import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PermissionDirective } from "./permission.directive";
import { PermissionItemComponent } from './permission/permission-item.component';

const EXPORTS = [PermissionDirective, PermissionItemComponent];

@NgModule({
  declarations: [...EXPORTS],
  imports: [CommonModule],
  exports: [...EXPORTS]
})
export class PermissionModule {}
