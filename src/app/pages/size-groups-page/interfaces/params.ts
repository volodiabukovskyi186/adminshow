export interface IParamsDesc {
  id: number;
  name: string;
  lang_id: number;
  size_param_id: number;
  created_at: string;
  updated_at: string;
}

export interface IParams {
  id: number;
  group_id: number;
  sort_order: string;
  created_at: string;
  updated_at: string;
  descriptions: Array<IParamsDesc>;
}
