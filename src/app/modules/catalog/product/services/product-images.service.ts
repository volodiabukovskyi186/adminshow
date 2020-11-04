import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IImage } from "src/app/modules/gallery/folder/interfaces";

export interface IProdImage {
  id: number;
  product_id: number;
  image_id: number;
  image: IImage;
}

@Injectable({
  providedIn: "root",
})
export class ProductImagesService {
  // list: Array<any> = [];
  // values: Array<number> = [];

  selected: IProdImage[] = [];
  host: string = null;

  constructor(private http: HttpClient) {}

  getByProdId(prodId: number): Observable<any> {
    return this.http.get<any>(
      environment.catalog.product.product + `/getProductImages/${prodId}`
    );
  }

  put(prodId: number): Observable<any> {
    let data: Array<number> = this.selected.map((val) => val.image_id);
    return this.http.put(
      `${environment.host}product_image/updateArray/${prodId}`,
      data
    );
  }
  
  deleteImages(prodId: number,array:any): Observable<any>{
    return this.http.put(
      `${environment.host}product_image/updateArray/${prodId}`,
      array
    );
  }
  // initVales() {
  //   this.values = [];
  //   this.list.forEach((element) => {
  //     this.values.push(element.category_id);
  //   });
  // }

  pushImages(images: IImage[], prodId: number = 0) {
    images.forEach((img) => {
      this.selected.push({
        id: 0,
        image: img,
        image_id: img.id,
        product_id: prodId,
      });
    });
  }

  deleteProdImage(prodImage: IProdImage) {
    this.deleteFromArray(prodImage, this.selected)
  }


  protected deleteFromArray(object: any, array: Array<Object>) {
    const index: number = array.indexOf(object);
    if (index !== -1) {
      array.splice(index, 1);
    }
    this.put(object.product_id)
   console.log('object====>', object.product_id)
  }
}
