import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  Navigation,
  ActivatedRoute
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { LanguageService } from "../language.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private lang: LanguageService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      
    if (this.auth.authenticated) {
      return true;
    }

    // set lang
    this.lang.use(next.paramMap.get("lang"));

    let current: Navigation = this.router.getCurrentNavigation();
    console.log("Access denied to", current.finalUrl.toString());

    this.router.navigate([this.lang.routeLang, "login"]);

    return false;
  }
}
