import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { slideRight, scale } from "../../animations";

export interface IPanelLabesl {
  filter: string;
  add: string;
  cancel: string;
  save: string;
  review: string;
  download:string;
}
@Component({
  selector: "rap-panel",
  animations: [slideRight, scale],
  templateUrl: "./panel.component.html",
  styleUrls: ["./panel.component.scss"],
})
export class PanelComponent implements OnInit {
  @Input() labels: IPanelLabesl = {
    filter: "Filter",
    add: "Add",
    cancel: "Calcel",
    save: "Save",
    review: "Review",
    download: "Download"

  };

  private showRightSideValue: boolean = false;
  @Input() showRightToggleBtn: boolean = true;

  @Input() showLeftSide: boolean = true;
  // @Input() showRightSide: boolean = false;
  @Input() showFooter: boolean = true;
  @Input() showTop: boolean = true;

  @Input() get showRightSide(): boolean {
    return this.showRightSideValue;
  }
  @Output() showRightSideChange = new EventEmitter();
  set showRightSide(val: boolean) {
    this.showRightSideValue = val;
    this.showRightSideChange.emit(this.showRightSideValue);
  }

  //#region Is Show Form

  private _showForm: boolean;
  @Output() showFormChange = new EventEmitter();

  set showForm(val: boolean) {
    this._showForm = val;
    this.showFormChange.emit(this._showForm);
  }

  @Input() get showForm(): boolean {
    return this._showForm;
  }

  //#endregion

  // is show cancel btn

  private _isCancelBtn: boolean = false;
  @Output() isCancelBtnChange = new EventEmitter();

  set isCancelBtn(val: boolean) {
    this._isCancelBtn = val;
    this.isCancelBtnChange.emit(this._isCancelBtn);
  }

  @Input() get isCancelBtn(): boolean {
    return this._isCancelBtn;
  }

  @Output() cancelClick = new EventEmitter();

  onCancelClick = () => this.cancelClick.emit();

  // is show save btn

  private _isSaveBtn: boolean = true;
  @Output() isSaveBtnChange = new EventEmitter();

  set isSaveBtn(val: boolean) {
    this._isSaveBtn = val;
    this.isSaveBtnChange.emit(this._isSaveBtn);
  }

  @Input() get isSaveBtn(): boolean {
    //console.log(this._isSaveBtn);
    return this._isSaveBtn;
  }

  @Output() saveClick = new EventEmitter();

  onSaveClick = () => this.saveClick.emit();

  // is show plus button

  private _isPlusBtn: boolean = true;
  @Output() isPlusBtnChange = new EventEmitter();

  set isPlusBtn(val: boolean) {
    this._isPlusBtn = val;
    this.isPlusBtnChange.emit(this._isPlusBtn);
  }

  @Input() get isPlusBtn(): boolean {
    return this._isPlusBtn;
  }

  @Output() plusClick = new EventEmitter();

  onPlusClick = () => this.plusClick.emit();

  //Download=>
  private _isDwnloadBtn: boolean = false;
  @Output() isDwnloadClick = new EventEmitter();

  set isDwnloadBtn(val: boolean) {
    this._isDwnloadBtn = val;
    this.isDwnloadClick.emit(this._isDwnloadBtn);
  }

  @Input() get isDwnloadBtn(): boolean {
    return this._isDwnloadBtn;
  }

  @Output() DownloadClick = new EventEmitter();
  onDwnloadClick = () => {
    this.DownloadClick.emit();
  }









  private _isReviewBtn: boolean = false;
  @Output() isReviewBtnChange = new EventEmitter();

  set isReviewBtn(val: boolean) {
    this._isReviewBtn = val;
    this.isReviewBtnChange.emit(this._isReviewBtn);
  }

  @Input() get isReviewBtn(): boolean {
    return this._isReviewBtn;
  }

  @Output() reviewClick = new EventEmitter();
  onReviewClick = () => this.reviewClick.emit();
  private _toggleFilter: boolean = false;
  @Output() toggleFilterChange = new EventEmitter();

  set toggleFilter(val: boolean) {
    this._toggleFilter = val;
    this.toggleFilterChange.emit(this._toggleFilter);
  }

  @Input() get toggleFilter(): boolean {
    return this._toggleFilter;
  }

  @Output() filterClick = new EventEmitter();

  onFilterClick = () => this.filterClick.emit();

  constructor() {}

  ngOnInit(): void {}

  toggleRight = () => (this.showRightSide = !this.showRightSide);

  public showModalForm = () => (this.showForm = true);
  public hideModalForm = () => (this.showForm = false);
}
