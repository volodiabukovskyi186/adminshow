export interface IOrderProductResponse {
  data: IOrderProductResponseData,
  host: string
}

export interface IOrderProductResponseData {
  id: number,
  created_at: string,
  order_id: number,
  product_id: number,
  model: string,
  quantity: string,
  unit_price: string,
  total: string,
  updated_at: string
}
