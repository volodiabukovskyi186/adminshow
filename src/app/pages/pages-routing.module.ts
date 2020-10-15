import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginPageComponent } from "./login-page/login-page.component";
import { DashboardPageComponent } from "./dashboard-page/dashboard-page.component";
import { AuthGuard } from "../core/auth/auth.guard";
import { RolesPageComponent } from "./roles-page/roles-page.component";
import { PermissionGuard } from "../core/permission/permission.guard";
import { ImagePageComponent } from "./image-page/image-page.component";
import { LanguagePageComponent } from "./localization/language-page/language-page.component";
import { CurrenciesPageComponent } from './localization/currencies-page/currencies-page.component';

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
import { OrdersComponent } from './orders/orders.component';
import { CustomersComponent } from './customers/customers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {OrderStatusPageComponent} from "./localization/order-status-page/order-status-page.component";
import {StorageStatusPageComponent} from "./localization/storage-status-page/storage-status-page.component";
import {UnitWeightPageComponent} from "./localization/unit-weight-page/unit-weight-page.component";
import {PaymentMethodsPageComponent} from "./client/payment-methods-page/payment-methods-page.component";
import {CountriesPageComponent} from "./localization/countries-page/countries-page.component";
import {DeliveryMethodsPageComponent} from "./client/delivery-methods-page/delivery-methods-page.component";
import { SettingsPageComponent } from '../pages/client/settings-page/settings-page.component';
import { ReviewsPageComponent } from './reviews-page/reviews-page.component';

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
    // canActivate: [AuthGuard, PermissionGuard],
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
    path: "currencies",
    component: CurrenciesPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: [],
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
  {
    path: "orders",
    component: OrdersComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: [],
    },
  },
  {
    path: "order_status",
    component: OrderStatusPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: [],
    },
  },
  {
    path: "storage_status",
    component: StorageStatusPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: [],
    },
  },
  {
    path: "unit_weight",
    component:UnitWeightPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: [],
    },
  },
  {
    path: "payment_methods",
    component:PaymentMethodsPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: [],
    },
  },
  {
    path: "delivery_methods",
    component:DeliveryMethodsPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: [],
    },
  },
  {
    path: "country",
    component:CountriesPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: [],
    },
  },
  {
    path: "customers",
    component: CustomersComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: ["manage_categorys", "manage_albums"],
    },
  },
  {
    path: "settings",
    component: SettingsPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: [],
    },
  },
  {
    path: "reviews",
    component: ReviewsPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: [],
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(pagesRoutes), BrowserAnimationsModule],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
