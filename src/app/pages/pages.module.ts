import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PagesRoutingModule } from "./pages-routing.module";
import { PagesComponent } from "./pages.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { AuthModule } from "../core/auth/auth.module";
import { UiModule } from "../modules/ui/ui.module";
import { DashboardPageComponent } from "./dashboard-page/dashboard-page.component";
import { TranslateModule } from "@ngx-translate/core";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { LayoutModule } from "./@layout/@layout.module";
import { RolesPageComponent } from "./roles-page/roles-page.component";


// import { LocalDatePipe } from "../core/local-date.pipe";
import { PermissionModule } from "../core/permission/permission.module";
import { RolesModule } from "../modules/roles/roles.module";
import { NgxUiLoaderModule, NgxUiLoaderConfig } from "ngx-ui-loader";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { ImagePageComponent } from "./image-page/image-page.component";
import { GalleryModule } from "../modules/gallery/gallery.module";

import { NgxFilesizeModule } from "ngx-filesize";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ProductsPageComponent } from "./catalog/products-page/products-page.component";
import { PromotionsPageComponent } from "./catalog/promotions-page/promotions-page.component";
import { ManufacturerPageComponent } from "./manufacturer-page/manufacturer-page.component";
import { UserModule } from "../modules/user/user.module";
import { LanguagePageComponent } from "./localization/language-page/language-page.component";
import { CurrenciesPageComponent } from './localization/currencies-page/currencies-page.component';
import { LanguageModule } from "../modules/localization/language/language.module";
import {
  // CategoryPageComponent,
  AttribytesPageComponent,
  OptionPageComponent,
} from "./catalog";
import { AttribyteModule } from '../modules/catalog/attribyte/attribyte.module';
import { CategoryModule } from '../modules/catalog/category/category.module';
import { ManufacturerModule } from '../modules/manufacturer/manufacturer.module';
import { AttribyteGroupPageComponent } from './catalog/attribyte-group-page/attribyte-group-page.component';
import { ProductModule } from '../modules/catalog/product/product.module';
import { OptionModule } from '../modules/catalog/option/option.module';
import { PromotionModule } from '../modules/catalog/promotion/promotion.module';
import { CollectionModule } from '../modules/catalog/collection/collection.module';
import { UsersPageComponent } from './users-page/users-page.component';
import { SitePagePageComponent } from './client/site-page-page/site-page-page.component';
import { SiteMenuPageComponent } from './client/site-menu-page/site-menu-page.component';
import { SiteMenuModule } from '../modules/client/site-menu/site-menu.module';
import { SitePageModule } from '../modules/client/site-page/site-page.module';
import { CoreModule } from '../core/core.module';
import { ngxUiLoaderConfig } from './ngx-ui-loader.config';
import { OrdersComponent } from './orders/orders.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { OrderStatusPageComponent } from './localization/order-status-page/order-status-page.component';
import {OrderStatusModule} from "../modules/localization/order-status/order-status.module";
import { StorageStatusPageComponent } from './localization/storage-status-page/storage-status-page.component';
import { UnitWeightPageComponent } from './localization/unit-weight-page/unit-weight-page.component';
import {UnitWeightModule} from "../modules/localization/unit-weight/unit-weight.module";
import { PaymentMethodsPageComponent } from './client/payment-methods-page/payment-methods-page.component';
import {PaymentMethodsModule} from "../modules/client/payment-methods/payment-methods.module";
import { CountriesPageComponent } from './localization/countries-page/countries-page.component';
import {CountriesModule} from "../modules/localization/countries/countries.module";
import { DeliveryMethodsPageComponent } from './client/delivery-methods-page/delivery-methods-page.component';
import {DeliveryMethodsModule} from "../modules/client/delivery-methods/delivery-methods.module";
import {StorageModule} from "../modules/localization/storage/storage.module";
import { MatTableExporterModule } from 'mat-table-exporter';
import { CdkTableExporterModule } from 'cdk-table-exporter';
import {MatTableModule} from "@angular/material/table";
import { CustomersComponent } from './customers/customers.component';
import { CustomerFormComponent } from './customers/customer-form/customer-form.component';
import { CurrencyFormComponent } from './localization/currencies-page/currency-form/currency-form.component';
import { SettingsPageComponent } from './client/settings-page/settings-page.component';
import { SettingsPageFormComponent } from './client/settings-page/settings-page-form/settings-page-form.component';
import { OrderFormComponent } from './orders/order-form/order-form.component';
import { ReviewsPageComponent } from './reviews-page/reviews-page.component';
import { ReviewsFormComponent } from './reviews-page/reviews-form/reviews-form.component';
import { ReviewsFiltersFormComponent } from './reviews-page/reviews-filters-form/reviews-filters-form.component';
import { LiqpayPageComponent } from './client/liqpay-page/liqpay-page.component';
import { LipayFormComponent } from '../modules/client/liqpay/lipay-form/lipay-form.component';
import { OrderFiltersFormComponent } from './orders/order-filters-form/order-filters-form.component';
import { ClickOutsideModule } from 'ng-click-outside';
import {MatPaginatorModule} from '@angular/material/paginator';
import { EditOrderFormComponent } from './orders/edit-order-form/edit-order-form.component';
import {MatDialogModule} from '@angular/material/dialog';
import { SelectedComponent } from './selected/selected.component';
import { SelectedFilterComponent } from './selected/selected-filter/selected-filter.component';
import { BasketComponent } from './basket/basket.component';
import { BasketFilterComponent } from './basket/basket-filter/basket-filter.component';
import { SizeGroupsPageComponent } from './size-groups-page/size-groups-page.component';
import { SizeGroupsFormComponent } from './size-groups-page/size-groups-form/size-groups-form.component';
import { SizeParamsPageComponent } from './size-params-page/size-params-page.component';
import { SizeParamsFormComponent } from './size-params-page/size-params-form/size-params-form.component';
import { SizesPageComponent } from './sizes-page/sizes-page.component';
import { SizesFormComponent } from './sizes-page/sizes-form/sizes-form.component';

