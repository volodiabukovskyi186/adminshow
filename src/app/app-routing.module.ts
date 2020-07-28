import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from "./pages/pages.component";
import { pagesRoutes } from "./pages/pages-routing.module";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { langMatcher } from "./lang.matcher";

const routes: Routes = [
  { path: "", component: PagesComponent, children: pagesRoutes },
  { matcher: langMatcher, component: PagesComponent, children: pagesRoutes },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
