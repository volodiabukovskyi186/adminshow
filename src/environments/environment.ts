// const host = "http://api.show-u.loc/";
// const host = "http://showu.zzz.com.ua/";
const host = `https://api.showu.com.ua/`;

export const environment = {
  production: false,
  host: host,
  signin: host + `signin`,
  getUserByToken: host + `getUserByToken`,
  role: {
    roles: host + `roles`,
    role: host + `role`,
  },
  orders: host + `orders`,
  orderang:host+`ownerOrders`,
  gallery: {
    images: {
      images: host + `images`,
      image: host + `image`,
      albums: host + `albums`,
      album: host + `album`,
    },
  },
  localization: {
    language: {
      languages: host + `languages`,
      language: host + `language`,
    },
  },
  client: {
    page: {
      pages: host + `pages`,
      page: host + `page`,
    },
    menu: {
      menus: host + `menus`,
      menu: host + `menu`,
    },
  },
  user: {
    users: host + `users`,
    user: host + `user`,
  },
  catalog: {
    collection: {
      collections: host + `collections`,
      collection: host + `collection`,
    },
    promotion: {
      promotions: host + `promotions`,
      promotion: host + `promotion`,
    },
    option: {
      options: host + `options`,
      option: host + `option`,
      optionValues: host + `option_values`,
      optionValue: host + `option_value`,
    },
    category: {
      categorys: host + `categorys`,
      category: host + `category`,
    },
    attr: {
      atrribytes: host + `atrribytes`,
      atrribyte: host + `atrribyte`,
      attribyteGroups: host + `attribyte_groups`,
      attribyteGroup: host + `attribyte_group`,
    },
    product: {
      products: host + `products`,
      product: host + `product`,
    },
  },
  manufacturer: {
    manufacturers: host + `manufacturers`,
    manufacturer: host + `manufacturer`,
  },
  localizations:{
    orderstatus:host+`order_statuss`,
    orderstatusdel:host+`order_status`,
    orderstatusup:host+`order_status`,
    weightclient:host+`weight/client`,
    stockstatus:host+`stock_status/client`,
    orderstoragestatus:host+``,
    orderstatuslang:host+`order_status/client`

  },
  weight:{
    weights:host+`weights`,
    weight:host+`weight`,
  },
  payment:{
    payments:host+`payments`,
    payment:host+`payment`,
    payment_description:host+'payment_description'
  },
  delivery:{
    deliverys:host+'deliverys',
    delivery:host+'delivery'
  },
  stockstatus:{
    stockstatuss:host+'stock_statuss',
    stockstatus:host+'stock_status'
  },
  liqpay:{
    liqpay:host+'keys'
  
  },
  countries:{
    countrys:host+'countrys',
    country:host+'country',
    countrypay:host+'country_payment',
    countrydeliverys:host+'country_deliverys',
    delivers:{
      deliverys:host+'country_deliverys',
      delivery:host+'country_delivery'
    }
  },
  countrypaydeliver:{
    countrypayarr:host+'country_payment/updateArray',
    countrypay:host+'getPaymentsCountry',
    countrydeliverarr:host+'country_delivery/updateArray',
    countrydeliver:host+'getDeliveriesCountry'

}

};
