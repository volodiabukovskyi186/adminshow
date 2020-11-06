import { NavLink } from "../modules/ui/rap/nav-item/nav-link";

const ICON_MENU_ITEM = "assets/icons/menu-item.svg";

export const MENU = [
  group("MENU.orders.orders", [
    item("MENU.orders.orders", "orders", true, ICON_MENU_ITEM),
    // item("Accepted", "orders/accepted"),
    // item("Done", "orders/done"),
    // item("Canceled", "orders/canceled"),
  ]),
  group(
    "MENU.catalog.catalog",
    [
      item("MENU.catalog.categories", "category", true, ICON_MENU_ITEM),
      item("MENU.catalog.attr_groups", "attrgroups", true, ICON_MENU_ITEM),
      item("MENU.catalog.attr", "attribytes", true, ICON_MENU_ITEM),
      item("MENU.catalog.options", "option", true, ICON_MENU_ITEM),
      item("MENU.catalog.products", "products", true, ICON_MENU_ITEM),
      item("MENU.catalog.promotions", "promotions", true, ICON_MENU_ITEM),
      item("MENU.catalog.colection", "collection", true, ICON_MENU_ITEM),
    ],
    "assets/icons/menu-katalog.svg"
  ),
  group("MENU.reviews.reviews", [
    item("MENU.reviews.product_reviews", "reviews", true, ICON_MENU_ITEM),
    // item("Review Template", "review/template"),
  ]),
  group(
    "MENU.manufacturer.manufacturers",
    [
      item("MENU.manufacturer.manufacturers", "manufacturer", true, ICON_MENU_ITEM),
      // item("Licences", "licences"),
    ],
    "assets/icons/menu-manufacturer.svg"
  ),
  group("MENU.customers.customers", [
    item("MENU.customers.customers", "customers",true, ICON_MENU_ITEM),
    // item("Inactive", "customers/inactive"),
  ]),
  group(
    "MENU.media.media",
    [
      item("MENU.media.images", "images", true, ICON_MENU_ITEM),
      // item("Video", "videos"),
    ],
    "assets/icons/menu-media.svg"
  ),
  group("MENU.manage_site.manage_site", [
    item("MENU.manage_site.menu", "menu", true, ICON_MENU_ITEM),
    item("MENU.manage_site.pages", "pages", true, ICON_MENU_ITEM),
    item("MENU.manage_site.settings", "settings", true, ICON_MENU_ITEM),
    // item("MENU.manage_site.articles", "articles"),
    // item("Blocks", "blocks"),
    item("MENU.manage_site.delivery_methods", "delivery_methods",true, ICON_MENU_ITEM),
    item("MENU.manage_site.payment_methods", "payment_methods",true, ICON_MENU_ITEM),
    item("MENU.liqpay", "liqpay",true, ICON_MENU_ITEM),
    // item("Webhooks", "webhooks"),
  ]),
  group(
    "MENU.users.users",
    [
      item("MENU.users.users", "roles", true, ICON_MENU_ITEM),
      item("MENU.users.roles", "users", true, ICON_MENU_ITEM),
    ],
    "assets/icons/menu-people.svg"
  ),
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
    item("MENU.localization.languages", "language", true, ICON_MENU_ITEM),
    item("MENU.localization.currencies", "currencies",true, ICON_MENU_ITEM),
    // item("Countries", "countries"),
    // item("MENU.localization.measure_units", "measure_units"),
    // item("MENU.localization.weight_units", "weight_units"),
    // item("MENU.localization.stock_status", "stock_status"),
    item("MENU.localization.order_status", "order_status",true, ICON_MENU_ITEM),
    item("MENU.localization.storage_status", "storage_status",true, ICON_MENU_ITEM),
    item("MENU.localization.unit_weight", "unit_weight",true, ICON_MENU_ITEM),
    item("MENU.localization.country", "country",true, ICON_MENU_ITEM),
    // item("MENU.localization.departments", "departments"),
  ]),


  // group("Other", [item("Log", "log")]),
];

export interface GroupNav {
  title: string;
  open: boolean;
  icon?: string;
  items: Array<NavLink>;
}

function group(
  title: string,
  items: Array<NavLink> = [],
  icon: string = "assets/raisins.svg",
  open: boolean = false
): GroupNav {
  return {
    title,
    icon,
    open,
    items,
  };
}

function item(
  title: string,
  link: string,
  isIcon: boolean = false,
  icon: string = "assets/raisins.svg"
) {
  return { title, link, icon, isIcon };
}

function addItemToGroup(g: GroupNav, i: NavLink) {
  g.items.push(i);
}
