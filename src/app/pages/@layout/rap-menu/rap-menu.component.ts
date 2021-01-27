import { Permission } from 'src/app/core/permission/permission';
import { UserService } from 'src/app/modules/user/user.service';
import { Component, OnInit,OnChanges } from "@angular/core";
import { MenuService } from "src/app/core/menu.service";
import { LanguageService } from "src/app/core/language.service";
import { AuthService } from "src/app/core/auth/models/auth.service";
import { Router, NavigationEnd } from "@angular/router";
import { LanguageService as LocalizationLang } from "src/app/modules/localization/language/language.service";
import { RapService } from 'src/app/modules/ui/rap.service';

@Component({
  selector: "app-rap-menu",
  templateUrl: "./rap-menu.component.html",
  styleUrls: ["./rap-menu.component.scss"],
})
export class RapMenuComponent implements OnInit, OnChanges {
  public logoStatus: boolean = false;
  public navStatus: boolean = false;
  public myAnimatiom = 'small';
  public currentItemUrl: any;

  constructor(
    public menu: MenuService,
    public lang: LanguageService,
    private auth: AuthService,
    private router: Router,
    public languageService: LocalizationLang,
    private rapService:RapService,
    private UserService:UserService
  ) {
 
  }

  chack(event): void {
    // this.menu.nav = this.menu.nav;
  }

  public ngOnInit(): void {
    this.rapService.SBurder.subscribe(data => {
      this.logoStatus = data;
    })

    this.UserService.SUser.subscribe(user => {
      this.menu.nav = this.menu.nav;
      this.menu.nav = this.menu.nav.map(navGropup => {
        navGropup.items = navGropup.items.map(navItem => {
          const perm = user && user.role && user.role.permissions && JSON.parse(user.role.permissions) || [];
          const premissinSet = new Set(perm.map(premission => {
            return premission.name;
          }))

          navItem.hidden = perm.length == 0 || !premissinSet.has(navItem.manage);
          return navItem;
        })
        
        navGropup.hidden = navGropup.items.every(navItem => navItem.hidden);
        return navGropup;
      });
       
      this.navStatus = true;
    })
  }

  public ngOnChanges(): void {
    this.rapService.SBurder.subscribe(data => {
      this.logoStatus = data;
    })
  }

  public getCurrentItem(event) {
    //console.log(event);

    // if (this.lang.current) {
    //   this.currentItemUrl = this.lang.current;
    // } else {
    //   this.currentItemUrl = this.lang.translate.defaultLang;
    // }
    
    let langCurrent = this.lang.current.slice(3, 5);;
    this.currentItemUrl = `/${langCurrent}${event}`;

    console.log(langCurrent);
  }

  public logout(event: Event): void {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate([this.lang.current, "login"]);
    this.menu.nav = this.menu.nav;
  }

  public getRoute(locale: string) {
    let route = this.router.url.split("/");
    let res = ["/", locale];
    route.forEach((item) => {
      if (item != "" && !item.match(/en|pl|ru|ua/)) {
        res.push(item);
      }
    });
    return res;
  }

  public closeMenu(item, indexItem): void {
    this.menu.nav.forEach((elem, index) => {
      if (index !== indexItem) {
        elem.open = false;
      }
    })
  }

  public show(i): void {

  }
}
