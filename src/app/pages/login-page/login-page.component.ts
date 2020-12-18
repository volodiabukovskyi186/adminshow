import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { LanguageService } from "src/app/core/language.service";
import { PagesService } from "../pages.service";
import { UserService } from "src/app/modules/user/user.service";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private _title: Title,
    public pages: PagesService,
    public lang: LanguageService,
    public user: UserService
  ) {
    pages.defaultSetting();
  }

  public ngOnInit(): void {
    this._title.setTitle("Login | RAP for ShowU");

    this.lang.translate
      .get(["AUTH.SIGNIN", "APP.TITLE"])
      .subscribe((tr: any) => {
        this._title.setTitle(`${tr["AUTH.SIGNIN"]} | ${tr["APP.TITLE"]}`);
      });
  }

  public onAuthed(): void {
    this.user.getByToken().subscribe(this.getByTokenHandler);
  }

  getByTokenHandler = (data) => {
    this.user.saveUser(data.data);
    // console.log("userMove+++>",data.data)
  };
}
