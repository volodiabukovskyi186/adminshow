import { Injectable } from "@angular/core";
import { NavLink } from "../modules/ui/rap/nav-item/nav-link";

@Injectable({
  providedIn: "root"
})
export class BreadcrumbsService {
  breadcrumbs: Array<NavLink> = [];

  constructor() {}
}
