import {
  Component,
  OnInit,
  Input,
  HostBinding,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { ViewMode } from "../folder/interfaces";

export interface IFile {
  name: string;
  created_at: string;
  updated_at: string;
  size: number;
}

@Component({
  selector: "rap-file",
  templateUrl: "./file.component.html",
  styleUrls: ["./file.component.scss"],
})
export class FileComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  /**
   * Enum of View mode
   *
   * @memberof FileComponent
   */
  ViewMode = ViewMode;

  /**
   * View mode
   *
   * @type {ViewMode}
   * @memberof FileComponent
   */
  @Input()
  @HostBinding("class")
  mode: ViewMode = ViewMode.card;

  /**
   * Id editable
   *
   * @type {boolean}
   * @memberof FileComponent
   */
  @Input() editable: boolean = false;

  /**
   * Icon of file
   *
   * @type {string}
   * @memberof FileComponent
   */
  @Input() icon: string = "assets/icons/fole-icon-image.svg";

  /**
   * Event. On edit
   *
   * @type {EventEmitter<any>}
   * @memberof FileComponent
   */
  @Output() edit: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Event. On delete
   *
   * @type {EventEmitter<any>}
   * @memberof FileComponent
   */
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Edit Mode
   *
   * @private
   * @type {boolean}
   * @memberof FileComponent
   */
  private _editMode: boolean;
  @Output() editModeChange = new EventEmitter();

  set editMode(val: boolean) {
    this._editMode = val;

    if (val) {
      setTimeout(() => {
        this.input.nativeElement.focus();
        this.input.nativeElement.setSelectionRange(
          0,
          this.input.nativeElement.value.length
        );
      }, 0);
    }

    this.editModeChange.emit(this._editMode);
  }

  @Input() get editMode(): boolean {
    return this._editMode;
  }

  /**
   * File
   *
   * @private
   * @type {IFile}
   * @memberof FileComponent
   */
  private _file: IFile;
  @Output() fileChange = new EventEmitter();

  set file(val: IFile) {
    this._file = val;
    this.fileChange.emit(this._file);
  }

  @Input() get file(): IFile {
    return this._file;
  }

  @ViewChild("input") input: ElementRef;

  turnEditMode() {
    if (!this.editable) return;
    this.editMode = true;
  }

  onDelete() {
    this.delete.emit();
  }
  onEdit($event: Event) {
    $event.preventDefault();
    this.editMode = false;
    this.edit.emit();
  }
}
