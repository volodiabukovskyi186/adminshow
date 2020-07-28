import { Component, Input, OnInit, HostBinding, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
  selector: "rap-svg-ico",
  template: "",
  styleUrls: ["./svg-ico.component.scss"]
})
export class SvgIcoComponent implements OnInit {
  ngOnInit(): void {
    this.getIcon();
  }

  getIcon() {
    this._http.get(this.src, { responseType: "text" }).subscribe(this.okHandle);
  }

  @HostBinding("innerHTML")
  svg: SafeHtml;

  okHandle = data => {
    this.svg = this._sanitizer.bypassSecurityTrustHtml(data);
  };

  constructor(private _http: HttpClient, private _sanitizer: DomSanitizer) {}

  private _src: string;
  @Output() srcChange = new EventEmitter();
  
  set src(val: string) {
    this._src = val;
    this.srcChange.emit(this._src);
    this.getIcon();
  }
  
  @Input() get src(): string {
    return this._src;
  }
  
  @Input() alt: string;
}
