export interface IDescription {
  id: number,
  product_id: number,
  name: string
}

export interface IImage {
  id: number,
  src: string,
  src_mini: string
}

export interface IProduct {
  id: number,
  model: string,
  image_id: number
  description: IDescription,
  image: IImage,
  manufactured: {
    id: number,
    description: {
      manufactured_id: number;
      name: string;
    }
  }
}
