import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GoldenPanelComponent } from "./golden-panel/golden-panel.component";
import { PanelComponent } from "./panel/panel.component";
// import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavItemComponent } from "./nav-item/nav-item.component";
import { RouterModule } from "@angular/router";
import { NavGroupComponent } from "./nav-group/nav-group.component";
import { SvgIcoComponent } from "./svg-ico/svg-ico.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";
import { PanelContentComponent } from "./panel-content/panel-content.component";
import { DeleteButtonComponent } from "./delete-button/delete-button.component";
import { CircleProgressComponent } from "./circle-progress/circle-progress.component";
import { RatingComponent } from "./rating/rating.component";
import { PaginationComponent } from "./pagination/pagination.component";
import { StepTabComponent } from "./step-tab/step-tab.component";
import { StepTabsComponent } from "./step-tabs/step-tabs.component";
import { TranslateModule } from "@ngx-translate/core";

const COMPONENTS = [
  GoldenPanelComponent,
  PanelComponent,
  NavItemComponent,
  NavGroupComponent,
  SvgIcoComponent,
  BreadcrumbComponent,
  BreadcrumbsComponent,
  PanelContentComponent,
  DeleteButtonComponent,
  CircleProgressComponent,
  RatingComponent,
  PaginationComponent,
  StepTabComponent,
  StepTabsComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, RouterModule, TranslateModule],
  exports: [...COMPONENTS],
})
export class RapModule {}
