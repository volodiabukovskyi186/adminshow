import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CollectionPageComponent } from './components/collection-page/collection-page.component';

const routes: Routes = [
  {
    path: "",
    component: CollectionPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionRoutingModule {}
