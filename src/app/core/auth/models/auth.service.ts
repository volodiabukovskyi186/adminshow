import { UserService } from '../../../modules/user/user.service';
import { MenuService } from 'src/app/core/menu.service';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // public get permissions(): Array<string> {
  //   return ["read", "manage_roles", "manage_categorys", "manage_albums", "manage_imagess"];
  // }

  public get authenticated(): boolean {
    return localStorage.getItem("token") != undefined;
  }
  constructor(private _http: HttpClient,
              private menu:MenuService,
              private userService:UserService) {}

  login(login: string, password: string): Observable<any> {
    let data = JSON.stringify({
      login,
      password,
    });
    return this._http.post(environment.signin, data);
  }

  public saveToken(token: string): void {
    // this.userService.SUser.next(true);
    localStorage.setItem("token", token);
    

  }

  public getToken(): string {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    }
  }

  public logout(): void {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // this.userService.SUser.next(true);

   
  }
}
