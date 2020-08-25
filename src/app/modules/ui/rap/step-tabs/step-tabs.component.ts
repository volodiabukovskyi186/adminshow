import {
  Component,
  Input,
  AfterContentInit,
  Output,
  EventEmitter,
  ContentChildren,
  AfterViewInit,
} from "@angular/core";
import { StepTabComponent } from "../step-tab/step-tab.component";
import { LanguageService as LocalizationLang } from "src/app/modules/localization/language/language.service";

@Component({
  selector: "rap-step-tabs",
  templateUrl: "./step-tabs.component.html",
  styleUrls: ["./step-tabs.component.scss"],
})
export class StepTabsComponent implements AfterContentInit, AfterViewInit {
  @Input() vertical;
  @Output() onSelect = new EventEmitter();
  @ContentChildren(StepTabComponent) tabs;

  constructor(
    public languageService: LocalizationLang
  ) {}

  ngAfterContentInit() {
    this.initTabs();
  }

  ngAfterViewChecked() {
    this.initTabs();
  }

  ngAfterViewInit(): void {
    this.initTabs();
  }

  initTabs() {
    const tabs = this.tabs.toArray();
    const actives = this.tabs.filter((t) => {
      return t.active;
    });

    if (actives.length > 1) {
      console.error(`Multiple active tabs set 'active'`);
    } else if (!actives.length && tabs.length) {
      tabs[0].active = true;
    }
  }

  tabClicked(tab) {
    const tabs = this.tabs.toArray();

    tabs.forEach((tab) => (tab.active = false));
    tab.active = true;

    this.onSelect.emit(tab);
  }
}
