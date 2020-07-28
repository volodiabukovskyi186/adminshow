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

  constructor(private _http: HttpClient) {}

  login(login: string, password: string): Observable<any> {
    let data = JSON.stringify({
      login,
      password,
    });
    return this._http.post(environment.signin, data);
  }

  public saveToken(token: string): void {
    localStorage.setItem("token", token);
  }

  public getToken(): string {
    return localStorage.getItem("token");
  }

  public logout(): void {
    localStorage.removeItem("token");
  }
}
