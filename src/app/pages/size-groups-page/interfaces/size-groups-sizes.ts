export interface ISizeGroupsSizesDesc {
  id: number,
  name: string,
  lang_id: number,
  size_id: number,
  created_at: string,
  updated_at: string
}

export interface ISizeGroupsSizes {
  id: number,
  group_id: number,
  sort_order: number,
  created_at: string,
  updated_at: string,
  descriptions: Array<ISizeGroupsSizesDesc>
}
