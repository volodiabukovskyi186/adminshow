import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private _http: HttpClient,) { }
  
  public getByToken(): Observable<any> {
    return this._http.get(environment.getUserByToken);
  }
}
