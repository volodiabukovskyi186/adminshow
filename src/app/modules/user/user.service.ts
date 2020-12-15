import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { IUserResponse } from './models';

@Injectable({
  providedIn: "root",
})
export class UserService {
  page: number = 1;
  // SUser=new Subject<boolean>();
  userOne:any;
  SUser$ = new BehaviorSubject<any>({});
  SUser = this.SUser$.asObservable();
  
  data: IUserResponse = {
    data: [],
    count: 0,
    host: null,
    skip: 0,
    take: 10,
  };
  constructor(private _http: HttpClient) {}

  getList(): Observable<IUserResponse> {
    // let skip = this.page * this.data.take - this.data.take;
    let params = `?take=${this.data.take}&skip=${this.data.skip}`;
    return this._http.get<IUserResponse>(environment.user.users + params);
  }

  post(data: any): Observable<any> {
    return this._http.post(environment.user.user, data);
  }

  put(data: any, id: number): Observable<any> {
    return this._http.put(`${environment.user.user}/${id}`, data);
  }

  public getByToken(): Observable<any> {
    return this._http.get(environment.getUserByToken);
  }

  public saveUser(user: any): void {
    localStorage.setItem("user", JSON.stringify(user));
    //console.log('user++++++++++===>', user);
    this.SUser$.next(user);
  }

  public getManagers(): Observable<any> {
    return this._http.get(`${environment.host}users/getByRole/4`);
  }

  public getUser(): any {
    let user = localStorage.getItem("user");

    return user ? JSON.parse(user) : null;
  }

  public removeUser() {
    localStorage.removeItem("user");
  }

  public getAllManagerCategories(): Observable<any> {
    return this._http.get(`${environment.host}manager/categories`);
  }
}
