import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { RoleResponse, Role } from "./models";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class RolesService {
  constructor(private http: HttpClient) {}

  roles: RoleResponse = {
    count: 0,
    skip: 0,
    take: 20,
    data: []
  };

  all: Role[] = [];

  protected deleteFromArray(object: Object, array: Array<Object>) {
    const index: number = array.indexOf(object);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  getFromList(id: number) {
    for (let i = 0; i < this.roles.data.length; i++) {
      const role = this.roles.data[i];
      if(role.id == id) return role;
    }
    return null;
  }

  deleteFromList(id: number) {
    let ob = this.getFromList(id);
    if(ob!=null) {
      this.deleteFromArray(ob,this.roles.data);
    }
  }

  updateInList(role: Role) {
    this.roles.data.forEach(element => {
      if(element.id === role.id) {
        element.name = role.name;
        element.permissions = JSON.parse(role.permissions as any);
        element.updated_at = role.updated_at;
      }
    });
  }

  getRoles(): Observable<RoleResponse> {
    return this.http.get<RoleResponse>(environment.role.roles);
  }

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(environment.role.roles+"?skip=0&take=200");
  }

  postRole(role: Role): Observable<any> {
    let data = JSON.stringify({
      name: role.name,
      permissions: JSON.stringify(role.permissions)
    });
    return this.http.post(environment.role.role, data);
  }

  putRole(role: Role, id: number): Observable<any> {
    let data = JSON.stringify({
      name: role.name,
      permissions: JSON.stringify(role.permissions)
    });
    return this.http.put(`${environment.role.role}/${id}`, data);
  }

  deleteRole(id: number): Observable<any> {
    return this.http.delete(`${environment.role.role}/${id}`);
  }
}