@NgModule({
  declarations: [

    PagesComponent,
    // LocalDatePipe,
    LoginPageComponent,
    DashboardPageComponent,
    PageNotFoundComponent,
    RolesPageComponent,
    // CategoryPageComponent,
    ImagePageComponent,
    AttribytesPageComponent,
    LoginPageComponent,
    ProductsPageComponent,
    PromotionsPageComponent,
    ManufacturerPageComponent,
    LanguagePageComponent,
    CurrenciesPageComponent,
    AttribyteGroupPageComponent,
    OptionPageComponent,
    UsersPageComponent,
    SitePagePageComponent,
    SiteMenuPageComponent,
    OrdersComponent,
    CustomersComponent,
    CustomerFormComponent,
    CurrencyFormComponent,
    SettingsPageComponent,
    SettingsPageFormComponent,
    OrderFormComponent,
    ReviewsPageComponent,
    ReviewsFormComponent,
    ReviewsFiltersFormComponent,
    OrdersComponent,
    OrderStatusPageComponent,
    StorageStatusPageComponent,
    UnitWeightPageComponent,
    PaymentMethodsPageComponent,
    CountriesPageComponent,
    DeliveryMethodsPageComponent,
    LiqpayPageComponent,
    LipayFormComponent,
    OrderFiltersFormComponent,
    EditOrderFormComponent,
    SelectedComponent,
    SelectedFilterComponent,
    BasketComponent,
    BasketFilterComponent,
    SizeGroupsPageComponent,
    SizeGroupsFormComponent,
    SizeParamsPageComponent,
    SizeParamsFormComponent,
    SizesPageComponent,
    SizesFormComponent,


  ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        AuthModule,
        UiModule,
        BrowserAnimationsModule,
        LayoutModule,
        GalleryModule,
        PermissionModule,
        NgxFilesizeModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        RolesModule,
        UserModule,
        LanguageModule,
        ManufacturerModule,
        AttribyteModule,
        CategoryModule,
        ProductModule,
        OptionModule,
        CoreModule,
        PromotionModule,
        CollectionModule,
        SiteMenuModule,
        SitePageModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatTableExporterModule,
        CdkTableExporterModule,
        MatSelectModule,
        MatDialogModule,
        NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
        //BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot({
            closeButton: true,
            positionClass: "toast-top-center",
            enableHtml: true,
            tapToDismiss: false,
            // disableTimeOut: true,
            progressBar: true,
            // preventDuplicates: true,
        }),
        OrderStatusModule,
        UnitWeightModule,
        PaymentMethodsModule,
        CountriesModule,
        DeliveryMethodsModule,
        StorageModule,
        MatTableModule,
        ClickOutsideModule,
        MatPaginatorModule,


        // ToastrModule added
    ],
  providers: [
    // LocalDatePipe
  ],
  exports: [PagesComponent],
})
export class PagesModule {}
