import { ISiteDescriptions } from './site-descriptions';

export interface ISiteDescriptionsResponseData {
  id: number;
  email: string;
  location: string;
  logo_id: number;
  icon_id: number;
  created_at: string;
  updated_at: string;
  descriptions: any[];
  phones: any[];
  socials: any[];
  logo: ISiteImgs,
  icon: ISiteImgs
}
export interface ISiteDescriptionsResponse {
    data: ISiteDescriptionsResponseData;
    // count: number;
    // skip: number;
    // take: number;
    host: string;
  }

export interface ISiteImgs {
    id: number, 
    src: string, 
    src_mini: string
}
