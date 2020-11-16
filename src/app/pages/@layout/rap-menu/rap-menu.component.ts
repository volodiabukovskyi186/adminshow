import { Component, OnInit } from "@angular/core";
import { MenuService } from "src/app/core/menu.service";
import { LanguageService } from "src/app/core/language.service";
import { AuthService } from "src/app/core/auth/auth.service";
import { Router } from "@angular/router";
import { LanguageService as LocalizationLang } from "src/app/modules/localization/language/language.service";

@Component({
  selector: "app-rap-menu",
  templateUrl: "./rap-menu.component.html",
  styleUrls: ["./rap-menu.component.scss"],
})
export class RapMenuComponent implements OnInit {
  constructor(
    public menu: MenuService,
    public lang: LanguageService,
    private auth: AuthService,
    private router: Router,
    public languageService: LocalizationLang,
  ) {}

  ngOnInit(): void {}

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate([this.lang.current, "login"]);
  }

  getRoute(locale: string) {
    let route = this.router.url.split("/");
    let res = ["/", locale];
    route.forEach((item) => {
      if (item != "" && !item.match(/en|pl|ru|ua/)) {
        res.push(item);
      }
    });
    return res;
  }
  closeMenu(item,indexItem):void{
    this.menu.nav.forEach((elem,index)=>{
      if(index!==indexItem){
        elem.open=false;
      }
    })
  }

  show(i) {
    console.log(i);
  }
}
