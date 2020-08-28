import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoryFormComponent } from "./category-form/category-form.component";
import { FormsModule } from "@angular/forms";
import { UiModule } from "../../ui/ui.module";
import { GalleryModule } from "../../gallery/gallery.module";
import { CategoryRoutingModule } from "./category-routing.module";
import { TranslateModule } from "@ngx-translate/core";
import { CategoryPageComponent } from "./category-page/category-page.component";
import { CoreModule } from 'src/app/core/core.module';
import { AngularEditorModule } from '@kolkov/angular-editor';

const c = [CategoryFormComponent];

@NgModule({
  declarations: [...c, CategoryPageComponent],
  exports: [...c],
  imports: [
    CommonModule,
    CoreModule,
    UiModule,
    FormsModule,
    GalleryModule,
    TranslateModule,
    CategoryRoutingModule,
    AngularEditorModule,
  ],
})
export class CategoryModule {}
