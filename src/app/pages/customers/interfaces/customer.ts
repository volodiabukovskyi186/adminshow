export interface ICustomer {
  id: number,
  subscriptions_type_id: number,
  email: string,
  first_name: string,
  last_name: string,
  telephone: string,
  created_at: string,
  updated_at: string
}

export interface ICustomerPostData {
  subscriptions_type_id: number,
  email: string,
  first_name: string,
  last_name: string,
  telephone: string
}
