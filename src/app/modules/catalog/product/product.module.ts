import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductFormComponent } from "./components/product-form/product-form.component";
import { FormsModule } from "@angular/forms";
import { UiModule } from "../../ui/ui.module";
import { GalleryModule } from "../../gallery/gallery.module";
import { DescriptionComponent } from "./components/layouts/description/description.component";
import { BaseComponent } from "./components/layouts/base/base.component";
import { DataComponent } from "./components/layouts/data/data.component";
import { CodesComponent } from "./components/layouts/codes/codes.component";
import { NgxSelectModule } from "ngx-select-ex";
import { CategoryComponent } from "./components/layouts/category/category.component";
import { ImagesComponent } from './components/layouts/images/images.component';
import { AttributesComponent } from './components/layouts/attributes/attributes.component';
import { AttibuteValueComponent } from './components/layouts/attibute-value/attibute-value.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TranslateModule } from "@ngx-translate/core";

const c = [ProductFormComponent];

@NgModule({
  declarations: [
    ...c,
    DescriptionComponent,
    BaseComponent,
    DataComponent,
    CodesComponent,
    CategoryComponent,
    ImagesComponent,
    AttributesComponent,
    AttibuteValueComponent,
  ],
  exports: [...c],
  imports: [
    CommonModule,
    FormsModule,
    UiModule,
    GalleryModule,
    NgxSelectModule,
    AngularEditorModule,
    TranslateModule,
  ],
})
export class ProductModule {}
