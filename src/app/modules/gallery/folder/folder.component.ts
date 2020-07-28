import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  HostBinding,
} from "@angular/core";
import { ViewMode, IAlbum } from "./interfaces";

@Component({
  selector: "rap-folder",
  templateUrl: "./folder.component.html",
  styleUrls: ["./folder.component.scss"],
})
export class FolderComponent implements OnInit {
  ViewMode = ViewMode;
  @Input()
  @HostBinding("class")
  mode: ViewMode = ViewMode.card;
  @Input() editable: boolean = false;

  @Input() icon: string = "assets/icons/color-folder-image.svg";
  @Input() thumbnail: string = "assets/icons/color-folder-image.svg";

  @Output() edit: EventEmitter<any> = new EventEmitter<any>();
  @Output() open: EventEmitter<any> = new EventEmitter<any>();
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();

  private _album: IAlbum = {
    created_at: "",
    id: -1,
    title: "",
    updated_at: "",
    parent_id: null,
  };
  @Output() albumChange = new EventEmitter();

  set album(val: IAlbum) {
    this._album = val;
    this.albumChange.emit(this._album);
  }

  @Input() get album(): IAlbum {
    return this._album;
  }
  @ViewChild("input") input: ElementRef;

  // Edit Mode

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

  

  ngOnInit(): void {}

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

  onOpen($event: Event) {
    $event.preventDefault();
    this.open.emit();
  }
}
