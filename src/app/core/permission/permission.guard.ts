import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  Navigation
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../auth/models/auth.service";
import { LanguageService } from "../language.service";
import { PermissionService } from './permission.service';

@Injectable({
  providedIn: "root"
})
export class PermissionGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private permissionsService: PermissionService,
    private router: Router,
    private lang: LanguageService
  ) {}

  difference(arr1: Array<string>, arr2: Array<string>): Array<string> {
    return arr1.filter(x => !arr2.includes(x));
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
     
    let permissions = next.data.permissions as Array<string> ?? [];
    let diff = this.difference(permissions, this.permissionsService.permissions);

    if (diff.length == 0) {
      return true;
    }

    // set lang
    this.lang.use(next.paramMap.get("lang"));

    let current: Navigation = this.router.getCurrentNavigation();
    console.log("Access denied to", current.finalUrl.toString());
    console.log(permissions);
    console.log(this.permissionsService.permissions);
    

    this.router.navigate([this.lang.routeLang]);

    return false;
  }
}
