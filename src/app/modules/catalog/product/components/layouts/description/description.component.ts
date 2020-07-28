import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import { IProduct } from "../../../interfaces";

@Component({
  selector: "product-form-description",
  templateUrl: "./description.component.html",
  styleUrls: ["./description.component.scss"],
})
export class DescriptionComponent {
  @Input() model: IProduct;
}
