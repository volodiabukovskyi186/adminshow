import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "rap-circle-progress",
  templateUrl: "./circle-progress.component.html",
  styleUrls: ["./circle-progress.component.scss"],
})
export class CircleProgressComponent implements OnInit {
  @Input() max: number = 100;
  @Input() done: boolean = false;
  
  private _value: number;
  @Output() valueChange = new EventEmitter();
  
  set value(val: number) {
    this._value = val;
    this.valueChange.emit(this._value);
  }
  
  @Input() get value(): number {
    return this._value;
  }
  
  constructor() {}

  ngOnInit(): void {}
}
