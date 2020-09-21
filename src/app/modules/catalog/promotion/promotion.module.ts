import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PromotionFormComponent } from "./components/promotion-form/promotion-form.component";
import { UiModule } from "../../ui/ui.module";
import { FormsModule } from "@angular/forms";
import { GalleryModule } from "../../gallery/gallery.module";
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ClickOutsideModule } from 'ng-click-outside';
import { TranslateModule } from "@ngx-translate/core";
import { AngularEditorModule } from '@kolkov/angular-editor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const c = [PromotionFormComponent];

@NgModule({
  declarations: [...c],
  exports: [...c],
  imports: [
    CommonModule, 
    UiModule, 
    FormsModule, 
    GalleryModule, 
    MatInputModule, 
    ReactiveFormsModule,
    MatTreeModule,
    MatIconModule, 
    MatButtonModule,
    ClickOutsideModule,
    TranslateModule,
    AngularEditorModule,
    BrowserAnimationsModule,
  ],
})
export class PromotionModule {}
