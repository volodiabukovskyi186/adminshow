import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RapMenuComponent } from "./rap-menu/rap-menu.component";
import { UiModule } from 'src/app/modules/ui/ui.module';
import { UserModule } from 'src/app/modules/user/user.module';
import { RouterModule } from '@angular/router';

const COMPNTS = [RapMenuComponent];

@NgModule({
  declarations: [...COMPNTS],
  exports: [...COMPNTS],
  imports: [CommonModule, UiModule, RouterModule, UserModule]
})
export class LayoutModule {}
