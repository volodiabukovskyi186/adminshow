import { Component, OnInit } from "@angular/core";
import { ImagesService } from "../images.service";
import { fadeScale, fade } from "../../ui/animations";

@Component({
  animations: [fadeScale, fade],
  selector: "app-upload-image-list",
  templateUrl: "./upload-image-list.component.html",
  styleUrls: ["./upload-image-list.component.scss"],
})
export class UploadImageListComponent implements OnInit {
  constructor(public image: ImagesService) {}

  ngOnInit(): void {}

  deleteFromUpload(img) {
    this.image.deleteImageFromUploadList(img);
  }
}
