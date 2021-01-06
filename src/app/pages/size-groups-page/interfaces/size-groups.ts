import { ISizeGroupsDesc } from './size-groups-desc';
import { ISizeGroupsSizes } from './size-groups-sizes';
import { IParams } from './params';

export interface ISizeGroups {
  id: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
  descriptions: Array<ISizeGroupsDesc>;
  sizes: Array<ISizeGroupsSizes>;
  params: Array<IParams>;
}
