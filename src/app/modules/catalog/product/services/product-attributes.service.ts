import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IAttribyte } from "../../attribyte/interfaces";

export interface IProdAttr {
  id: number;
  lang_id: number;
  attribyte_id: number;
  product_id: number;
  text: string;
  created_at: string;
  updated_at: string;
  attribyte: IAttribyte;
}

@Injectable({
  providedIn: "root",
})
export class ProductAttributesService {
  list: Array<IProdAttr> = [];
  model: IProdAttr;

  constructor(private http: HttpClient) {}

  initModel(prodId: number, m: IProdAttr = null) {
    if (m != null) {
      this.model = m;
    } else {
      this.model = {
        attribyte: null,
        attribyte_id: null,
        created_at: null,
        id: null,
        lang_id: null,
        product_id: prodId,
        text: null,
        updated_at: null,
      };
    }
  }

  getByProdId(prodId: number): Observable<any> {
    return this.http.get<any>(
      environment.host + `product/getProductAttribytes/${prodId}`
    );
  }

  post(data: any): Observable<any> {
    let d = JSON.stringify(data);
    return this.http.post(environment.host + 'product_attribyte', data);
  }

  put(data: any, id: number): Observable<any> {
    let d = JSON.stringify(data);
    return this.http.put(`${environment.host}product_attribyte/${id}`, data);
  }

  delete( id: number): Observable<any> {
    return this.http.delete(`${environment.host}product_attribyte/${id}`);
  }

  deleteProdAttr(item: IProdAttr) {
    this.deleteFromArray(item, this.list)
  }


  protected deleteFromArray(object: Object, array: Array<Object>) {
    const index: number = array.indexOf(object);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
}
