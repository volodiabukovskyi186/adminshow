import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ToastrService } from "ngx-toastr";
import { BreadcrumbsService } from "src/app/core/breadcrumbs.service";
import { PagesService } from "../pages.service";
import { ImagesService } from "src/app/modules/gallery/images.service";
import { ViewMode } from "src/app/modules/gallery/folder/interfaces";
import { deleted, fadeScale, fade } from "src/app/modules/ui/animations";
import { AlbumService } from 'src/app/modules/gallery/album.service';
import { LanguageService as Lang } from "src/app/core/language.service";

@Component({
  animations: [deleted, fadeScale, fade],
  selector: "app-image-page",
  templateUrl: "./image-page.component.html",
  styleUrls: ["./image-page.component.scss"],
})
export class ImagePageComponent implements OnInit {
  ViewMode = ViewMode;

  public mode: ViewMode = ViewMode.card;
  public editable: boolean = true;

  constructor(
    private ngxService: NgxUiLoaderService,
    private toastr: ToastrService,
    public breadcrumbs: BreadcrumbsService,
    public pages: PagesService,
    public image: ImagesService,
    public album: AlbumService,
    public lang: Lang,
  ) {
    this.init();
  }

  public ngOnInit(): void {
    this.initTranslate();
  }

  public init(): void {
    this.pages.defaultSetting();
    this.pages.panelSettings.left = true;
    this.pages.panelSettings.top = true;

    this.pages.panelButtonSettings.rightToggle = true;
    this.pages.panelButtonSettings.plus = true;

    this.pages.onCancelClick = this.closeForm;

    // this.pages

    this.pages.onPlusClick = this.openForm;

    this.breadcrumbs.breadcrumbs = [
      { link: "", title: "Dashboard" },
      { link: "images", title: "Images" },
    ];

  }

  public initTranslate(): void {
    this.lang.translate
      .get([
        "dashboard.dashboard",
        "MENU.media.images",
      ])
      .subscribe((tr: any) => {
        this.breadcrumbs.breadcrumbs = [
          { link: "", title: tr["dashboard.dashboard"] },
          { link: "images", title: tr["MENU.media.images"] },
        ];
      });
  }

  openForm = () => {
    this.pages.panelSettings.form = true;
    this.pages.panelButtonSettings.plus = false;
    this.pages.panelButtonSettings.cancel = true;
    this.pages.panelButtonSettings.rightToggle = false;
  };

  closeForm = () => {
    this.pages.panelSettings.form = false;
    this.pages.panelButtonSettings.plus = true;
    this.pages.panelButtonSettings.cancel = false;
    this.pages.panelButtonSettings.rightToggle = true;
  };
}
