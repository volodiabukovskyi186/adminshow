import { PagesService } from "../pages.service";

// @Injectable()
export abstract class BasePage {
  msgAdded: string = "Item successfully added";
  msgUpdated: string = "Item successfully updated";
  msgDeleted: string = "Item successfully deleted";
  
  constructor(public pages: PagesService) {}

  openForm = () => {
    this.pages.panelSettings.form = true;
    this.pages.panelButtonSettings.plus = false;
    this.pages.panelButtonSettings.save = true;
    this.pages.panelButtonSettings.cancel = true;
    this.pages.panelButtonSettings.rightToggle = false;
    this.pages.panelButtonSettings.review = false;
  };

  closeForm = () => {
    this.pages.panelSettings.form = false;
    this.pages.panelButtonSettings.plus = true;
    this.pages.panelButtonSettings.save = false;
    this.pages.panelButtonSettings.cancel = false;
    this.pages.panelButtonSettings.rightToggle = false;
    this.pages.panelButtonSettings.review = false;
  };

  initPagesSettings() {
    this.pages.defaultSetting();
    this.pages.panelSettings.left = true;
    this.pages.panelSettings.top = true;
    this.pages.panelButtonSettings.rightToggle = false;
    this.pages.panelButtonSettings.plus = true;
    this.pages.panelButtonSettings.review = false;
  }

  initPanelButton() {
    this.pages.onCancelClick = this.cancel;
    this.pages.onSaveClick = this.save;
    this.pages.onPlusClick = this.plus;
    this.pages.onReviewClick = this.review;
    this.pages.onDwnloadClick = this.download;

  }

  cancel = () => {
    this.closeForm();
  };
  
  save = () => {};

  plus = () => {
    this.openForm();
  };
  download = () => {
  };

  review = () => {
    this.openForm();
  };
}
