import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { fadeScale } from '../../animations';

export interface IStepTab {
  id: number;
  title: string;
  active: boolean;
  avaliable: boolean;
}

@Component({
  animations: [fadeScale],
  selector: "rap-step-tab",
  templateUrl: "./step-tab.component.html",
  styleUrls: ["./step-tab.component.scss"],
})
export class StepTabComponent implements OnInit {
  
  @Input() title = '';
  @Input() active = false;
  @Input() disabled = false;

  constructor() {}

  ngOnInit(): void {}
}
