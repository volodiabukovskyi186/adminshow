import { ISizeGroups } from './size-groups';

export interface ISizeGroupsResponse {
  count: number,
  data: Array<ISizeGroups>,
  skip: number,
  take: number,
  host: string
}