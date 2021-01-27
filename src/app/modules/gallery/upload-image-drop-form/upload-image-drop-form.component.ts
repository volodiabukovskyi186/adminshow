import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { ImagesService } from "../images.service";
import { AlbumService } from '../album.service';

@Component({
  selector: "app-upload-image-drop-form",
  templateUrl: "./upload-image-drop-form.component.html",
  styleUrls: ["./upload-image-drop-form.component.scss"],
})
export class UploadImageDropFormComponent implements OnInit {
  constructor(public image: ImagesService, private album: AlbumService) {}

  ngOnInit(): void {
    this.image.uploadImages = [];
    this.image.uploaded.subscribe(this.onUploaded);
    this.image.uploadedError.subscribe(this.onUploadedError);
  }

  @ViewChild("fileElem") fileElem: ElementRef;

  drop_handler(ev: DragEvent) {
    ev.preventDefault();
    this.fileElem.nativeElement.files = ev.dataTransfer.files;
    var event = new Event("change");
    this.fileElem.nativeElement.dispatchEvent(event);
    let el: HTMLElement = <HTMLElement>ev.target;
    el.classList.remove("dragover");
  }

  dragover_handler(ev: Event) {
    ev.preventDefault();
    let el: HTMLElement = <HTMLElement>ev.target;
    el.classList.add("dragover");
  }

  dragend_handler(ev: Event) {
    ev.preventDefault();
    let el: HTMLElement = <HTMLElement>ev.target;
    el.classList.add("dragover");
  }
  dragleave_handler(ev: Event) {
    ev.preventDefault();
    let el: HTMLElement = <HTMLElement>ev.target;
    el.classList.remove("dragover");
  }

  handleFileInput(files: FileList) {
    this.image.uploadImage.file = files.item(0);

    var reader = new FileReader();

    reader.readAsDataURL(this.image.uploadImage.file); // read file as data url
    reader.onload = (event) => {
      // called once readAsDataURL is completed
      this.image.uploadImage.url = event.target.result;
    };
  }

  upload() {
    this.image.uploading = true;
    this.image.uploadIndex = 0;
    this.image.uploadedErrorCount = 0;

    this.uploadByIndex(this.image.uploadIndex);
  }

  onUploaded  = (data: any) => {
    this.image.uploadIndex = 0;
    this.uploadByIndex(this.image.uploadIndex);
  }

  onUploadedError = (data: any) => {
    this.image.uploadedErrorCount = this.image.uploadedErrorCount + 1;
    this.image.uploadIndex++;
    if (this.image.uploadIndex >= this.image.uploadImages.length) this.image.uploadIndex = 0;
    this.uploadByIndex(this.image.uploadIndex);
  };

  uploadByIndex(index: number) {
    if (!this.image.uploadImages[index] || this.image.uploadedErrorCount >= 3) {
      this.image.uploading = false;
      return;
    }

    const item = this.image.uploadImages[index];
    item.isError = false;

    this.album.activeAlbum.parent_id = this.album.activeAlbum?.id;

    this.image.upload(item.file, this.album.activeAlbum?.id).subscribe((event) => {
      this.image.getEventMessage(event, item);
    });
    
  }
}
