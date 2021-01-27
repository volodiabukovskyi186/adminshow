import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { ImagesService } from "../images.service";
import { ViewMode, IAlbum, IAlbumResponse, IImage } from "../folder/interfaces";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ToastrService } from "ngx-toastr";
import { deleted, fadeScale, fade } from "../../ui/animations";
import { AlbumService } from "../album.service";
import { UserService } from '../../user/user.service';

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

  @ViewChild('selectedAlbum') selectedAlbum: ElementRef<HTMLElement>;

  ViewMode = ViewMode;

  public albumId: number;
  public parent: string;
  public currentUserRoleId: number;
  public albumIdManager: number;
  public albumManagerFolder: any;

  constructor(
    public album: AlbumService,
    public image: ImagesService,
    public userService: UserService,
    private ngxService: NgxUiLoaderService,
    private toastr: ToastrService
  ) {}

  public ngOnInit(): void {
    //this.getAlbumsByManager();
    this.getUserByToken();
  }

  getUserByToken(): void {
    this.userService.getByToken().subscribe((res) => {
      this.currentUserRoleId = res.data.user.role_id;
      this.albumIdManager = res.data.user.album_id;
      this.startLoad();
    });
  }

  startLoad() {
    this.ngxService.start();

    this.album.albums.data = [];
    this.image.images.data = [];

    if (this.currentUserRoleId === 1) {
      this.album.getAlbums().subscribe(this.getAlbumsHandler);

      this.image
      .getImages(this.album.activeAlbum?.id)
      .subscribe(this.getImagesHandler);

    } else {
      this.album.getAlbumsByManager(this.albumIdManager).subscribe((res) => {
        console.log(res);
        this.album.albums.data = res.data;

        if (this.album.activeAlbum.id) {
          this.album.albums.data = this.album.albums.data.filter((val) => { return (val.id === this.album.activeAlbum.id) && !this.album.activeAlbum.id});
        } else {
          this.album.albums.data = res.data;
        }

        this.image
        .getManagerImages(this.album.activeAlbum?.id || this.albumIdManager)
        .subscribe(this.getImagesHandler);
      })
    }

    this.album.getAllParent().subscribe(this.getAllParentHandler);

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

  getImages() {
    this.ngxService.start();
    this.image.getImages(this.album.activeAlbum?.id).subscribe(this.getListHandler);
  }

  getListHandler = (data) => {
    this.ngxService.stopAll();
    this.image.images = data;
  };

  deleteAlbumHandler = (data: any) => {
    this.ngxService.stopAll();
    this.album.delteFromList();
    this.toastr.success("Album successfully deleted");
  };

  getAlbumsHandler = (data: IAlbumResponse) => {
    this.ngxService.stop();
    this.album.albums.data = data.data;

    // console.log('this.album.albums.data === >>>>', this.album.albums.data)

    if (this.album.activeAlbum.id) {
      this.album.albums.data = this.album.albums.data.filter((val) => { return (val.id === this.album.activeAlbum.id) && !this.album.activeAlbum.id});
      
    } else {
      this.album.albums.data = data.data;
    }
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
    this.toastr.success("Album successfully created");
  };

  putAlbumHandler = (data: any) => {
    this.ngxService.stopAll();
    this.album.updateFromList(data.data);
    
    this.toastr.success("Album successfully updated");
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
    console.log(this.album.activeAlbum);

    this.startLoad();

    //this.getAlbumsByManager();
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

  public showData(album): void {
    this.album.activeAlbum = album;
  }

  pageNextHandler(): void {
    this.image.page++;
  }

  pagePrevHandler(): void {
    this.image.page--;
  }

  pageToHandler(page: number): void {
    this.image.page = page;
  }

  pageChangedHandler(): void {
    // this.getList();
    this.getImages();
    window.scrollTo(0, 0);
  }

  Math = Math;
}
