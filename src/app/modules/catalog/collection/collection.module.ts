import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CollectionFormComponent } from "./components/collection-form/collection-form.component";
import { UiModule } from "../../ui/ui.module";
import { FormsModule } from "@angular/forms";
import { GalleryModule } from "../../gallery/gallery.module";
import { CollectionPageComponent } from "./components/collection-page/collection-page.component";
import { CollectionRoutingModule } from "./collection-routing.module";
import { TranslateModule } from "@ngx-translate/core";
import { CoreModule } from 'src/app/core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideModule } from 'ng-click-outside';

const c = [CollectionFormComponent];

@NgModule({
  declarations: [...c, CollectionPageComponent],
  exports: [...c],
  imports: [
    CommonModule,
    UiModule,
    CoreModule,
    FormsModule,
    GalleryModule,
    TranslateModule,
    CollectionRoutingModule,
    ReactiveFormsModule,
    ClickOutsideModule,
  ],
})
export class CollectionModule {}
