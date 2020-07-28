import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginPageComponent } from "./login-page/login-page.component";
import { DashboardPageComponent } from "./dashboard-page/dashboard-page.component";
import { AuthGuard } from "../core/auth/auth.guard";
import { RolesPageComponent } from "./roles-page/roles-page.component";
import { PermissionGuard } from "../core/permission/permission.guard";
import { ImagePageComponent } from "./image-page/image-page.component";
import { LanguagePageComponent } from "./localization/language-page/language-page.component";
import {
  // CategoryPageComponent,
  AttribytesPageComponent,
  OptionPageComponent,
} from "./catalog";
import { ManufacturerPageComponent } from "./manufacturer-page/manufacturer-page.component";
import { AttribyteGroupPageComponent } from "./catalog/attribyte-group-page/attribyte-group-page.component";
import { ProductsPageComponent } from "./catalog/products-page/products-page.component";
import { PromotionsPageComponent } from "./catalog/promotions-page/promotions-page.component";
import { UsersPageComponent } from "./users-page/users-page.component";
import { SiteMenuPageComponent } from './client/site-menu-page/site-menu-page.component';
import { SitePagePageComponent } from './client/site-page-page/site-page-page.component';

export const pagesRoutes: Routes = [
  {
    path: "login",
    component: LoginPageComponent,
    canActivate: [],
    data: { animation: "LoginPage" },
  },
  {
    path: "",
    component: DashboardPageComponent,
    canActivate: [AuthGuard],
    data: { animation: "HomePage" },
  },
  {
    path: "roles",
    component: RolesPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: ["manage_roles"],
      animation: "RolesPage",
    },
  },
  {
    path: "category",
    // component: CategoryPageComponent,
    loadChildren: () => import('src/app/modules/catalog/category/category.module').then(m => m.CategoryModule),
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: ["manage_categorys", "manage_albums"],
    },
  },
  {
    path: "attrgroups",
    component: AttribyteGroupPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: ["manage_categorys", "manage_albums"],
    },
  },
  {
    path: "attribytes",
    component: AttribytesPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: ["manage_categorys", "manage_albums"],
    },
  },
  {
    path: "option",
    component: OptionPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: ["manage_categorys", "manage_albums"],
    },
  },
  {
    path: "products",
    component: ProductsPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: ["manage_categorys", "manage_albums"],
    },
  },
  {
    path: "promotions",
    component: PromotionsPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: ["manage_categorys", "manage_albums"],
    },
  },
  {
    path: "collection",
    loadChildren: () => import('src/app/modules/catalog/collection/collection.module')
      .then(m => m.CollectionModule),
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: ["manage_categorys", "manage_albums"],
    },
  },
  {
    path: "users",
    component: UsersPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: ["manage_categorys", "manage_albums"],
    },
  },
  {
    path: "manufacturer",
    component: ManufacturerPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: [],
      animation: "ManufacturerPage",
    },
  },
  {
    path: "menu",
    component: SiteMenuPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: [],
    },
  },
  {
    path: "pages",
    component: SitePagePageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: [],
    },
  },
  {
    path: "language",
    component: LanguagePageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: [],
      animation: "",
    },
  },
  {
    path: "images",
    component: ImagePageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: ["manage_imagess"],
      animation: "CategoryPage",
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(pagesRoutes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
