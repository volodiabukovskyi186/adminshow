import { ISiteDescriptions } from './site-descriptions';

export interface ISiteDescriptionsResponse {
    data: {
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
      logo: {},
      icon: {}
    },
    // count: number;
    // skip: number;
    // take: number;
    host: string;
  }