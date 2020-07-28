import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FolderComponent } from "./folder/folder.component";
import { FormsModule } from "@angular/forms";
import { UiModule } from "../ui/ui.module";
import { UploadImageDropFormComponent } from "./upload-image-drop-form/upload-image-drop-form.component";
import { FileComponent } from "./file/file.component";
import { NgxFilesizeModule } from "ngx-filesize";
import { UploadImageListComponent } from "./upload-image-list/upload-image-list.component";
import { GalleryViewComponent } from "./gallery-view/gallery-view.component";
import { ChoiceButtonComponent } from "./choice-button/choice-button.component";
import { AlbumBreadcrumbComponent } from "./album-breadcrumb/album-breadcrumb.component";
import { AlbumBreadcrumbsComponent } from "./album-breadcrumbs/album-breadcrumbs.component";

const c = [
  FolderComponent,
  UploadImageDropFormComponent,
  FileComponent,
  UploadImageListComponent,
  GalleryViewComponent,
  ChoiceButtonComponent,
  AlbumBreadcrumbComponent,
  AlbumBreadcrumbsComponent,
];

@NgModule({
  declarations: [...c],
  exports: [...c],
  imports: [CommonModule, FormsModule, UiModule, NgxFilesizeModule],
})
export class GalleryModule {}
