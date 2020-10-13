export interface IManufacuturerOrderDescription {
  id: number,
  lang_id: number,
  manufactured_id: number,
  name: string,
  description: string,
  meta_description: string,
  meta_keywords: string,
  created_at: string,
  updated_at: string
}

export interface IManufacuturerOrder {
  id: number,
  image_id: number,
  user_id: number,
  code: string,
  status: number,
  rating: number,
  created_at: string,
  updated_at: string,
  description: IManufacuturerOrderDescription
}

export interface IOrder {
  id: number,
  store_id: number,
  costumer: string,
  costumer_group_id: number,
  currency_id: number,
  first_name: string,
  last_name: string,
  email: string,
  country: string,
  city: string,
  telephone: string,
  status_id: number,
  total: string,
  checkoutDelivery: string,
  checkoutDeliveryAddress: string,
  checkoutPayment: string,
  checkoutRecipient: string,
  recipient: string,
  recipientFirstName: string,
  recipientLastName: string,
  recipientPhone: string,
  delivery_id: number,
  created_at: string,
  updated_at: string,
  products: any[],
  status: any[],
  manufacturer: IManufacuturerOrder
}
