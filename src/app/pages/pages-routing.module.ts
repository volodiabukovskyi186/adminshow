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
import { LiqpayPageComponent } from './client/liqpay-page/liqpay-page.component';
import {SelectedComponent} from './selected/selected.component';
import {BaseComponent} from '../modules/catalog/product/components/layouts/base/base.component';
import {BasketComponent} from './basket/basket.component';

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
      permissions: ["manage_categorys"],
    },
  },
  {
    path: "attrgroups",
    component: AttribyteGroupPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: ["manage_attribytes","manage_attribytedescriptions","manage_attribytegroups","manage_attribytegroupdescriptions"],
    },
  },
  {
    path: "attribytes",
    component: AttribytesPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: ["manage_orders", "manage_albums"],
    },
  },
  {
    path: "option",
    component: OptionPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: ["manage_orders"],
    },
  },
  {
    path: "products",
    component: ProductsPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: ["manage_products"],
    },
  },
  {
    path: "promotions",
    component: PromotionsPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: ["manage_categorys", "manage_productpromotions"],
    },
  },
  {
    path: "collection",
    loadChildren: () => import('src/app/modules/catalog/collection/collection.module')
      .then(m => m.CollectionModule),
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: ["manage_categorys", "manage_productcollections"],
    },
  },
  {
    path: "users",
    component: UsersPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: [ "manage_users"],
    },
  },
  {
    path: "manufacturer",
    component: ManufacturerPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: ["manage_manufacturers","manage_manufacturerdescriptions"],
      animation: "ManufacturerPage",
    },
  },
  {
    path: "menu",
    component: SiteMenuPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: ["manage_menus","manage_menudescriptions"],
    },
  },
  {
    path: "pages",
    component: SitePagePageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: ["manage_pages","manage_pagedescriptions"],
    },
  },
  {
    path: "language",
    component: LanguagePageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: ["manage_languagess"],
      animation: "",
    },
  },
  {
    path: "currencies",
    component: CurrenciesPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: ["manage_currencys"],
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
      permissions: ["manage_orders"],
    },
  },
  {
    path: "order_status",
    component: OrderStatusPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: ["manage_orderstatuss"],
    },
  },
  {
    path: "storage_status",
    component: StorageStatusPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: ["manage_stockstatuss"],
    },
  },
  {
    path: "unit_weight",
    component:UnitWeightPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: ["manage_weightclasss"],
    },
  },
  {
    path: "payment_methods",
    component:PaymentMethodsPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: ["manage_payments"],
    },
  },
  {
    path: "delivery_methods",
    component:DeliveryMethodsPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: ["manage_deliverys"],
    },
  },
  {
    path: "country",
    component:CountriesPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: ["manage_countrys","manage_countrydescriptions","manage_countrydeliverys","manage_countrypayments"],
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
      permissions: ["manage_reviews"],
    },
  },
  {
    path: 'liqpay',
    component: LiqpayPageComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: ['manage_payments'],
    },
  },
  {
    path: 'selected',
    component: SelectedComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: ['manage_albums'],
    },
  },
  {
    path: 'basket',
    component: BasketComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: ['manage_albums'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(pagesRoutes, { useHash: true }), BrowserAnimationsModule],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
