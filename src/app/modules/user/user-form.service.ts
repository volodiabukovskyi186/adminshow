import { Injectable } from "@angular/core";
import { IUser } from "./models";

@Injectable({
  providedIn: "root",
})
export class UserFormService {
  model: IUser;

  initEmptyModel() {
    this.model = {
      created_at: null,
      email: null,
      first_name: null,
      id: null,
      is_confirm_email: null,
      is_confirm_tel: null,
      last_name: null,
      role_id: null,
      tel: null,
      updated_at: null,
      permissions: [],
      password: null
    };
  }

  initByModel(model: IUser) {
    this.model = model;
  }

  constructor() {
    this.initEmptyModel();
  }
}
