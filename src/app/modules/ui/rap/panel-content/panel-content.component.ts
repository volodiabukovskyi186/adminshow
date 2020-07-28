import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { slideRight, fade } from "../../animations";

@Component({
  selector: "rap-panel-content",
  animations: [slideRight, fade],
  templateUrl: "./panel-content.component.html",
  styleUrls: ["./panel-content.component.scss"]
})
export class PanelContentComponent implements OnInit {
  private showRightSideValue: boolean = false;
  @Input() get showRightSide(): boolean {
    return this.showRightSideValue;
  }
  @Output() showRightSideChange = new EventEmitter();
  set showRightSide(val: boolean) {
    this.showRightSideValue = val;
    this.showRightSideChange.emit(this.showRightSideValue);
  }

  private _showForm: boolean = true;
  @Output() showFormChange = new EventEmitter();

  set showForm(val: boolean) {
    this._showForm = val;
    this.showFormChange.emit(this._showForm);
  }

  @Input() get showForm(): boolean {
    return this._showForm;
  }

  @Input() showFooter: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
