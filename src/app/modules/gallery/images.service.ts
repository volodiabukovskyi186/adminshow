import { Injectable, EventEmitter } from "@angular/core";
import {
  HttpClient,
  HttpRequest,
  HttpEvent,
  HttpEventType,
} from "@angular/common/http";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { IImageResponse, IImage } from "./folder/interfaces";
import { UserService } from 'src/app/modules/user/user.service';

export interface IUploadImage {
  file: File;
  url: string | ArrayBuffer;
  isUpload: boolean;
  isStart: boolean;
  isError: boolean;
  percentDone: number;
}

@Injectable({
  providedIn: "root",
})
export class ImagesService {
  page: number = 1;
  images: IImageResponse = {
    count: 0,
    data: [],
    skip: 0,
    take: 20,
  };

  takeImages: number = 50;

  uploadImage: IUploadImage = {
    file: null,
    isUpload: false,
    percentDone: 0,
    isStart: false,
    isError: false,
    url: null,
  };

  public currentAlbumId: number;

  constructor(
    private http: HttpClient,
    public userService: UserService
  ) {
    this.getUserByToken();
    
  }

  public getUserByToken(): void {
    this.userService.getByToken().subscribe((res) => {
      console.log(res);

      this.currentAlbumId = res.data.user.album_id;
    });
  }

  getImages(albumId: number): Observable<IImageResponse> {
    //let skip = this.page * this.images.take - this.images.take;
    let params = `?take=${this.images.take}&skip=${this.images.skip}`;

    return this.http.get<IImageResponse>(
      environment.gallery.images.images +
        `${params}&album_id=${albumId}`
    );
  }

  getManagerImages(albumId: number): Observable<any> {
    //let skip = this.page * this.images.take - this.images.take;
    let params = `?take=${this.images.take}&skip=${this.images.skip}`;

    return this.http.get(`${environment.host}manager/images${params}&album=${albumId}`);
  }

  upload(image: any, albumId: number = null): Observable<any> {
    this.getUserByToken();

    const formData: FormData = new FormData();
    formData.append("images", image, image.name);
    // formData.append("album_id", albumId != null ? albumId.toString() : "");
    // debugger;
    formData.append("album_id", albumId?.toString() || "");

    const req = new HttpRequest(
      "POST",
      environment.gallery.images.image,
      formData,
      {
        reportProgress: true,
      }
    );

    return this.http.request(req);
  }

  //
  // Upload
  //

  uploadImages: Array<IUploadImage> = [];
  uploaded: EventEmitter<any> = new EventEmitter<any>();
  uploadedError: EventEmitter<any> = new EventEmitter<any>();
  uploadedErrorCount: number = 0;
  uploading: boolean = false;
  uploadIndex: number = 0;
  select: EventEmitter<any> = new EventEmitter<any>();
  currentImage: IImage = null;
  selectedImg: boolean = false;
  
  private selectedImgStatusStream$: Subject<any> = new Subject();
  //private isAngularKolkovEditorStream$: Subject<any> = new Subject();

  private isAngularKolkovEditorStream$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public updatedAngularEditorStream$(isKolkovdEditor) {
    console.log(isKolkovdEditor);
    //debugger
    this.isAngularKolkovEditorStream$.next(isKolkovdEditor);
  }

  public getKolkovEditorStatus$() {
    return this.isAngularKolkovEditorStream$;
  }

  public updatedSelectedImg$(image) {
    //this.selectedImg = true;
    this.selectedImgStatusStream$.next(image);
  }

  public getSelectedImg$() {
    return this.selectedImgStatusStream$;
  }

  addImagesToUpload(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const f: File = files[i];

      let reader = new FileReader();
      reader.readAsDataURL(f);
      reader.onload = (event) => {
        // called once readAsDataURL is completed
        this.uploadImages.push({
          file: f,
          isUpload: false,
          isStart: false,
          isError: false,
          percentDone: 0,
          url: event.target.result,
        });
      };
    }
  }

  addImageToList(image: IImage) {
    this.images.data.push(image);
  }

  public getEventMessage(event: HttpEvent<any>, uploadImage: IUploadImage) {
    switch (event.type) {
      case HttpEventType.Sent:
        uploadImage.isStart = true;

      case HttpEventType.UploadProgress:
        const percentDone = Math.round(
          (100 * event["loaded"]) / event["total"]
        );
        uploadImage.percentDone = percentDone;

      case HttpEventType.Response: {
        if (event["body"]) {
          console.log("addImageToList : ", event["body"]);

          uploadImage.isUpload = true;
          // delete from upload list
          this.deleteImageFromUploadList(uploadImage);
          // and add to images
          this.addImageToList(event["body"]?.data);

          // on opload
          this.uploaded.emit();
        }
      }

      default:
        if (event["error"]) {
          console.log("default-----> ", event["error"]);
          uploadImage.percentDone = 0;
          uploadImage.isStart = false;
          uploadImage.isError = true;
          this.uploadedError.emit();
        }
    }
  }

  deleteImage(image: IImage): Observable<any> {
    this.currentImage = image;
    return this.http.delete(`${environment.gallery.images.image}/${image.id}`);
  }

  deleteImageFromList() {
    if (this.currentImage != null) {
      this.deleteFromArray(this.currentImage, this.images.data);
      this.currentImage = null;
    }
  }

  deleteImageFromUploadList(img) {
    this.deleteFromArray(img, this.uploadImages);
  }

  //
  // selectable
  //

  resetSelected(image) {
    if (this.images.data)
      this.images.data.forEach((img) => {
        if (img.selected && img.id != image.id) img.selected = false;
      });
  }

  getSelected(): Array<IImage> {
    let list: Array<IImage> = [];

    if (this.images.data)
      this.images.data.forEach((img) => {
        if (img.selected) list.push(img);
      });
    
    console.log(list);

    return list;
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
