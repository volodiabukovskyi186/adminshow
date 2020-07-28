import { Injectable } from "@angular/core";
import { GroupNav, MENU } from "./menu";

@Injectable({
  providedIn: "root"
})
export class MenuService {
  nav: Array<GroupNav> = MENU;

  constructor() {
  }
}
