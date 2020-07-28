import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { IAlbumBreadcrumb } from "../album.service";

@Component({
  selector: "rap-album-breadcrumbs",
  templateUrl: "./album-breadcrumbs.component.html",
  styleUrls: ["./album-breadcrumbs.component.scss"],
})
export class AlbumBreadcrumbsComponent implements OnInit {
  @Input() breadcrumbs: IAlbumBreadcrumb[] = [];
  @Input() activeId: number = 0;
  @Output() press = new EventEmitter<IAlbumBreadcrumb>();

  constructor() {}

  ngOnInit(): void {}
  onClick(item: IAlbumBreadcrumb) {
    if (item.id != this.activeId) this.press.emit(item);
  }
}
