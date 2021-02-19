import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ImagesService } from 'src/app/modules/gallery/images.service'

@Component({
  selector: "app-choice-button",
  templateUrl: "./choice-button.component.html",
  styleUrls: ["./choice-button.component.scss"],
})
export class ChoiceButtonComponent implements OnInit {
  srcDefault: string = "assets/icons/color-change-image.svg";
  // @Input() src: string = "assets/icons/color-none-image.svg";

  private _src: string;
  @Output() srcChange = new EventEmitter();

  public isAngularEditorComp: boolean = false;
  
  set src(val: string) {
    this._src = val;
    this.srcChange.emit(this._src);
  }
  
  @Input() get src(): string {
    return this._src;
  }
  

  @Input() ratio: "imax" | "square" | "r3x1" = "imax";

  @Output() reset: EventEmitter<any> = new EventEmitter<any>();
  @Output() press: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public imagesService: ImagesService
  ) {}

  ngOnInit(): void {}

  onPress(e: Event) {
    console.log('e ==================== >>>>>>>', e);

    this.imagesService.updatedAngularEditorStream$(this.isAngularEditorComp);

    e.preventDefault();
    this.press.emit();
  }

  onReset() {
    this.reset.emit();
  }
}
