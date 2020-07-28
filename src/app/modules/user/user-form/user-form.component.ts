import { Component, OnInit, Input } from "@angular/core";
import { IUser } from "../models";
import { Role } from "../../roles/models";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.scss"],
})
export class UserFormComponent implements OnInit {
  @Input() user: IUser;
  @Input() roles: Role[] = [];

  @Input() title: string = "";
  @Input() isEdit: boolean = false;

  ngOnInit(): void {}

  constructor() {}
}
