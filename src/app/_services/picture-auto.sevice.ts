import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable()
export class PictureAutoService {

  constructor(private http: HttpClient) {
  }

  private pictureUrlAll = 'http://localhost:8080/api/all';

  public getImageAutoByIdAuto(idAuto: any): Observable<any> {
    return this.http.get(this.pictureUrlAll + '/pictureAuto/idAuto/' + idAuto);
  }

  public addImageAuto(pictureAuto: any): any {
    return this.http.post(this.pictureUrlAll + '/pictureAuto', pictureAuto);
  }

  public editImageAuto(pictureAuto: any, idImage: any): any {
    return (pictureAuto != null) ? (this.http.put(this.pictureUrlAll + '/pictureAuto/update/' + idImage, pictureAuto)) : this.http.put(this.pictureUrlAll + '/update/' + idImage, null);
  }
}

