import { IAlbum } from "./album";

export interface IAlbumResponse {
  data: Array<IAlbum>;
  count: number;
  skip: number;
  take: number;
}
