import { Component, OnInit, Input } from "@angular/core";
import { NavLink } from "./nav-link";

@Component({
  selector: "rap-nav-item",
  templateUrl: "./nav-item.component.html",
  styleUrls: ["./nav-item.component.scss"]
})
export class NavItemComponent implements OnInit {
  @Input() nav: NavLink;
  @Input() langLink: string;
  @Input() isButton: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
