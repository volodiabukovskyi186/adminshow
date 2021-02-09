import { Component, OnInit, Input } from "@angular/core";
import { IUser } from "../models";
import { Role } from "../../roles/models";
import { IProduct } from "src/app/modules/catalog/product/interfaces/product";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.scss"],
})
export class UserFormComponent implements OnInit {
  @Input() user: IUser;
  @Input() roles: Role[] = [];
  @Input() model: IProduct;

  @Input() title: string = "";
  @Input() isEdit: boolean = false;

  public ngOnInit(): void {
    // console.log('this.user ===== >>>>>', this.user);
  }

  constructor() {}
}
