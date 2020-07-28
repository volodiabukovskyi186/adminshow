import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IAlbumResponse, IAlbum } from "./folder/interfaces";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

export interface IAlbumBreadcrumb {
  id: number;
  parent_id: number;
  title: string;
}

@Injectable({
  providedIn: "root",
})
export class AlbumService {
  /**
   * Constructor
   * @param http: HttpClient
   */
  constructor(private http: HttpClient) {}

  private currentAlbum: IAlbum;

  activeAlbum: IAlbum = {
    id: null,
    created_at: null,
    parent_id: null,
    title: "📁",
    updated_at: null,
  };

  albums: IAlbumResponse = {
    count: 0,
    data: [],
    skip: 0,
    take: 20,
  };
  newAlbums: IAlbum[] = [];
  takeAlbums: number = 20;

  albumBreadcrumbs: IAlbumBreadcrumb[] = [];

  getAlbums(): Observable<IAlbumResponse> {
    let parent_id = "";
    if (this.activeAlbum?.id) {
      parent_id = "&parent_id=" + this.activeAlbum.id;
    }
    return this.http.get<IAlbumResponse>(
      environment.gallery.images.albums +
        `?skip=0&take=${this.takeAlbums}${parent_id}`
    );
  }

  getAllParent(): Observable<any> {
    let parent_id;
    if (this.activeAlbum?.id) {
      parent_id = this.activeAlbum.id;
    }
    return this.http.get<IAlbumResponse>(
      environment.gallery.images.album + `/getAllParent?album_id=${parent_id}`
    );
  }

  createAlbum(album: IAlbum): Observable<any> {
    let data = JSON.stringify({
      title: album.title,
      parent_id:
        this.activeAlbum && this.activeAlbum.id != null
          ? this.activeAlbum.id.toString()
          : null,
    });
    console.log(data);

    return this.http.post(`${environment.gallery.images.album}`, data);
  }

  newAlbum() {
    let parent_id = null;
    if (this.activeAlbum) {
      parent_id = this.activeAlbum.id;
    }
    this.newAlbums.push({
      id: null,
      created_at: null,
      updated_at: null,
      title: "New album",
      parent_id: parent_id,
    });
  }

  putAlbum(album: IAlbum): Observable<any> {
    let data = JSON.stringify({
      title: album.title,
      parent_id: album.parent_id,
    });
    this.currentAlbum = album;
    return this.http.put(
      `${environment.gallery.images.album}/${album.id}`,
      data
    );
  }
  deleteAlbum(album: IAlbum): Observable<any> {
    this.currentAlbum = album;
    return this.http.delete(`${environment.gallery.images.album}/${album.id}`);
  }

  delteFromList() {
    if (this.currentAlbum != null) {
      this.deleteFromArray(this.currentAlbum, this.albums.data);
      this.currentAlbum = null;
    }
  }
  updateFromList(album: IAlbum) {
    if (this.currentAlbum != null) {
      const index: number = this.albums.data.indexOf(this.currentAlbum);
      if (index !== -1) {
        this.albums.data[index].title = album.title;
        this.albums.data[index].updated_at = album.updated_at;
        this.currentAlbum = null;
      }
    }
  }

  //
  //
  protected deleteFromArray(object: Object, array: Array<Object>) {
    const index: number = array.indexOf(object);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
}
