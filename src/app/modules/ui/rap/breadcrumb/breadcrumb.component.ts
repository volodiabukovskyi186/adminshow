import { Component, OnInit, Input } from '@angular/core';
import { NavLink } from '../nav-item/nav-link';

@Component({
  selector: 'rap-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() breadcrumb: NavLink;
  @Input() langLink: string;

  constructor() { }

  ngOnInit(): void {
  }

}
