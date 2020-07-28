import { Component, OnInit, Input } from "@angular/core";
import { ImagesService } from "../images.service";
import { ViewMode, IAlbum, IAlbumResponse, IImage } from "../folder/interfaces";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ToastrService } from "ngx-toastr";
import { deleted, fadeScale, fade } from "../../ui/animations";
import { AlbumService } from "../album.service";

@Component({
  animations: [deleted, fadeScale, fade],
  selector: "app-gallery-view",
  templateUrl: "./gallery-view.component.html",
  styleUrls: ["./gallery-view.component.scss"],
})
export class GalleryViewComponent implements OnInit {
  @Input() editable: boolean = false;
  @Input() selectable: boolean = false;
  @Input() singleSelectable: boolean = false;
  @Input() mode: ViewMode = ViewMode.card;
  ViewMode = ViewMode;

  constructor(
    public album: AlbumService,
    public image: ImagesService,
    private ngxService: NgxUiLoaderService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.startLoad();
  }

  startLoad() {
    this.ngxService.start();

    this.album.albums.data = [];
    this.image.images.data = [];

    this.album.getAlbums().subscribe(this.getAlbumsHandler);
    this.album.getAllParent().subscribe(this.getAllParentHandler);
    this.image
      .getImages(this.album.activeAlbum?.id)
      .subscribe(this.getImagesHandler);
  }

  //#region albums

  onDelete(album: IAlbum) {
    this.ngxService.start();
    this.album.deleteAlbum(album).subscribe(this.deleteAlbumHandler);
  }

  onEdit(album: IAlbum) {
    this.ngxService.start();
    if (album.id) this.album.putAlbum(album).subscribe(this.putAlbumHandler);
    else this.album.createAlbum(album).subscribe(this.createAlbumHandler);
  }

  deleteAlbumHandler = (data: any) => {
    this.ngxService.stopAll();
    this.album.delteFromList();
    this.toastr.success("Album success deleted");
  };

  getAlbumsHandler = (data: IAlbumResponse) => {
    this.ngxService.stop();
    this.album.albums = data;
  };

  getAllParentHandler = (data) => {
    this.ngxService.stop();
    let root = {
      id: null,
      parent_id: null,
      title: "📁",
    };
    this.album.albumBreadcrumbs = [root, ...data.data];
  };

  createAlbumHandler = (data) => {
    this.ngxService.stopAll();
    this.album.albums.data.push(data.data);
    this.album.newAlbums = [];
    this.toastr.success("Album success created" + data.title);
  };

  putAlbumHandler = (data: any) => {
    this.ngxService.stopAll();
    this.album.updateFromList(data.data);
    this.toastr.success("Album success updated to " + data.title);
  };

  onCancel(al) {
    this.album.newAlbums = [];
  }

  //#endregion

  //#region images

  getImagesHandler = (data) => {
    this.ngxService.stop();
    this.image.images = data;
  };

  onDeleteImage(image: IImage) {
    this.ngxService.start();
    this.image.deleteImage(image).subscribe(this.deleteImageHandler);
  }
  deleteImageHandler = () => {
    this.ngxService.stopAll();
    this.image.deleteImageFromList();
    this.toastr.success("Image success deleted");
  };

  //#endregion

  onOpenAlbum(album: IAlbum) {
    this.album.activeAlbum = album;
    this.startLoad();
  }
  //

  openImage(e: Event, img: IImage) {
    if (this.selectable) {
      e.preventDefault();
      this.selectImage(img);
    }
  }

  spaceKeyDown(e: KeyboardEvent, img: IImage) {
    if (this.selectable && e.keyCode == 32) {
      e.preventDefault();
      this.selectImage(img);
    }
  }

  selectImage(img: IImage) {
    if (this.singleSelectable) this.image.resetSelected(img);
    img.selected = img.selected ? !img.selected : true;
    this.image.select.emit();
  }
}
