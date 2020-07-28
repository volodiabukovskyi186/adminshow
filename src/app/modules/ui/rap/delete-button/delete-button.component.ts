import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  HostListener,
} from "@angular/core";
import { fade } from "../../animations";

@Component({
  selector: "rap-delete-button",
  animations: [fade],
  templateUrl: "./delete-button.component.html",
  styleUrls: ["./delete-button.component.scss"],
})
export class DeleteButtonComponent implements OnInit {
  @Input() labelConfirm: string = "Confirm";
  /**
   * Src to icon
   *
   * @type {string}
   * @memberof DeleteButtonComponent
   */
  private _src: string;
  @Output() srcChange = new EventEmitter();
  
  set src(val: string) {
    this._src = val;
    this.srcChange.emit(this._src);
  }
  
  @Input() get src(): string {
    return this._src;
  }
  
  // @Input() src: string;

  /**
   * Auto hide confirm button
   *
   * @type {boolean}
   * @memberof DeleteButtonComponent
   */
  @Input() autoHide: boolean = true;

  /**
   * Time for auto hide confirm button
   *
   * @type {number}
   * @memberof DeleteButtonComponent
   */
  @Input() timeout: number = 500;

  timer;

  isShowConfirm: boolean = false;

  @Output() confirmed = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  @HostListener("click", ["$event"])
  toggle($event: Event) {
    $event.preventDefault();
    if (!this.isShowConfirm) {
      this.showConfirmButtom();
      this.startAutoHide();
    } else {
      this.hideConfirmButtom();
      this.resetAutoHide();
    }
  }

   startAutoHide() {
    if (this.autoHide) {
      this.timer = setTimeout(() => {
        this.hideConfirmButtom();
      }, this.timeout);
    }
  }

   resetAutoHide() {
    clearTimeout(this.timer);
  }

  showConfirmButtom() {
    this.isShowConfirm = true;
  }
  hideConfirmButtom() {
    this.isShowConfirm = false;
  }

  onConfirmed = () => {
    this.confirmed.emit();
  };
}
