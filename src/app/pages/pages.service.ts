import { Injectable } from "@angular/core";
import {
  PanelSettings,
  PanelButtonSettings
} from "../modules/ui/rap/panel/panel-settings";

@Injectable({
  providedIn: "root"
})
export class PagesService {
  panelSettings: PanelSettings;

  panelButtonSettings: PanelButtonSettings;

  onPlusClick: () => void;
  onSaveClick: () => void;
  onCancelClick: () => void;
  onReviewClick: () => void;
  onTogleFilterClick: () => void;

  constructor() {
    this.defaultSetting();
  }

  public defaultSetting() {
    this.initPanelSettings();
    this.initPanelButtonSettings();
  }

  initPanelSettings() {
    this.panelSettings = {
      footer: false,
      left: false,
      right: false,
      top: false,
      form: false
    };
  }

  initPanelButtonSettings() {
    this.panelButtonSettings = {
      rightToggle: false,
      plus: false,
      cancel: false,
      save: false,
      review: false,
      toggleFilter: true
    };
  }
}
