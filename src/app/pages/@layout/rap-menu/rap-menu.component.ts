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
export class RapMenuComponent implements OnInit,OnChanges {
  logoStatus:boolean=false
  navStatus:boolean=false
  myAnimatiom='small'
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
  chack(event):void{
    // console.log('chack======>29304823',event)
    // this.menu.nav=this.menu.nav
  }

  ngOnInit(): void {
   
    this.rapService.SBurder.subscribe(data=>{
      this.logoStatus=data;
      // console.log('icon===>',this.logoStatus)
    })
    this.UserService.SUser.subscribe(user=>{
      this.menu.nav=this.menu.nav
      this.menu.nav=this.menu.nav.map(navGropup=>{
        // console.log('navGropup==>',navGropup)
        navGropup.items=navGropup.items.map(navItem=>{
          const perm=user&&user.role&&user.role.permissions&& JSON.parse(user.role.permissions)||[];
          
          // console.log('perm',perm)
          const premissinSet=new Set(perm.map(premission=>{
            return premission.name;
          }))
            navItem.hidden= perm.length ==0|| !premissinSet.has(navItem.manage);
            // console.log('permSet===>',premissinSet,navItem.manage,navItem.hidden)
            return navItem;
            
        })
        navGropup.hidden=navGropup.items.every(navItem=>navItem.hidden);
        return navGropup
      });
       
      this.navStatus=true;

    })
    console.log('eeeeee=>',this.menu.nav)
  }

  ngOnChanges():void{
      this.rapService.SBurder.subscribe(data=>{
        this.logoStatus=data;
        // console.log('icon===>',this.logoStatus)
      })
     
  
     
  }
  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate([this.lang.current, "login"]);
    this.menu.nav=this.menu.nav
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
