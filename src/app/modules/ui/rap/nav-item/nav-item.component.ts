import { Role } from './../../../roles/models/role';
import { UserService } from 'src/app/modules/user/user.service';
import { Permission } from 'src/app/core/permission/permission';
import { Component, OnInit, Input,OnChanges, Output, EventEmitter } from "@angular/core";
import { NavLink } from "./nav-link";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  Navigation
} from "@angular/router";
@Component({
  selector: "rap-nav-item",
  templateUrl: "./nav-item.component.html",
  styleUrls: ["./nav-item.component.scss"]
})
export class NavItemComponent implements OnInit,OnChanges {
  @Input() nav: NavLink;
  @Input() langLink: string;
  @Input() isButton: boolean = false;
  @Output() currentItemUrl: EventEmitter<any> = new EventEmitter();

  public navItemStatus: boolean = false;

  constructor(
    private router: Router,
    private UserService: UserService
  ) {}

  public ngOnInit(): void {
    this.currentItemUrl.emit(this.router.url);
    //console.log(this.router.url);



    // this.UserService.SUser.subscribe(data=>{
    //   let arrUserManage=JSON.parse(JSON.parse((localStorage.getItem('user'))).role.permissions)
    //   arrUserManage.forEach(elem => {
    //     if(this.nav.manage==elem.name){
    //       this.navItemStatus=true;

    //     }
    //   });
    // })

  }
  
  public ngOnChanges(): void {
    // this.UserService.SUser.subscribe(data=>{
    //   let arrUserManage=JSON.parse(JSON.parse((localStorage.getItem('user'))).role.permissions)
    //   arrUserManage.forEach(elem => {
    //     if(this.nav.manage==elem.name){
    //       this.navItemStatus=true;

    //     }
    //   });
    // })
  }
}
