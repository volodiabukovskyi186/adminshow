import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PromotionFormComponent } from "./components/promotion-form/promotion-form.component";
import { UiModule } from "../../ui/ui.module";
import { FormsModule } from "@angular/forms";
import { GalleryModule } from "../../gallery/gallery.module";

const c = [PromotionFormComponent];

@NgModule({
  declarations: [...c],
  exports: [...c],
  imports: [CommonModule, UiModule, FormsModule, GalleryModule],
})
export class PromotionModule {}
