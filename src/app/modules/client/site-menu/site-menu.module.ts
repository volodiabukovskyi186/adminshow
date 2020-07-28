import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteMenuFormComponent } from './components/site-menu-form/site-menu-form.component';
import { UiModule } from '../../ui/ui.module';
import { FormsModule } from '@angular/forms';
import { GalleryModule } from '../../gallery/gallery.module';

const c = [SiteMenuFormComponent];

@NgModule({
  declarations: [...c],
  exports: [...c],
  imports: [CommonModule, UiModule, FormsModule, GalleryModule],
})
export class SiteMenuModule { }
