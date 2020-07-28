import { IImage } from "./image";

export interface IImageResponse {
  data: Array<IImage>;
  count: number;
  skip: number;
  take: number;
}
