import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { fade } from "../../animations";
import { trigger, style, transition, animate } from "@angular/animations";
import { RapService } from '../../rap.service';

const TIME = ".3s";
const FN = "ease-in-out";

@Component({
  selector: "rap-nav-group",
  animations: [
    fade,
    trigger("fade2", [
      transition(":enter", [
        style({ opacity: "0", maxHeight: "0" }),
        animate(`${TIME} ${FN}`, style({ opacity: "1", maxHeight: "5000px" }))
      ]),
      transition(":leave", [
        style({ opacity: "1", maxHeight: "500px" }),
        animate(`${TIME} ${FN}`, style({ opacity: "0", maxHeight: "0" }))
      ])
    ])
  ],
  templateUrl: "./nav-group.component.html",
  styleUrls: ["./nav-group.component.scss"]
})
export class NavGroupComponent implements OnInit {
  private openValue: boolean = false;
  public burderStatus:boolean=false;
  @Input() title: string;
  @Input() icon: string;

  @Input() get open(): boolean {
    return this.openValue;
  }

  @Output() openChange = new EventEmitter();

  set open(val: boolean) {
    this.openValue = val;
    this.openChange.emit(this.openValue);
  }

  constructor(public rapService:RapService) {}

  ngOnInit(): void {
    this.BurgerStatus()
  }
  
  BurgerStatus():void{
    this.rapService.SBurder.subscribe(data=>{
      this.burderStatus=data;
      console.log('statusBurger==>',data)
    })
  }

  toggle() {
    this.open = !this.open;
    this.burderStatus=false
    this.rapService.SBurder.next(false)
  }
}
