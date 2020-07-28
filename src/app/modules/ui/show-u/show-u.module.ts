import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ShowURapHeroComponent } from "./show-u-rap-hero/show-u-rap-hero.component";
import { RapModule } from '../rap/rap.module';

const COMPONENTS = [ShowURapHeroComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, RapModule],
  exports: [...COMPONENTS]
})
export class ShowUModule {}
