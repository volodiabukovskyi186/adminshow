import { Injectable } from "@angular/core";
import { Permission } from "./permission";

@Injectable({
  providedIn: "root",
})
export class PermissionService {
  public get permissions(): Array<string> {
    let u = this.getUser();

    if (!u) return [];

    let rolePermission: Permission[] = JSON.parse(u.role.permissions);
    let userPermission: Permission[] = JSON.parse(u.user.permissions);
    // console.log(u);

    return this.merge(userPermission, rolePermission);
  }

  constructor() {}

  private merge(
    userPermission: Permission[],
    rolePermission: Permission[]
  ): Array<string> {
    let result = [];

    rolePermission.forEach((element) => {
      result.push(element.name);
    });

    // console.log("1) result", result);

    userPermission.forEach((up) => {
      var index = result.indexOf(up.name);

      if (up.state < 0) {
        // delete from result
        if (index < 0) result.splice(index, 1);
      }

      if (index < 0) result.push(up.name);
    });

    return result;
  }

  public getUser(): any {
    let user = localStorage.getItem("user");

    return user ? JSON.parse(user) : null;
  }
}
