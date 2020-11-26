import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { AuthService } from "src/app/core/auth/models/auth.service";
import { Router } from "@angular/router";
import { NavLink } from '../../ui/rap/nav-item/nav-link';

@Component({
  selector: "app-user-menu",
  templateUrl: "./user-menu.component.html",
  styleUrls: ["./user-menu.component.scss"],
})
export class UserMenuComponent implements OnInit {
  open: boolean = false;
  nav: NavLink = {
    link: '',
    title: "logout",
  }
  constructor(
    public user: UserService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user.getByToken().subscribe(this.getByTokenHandler);
  }

  logout(event: Event) {
    event.preventDefault();

    this.auth.logout();
    this.router.navigate(["login"]);
  }

  getByTokenHandler = (data) => {
    this.user.saveUser(data.data);
  };
}
