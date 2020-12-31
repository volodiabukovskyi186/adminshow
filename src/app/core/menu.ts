import { NavLink } from "../modules/ui/rap/nav-item/nav-link";

const ICON_MENU_ITEM = "assets/icons/menu-item.svg";

export const MENU = [
  group(
    "MENU.media.media",
    [
      item("MENU.media.images", "images", true, ICON_MENU_ITEM,"manage_imagess"),
      // item("Video", "videos"),
    ],
    "assets/icons/gallery.svg","",
    ["manage_imagess"]
    
  ),
  group("MENU.orders.orders", [
        item("MENU.orders.orders", "orders", true, ICON_MENU_ITEM,"manage_orders"),
        item("orders.selected", "selected", true, ICON_MENU_ITEM,"manage_orders"),
        item("orders.basket", "basket", true, ICON_MENU_ITEM,"manage_orders"),
    // item("Accepted", "orders/accepted"),
    // item("Done", "orders/done"),
    // item("Canceled", "orders/canceled"),
  ],
  "assets/icons/shop.svg",'',
  ["manage_orders"]
  ),

  group(
    "MENU.catalog.catalog",
    [
      item("MENU.catalog.categories", "category", true, ICON_MENU_ITEM,"manage_orders"),
      item("MENU.catalog.attr_groups", "attrgroups", true, ICON_MENU_ITEM,"manage_attribytegroups"),
      item("MENU.catalog.attr", "attribytes", true, ICON_MENU_ITEM,"manage_orders"),
      item("MENU.catalog.options", "option", true, ICON_MENU_ITEM,"manage_orders"),
      item("MENU.catalog.products", "products", true, ICON_MENU_ITEM,"manage_products"),
      item("MENU.catalog.promotions", "promotions", true, ICON_MENU_ITEM,"manage_productpromotions"),
      item("MENU.catalog.colection", "collection", true, ICON_MENU_ITEM,"manage_collections"),
    ],
    "assets/icons/menu-katalog.svg","",
  ["manage_categorys","manage_attribytegroups","manage_attribytes","manage_options","manage_products","manage_productpromotions","manage_collections"]
  ),
  group(
    "MENU.manufacturer.manufacturers",
    [
      item("MENU.manufacturer.manufacturers", "manufacturer", true, ICON_MENU_ITEM,"manage_manufacturers"),
      item("MENU.manufacturer.sizeGroups", "size_groups", true, ICON_MENU_ITEM,"manage_manufacturers"),
      item("MENU.manufacturer.sizeParams", "size_params", true, ICON_MENU_ITEM,"manage_manufacturers"),
      // item("Licences", "licences"),
    ],
    "assets/icons/brand2.svg","",
    ["manage_manufacturers"]
  ),
  group("MENU.customers.customers", [
    item("MENU.customers.customers", "customers",true, ICON_MENU_ITEM,"manage_clients"),
    // item("Inactive", "customers/inactive"),
  ],
  "assets/icons/client.svg","",
  ["manage_clients"]
  ),

  group("MENU.reviews.reviews", [
    item("MENU.reviews.product_reviews", "reviews", true, ICON_MENU_ITEM, "manage_reviews" ),
    // item("Review Template", "review/template"),
  ],
  "assets/icons/review.svg","",
  ["manage_reviews"]
 
  ),
  group("MENU.manage_site.manage_site", [
   
    // item("MENU.manage_site.articles", "articles"),
    // item("Blocks", "blocks"),
    item("MENU.manage_site.menu", "menu", true, ICON_MENU_ITEM,"manage_menus"),
    item("MENU.manage_site.delivery_methods", "delivery_methods",true, ICON_MENU_ITEM,"manage_menus"),
    item("MENU.manage_site.payment_methods", "payment_methods",true, ICON_MENU_ITEM,"manage_menus"),
    item("MENU.liqpay", "liqpay",true, ICON_MENU_ITEM,"payment_methods"),
    // item("Webhooks", "webhooks"),
  ],
  "assets/icons/manage.svg","",
  ["manage_menus","delivery_methods","payment_methods","payment_methods"]
  ),

  group(
    "MENU.manage_site.settings",
    [
      item("MENU.manage_site.settingsMain", "settings", true, ICON_MENU_ITEM,"manage_sites"),
      item("MENU.manage_site.pages", "pages", true, ICON_MENU_ITEM,"manage_pages"),
      item("MENU.users.users", "roles", true, ICON_MENU_ITEM,"manage_roles"),
      item("MENU.users.roles", "users", true, ICON_MENU_ITEM,"manage_roles"),
     
      // item("Video", "videos"),
    ],
    "assets/icons/new_setting.svg","",
    ["manage_sites","manage_pages","manage_roles","manage_users"]
  ),
  // group(
  //   "MENU.users.users",
  //   [
     
  //   ],
  //   "assets/icons/menu-people.svg"
  // ),
  // group("Statistic", [
  //   item("Order", "statistic/order"),
  //   item("Product", "statistic/product"),
  // ]),
  // group(
  //     "MENU.settings.settings",
  //     [
  //       item("MENU.settings.payment_methods", "payment_methods", true, ICON_MENU_ITEM),
  //     ],
  //     "assets/icons/menu-people.svg"
  // ),
  group("MENU.localization.localization", [
    item("MENU.localization.languages", "language", true, ICON_MENU_ITEM,"manage_languagess"),
    item("MENU.localization.currencies", "currencies",true, ICON_MENU_ITEM,"manage_currencys"),
    item("MENU.localization.order_status", "order_status",true, ICON_MENU_ITEM,"manage_countrys"),
    item("MENU.localization.storage_status", "storage_status",true, ICON_MENU_ITEM,"storage_status"),
    item("MENU.localization.unit_weight", "unit_weight",true, ICON_MENU_ITEM,"manage_countrys"),
    item("MENU.localization.country", "country",true, ICON_MENU_ITEM,"manage_countrys"),
    // item("MENU.localization.departments", "departments"),
  ],
  "assets/icons/localization.svg","",
  ["manage_languagess","manage_currencys","manage_orders","storage_status","manage_weightclasss","manage_countrys"]

   ),


  // group("Other", [item("Log", "log")]),
];

export interface GroupNav {
  title: string;
  open: boolean;
  icon?: string;
  manage:string,
  mainManage:Array<string>,
  items: Array<NavLink>;
  hidden:boolean;
}

function group(
  title: string,
  items: Array<NavLink> = [],
  icon: string = "assets/raisins.svg",
  manage:string='',
  mainManage:Array<string>=[],
  open: boolean = false,
  hidden: boolean = true,
): GroupNav {
  return {
    title,
    icon,
    manage,
    mainManage,
    open,
    items,
    hidden,
  };
}

function item(
  title: string,
  link: string,
  isIcon: boolean = false,
  icon: string = "assets/raisins.svg", 
  manage:string='',
  hidden:boolean=true,

) {
  return { title, link, icon, isIcon ,manage,hidden};
}

function addItemToGroup(g: GroupNav, i: NavLink) {
  g.items.push(i);
}
