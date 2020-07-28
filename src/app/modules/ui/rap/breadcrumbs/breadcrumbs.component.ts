import { Component, OnInit, Input } from "@angular/core";
import { NavLink } from "../nav-item/nav-link";

@Component({
  selector: "rap-breadcrumbs",
  templateUrl: "./breadcrumbs.component.html",
  styleUrls: ["./breadcrumbs.component.scss"]
})
export class BreadcrumbsComponent implements OnInit {
  @Input() breadcrumbs: Array<NavLink> = [];
  @Input() langLink: string;

  constructor() {}

  ngOnInit(): void {}
}
