import { Component, OnInit, Input } from '@angular/core';
import { IAlbumBreadcrumb } from '../album.service';

@Component({
  selector: 'rap-album-breadcrumb',
  templateUrl: './album-breadcrumb.component.html',
  styleUrls: ['./album-breadcrumb.component.scss']
})
export class AlbumBreadcrumbComponent implements OnInit {

  @Input() breadcrumb: IAlbumBreadcrumb;

  constructor() { }

  ngOnInit(): void {
  }

}
