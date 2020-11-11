export interface IDefaultCurrency {
  id: number,
  currency_title: string,
  code: number,
  value: string,
  status: number,
  default: number,
  simbol_left: string,
  simbol_right: string,
  decimal_places: number,
  created_at: string,
  updated_at: string
}

export interface IDefaultCurrencyData {
  data: IDefaultCurrency
}
