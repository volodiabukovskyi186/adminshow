import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { IProduct } from "../../../interfaces";
import { IManufacturer } from "src/app/modules/manufacturer/manufacturer.service";

@Component({
  selector: "product-form-base",
  templateUrl: "./base.component.html",
  styleUrls: ["./base.component.scss"],
})
export class BaseComponent implements OnInit {
  @Input() model: IProduct;
  @Input() manufacturers: IManufacturer[] = [];
  @Input() title: string = "";
  @Input() host: string;

  @Output() press = new EventEmitter();
  @Output() reset = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
  onPress = () => this.press.emit();
  onReset = () => this.reset.emit();
}
