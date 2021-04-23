import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable()
export class PictureAutoService {

  constructor(private http: HttpClient) {
  }

  private pictureUrlAll = 'http://localhost:8080/api/all';

  public getPictureAutoByIdAuto(idAuto: any): Observable<any> {
    return this.http.get(this.pictureUrlAll + '/pictureAuto/idAuto/' + idAuto);
  }

  public createPictureAuto(pictureAuto: any): any {
    return this.http.post(this.pictureUrlAll + '/pictureAuto', pictureAuto);
  }

  public editPictureAuto(pictureAuto: any, idImage: any): any {
    return (pictureAuto != null) ? (this.http.put(this.pictureUrlAll + '/pictureAuto/update/' + idImage, pictureAuto)) : this.http.put(this.pictureUrlAll + '/update/' + idImage, null);
  }
}

