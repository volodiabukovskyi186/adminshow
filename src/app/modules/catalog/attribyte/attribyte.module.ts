import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  AttribyteFormComponent,
  AttribyteGroupFormComponent,
} from "./components";
import { FormsModule } from "@angular/forms";
import { UiModule } from "../../ui/ui.module";

const c = [AttribyteFormComponent, AttribyteGroupFormComponent];

@NgModule({
  declarations: [...c],
  exports: [...c],
  imports: [CommonModule, FormsModule, UiModule],
})
export class AttribyteModule {}
