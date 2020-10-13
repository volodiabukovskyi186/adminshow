export interface ISiteDescriptions {
  id: number,
  name: string,
  adress: string,
  site_id: number,
  lang_id: number,
  meta_description: string,
  meta_keywords: string,
  work_schedule: string,
  created_at: string,
  updated_at: string
}

export interface ISiteSettingImg {
  host?: string,
  image_id?: number,
  image?: {
    src?: string,
    src_mini?: string
  }
}