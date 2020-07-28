import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SitePageFormComponent } from "./components/site-page-form/site-page-form.component";
import { UiModule } from "../../ui/ui.module";
import { FormsModule } from "@angular/forms";
import { GalleryModule } from "../../gallery/gallery.module";
import { FroalaEditorModule, FroalaViewModule } from "angular-froala-wysiwyg";

const c = [SitePageFormComponent];

@NgModule({
  declarations: [...c],
  exports: [...c],
  imports: [
    CommonModule,
    UiModule,
    FormsModule,
    GalleryModule,
    FroalaEditorModule,
    FroalaViewModule,
  ],
})
export class SitePageModule {}
