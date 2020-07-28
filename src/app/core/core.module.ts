import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LocalDatePipe } from "./local-date.pipe";

@NgModule({
  declarations: [LocalDatePipe],
  exports: [LocalDatePipe],
  imports: [CommonModule],
  providers: [LocalDatePipe],
})
export class CoreModule {}
