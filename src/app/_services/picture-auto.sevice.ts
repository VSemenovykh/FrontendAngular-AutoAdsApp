import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable()
export class PictureAutoService {

  constructor(private http: HttpClient) {}

  private pictureUrl = 'http://localhost:8080/api/auth';

  public getPictureAutoByNamePicture(namePicture: any): Observable<any>{
    return this.http.get(this.pictureUrl + '/pictureAuto/' + namePicture);
  }

  public getPictureAutoByIdAuto(idAuto: any): Observable<any>{
    return this.http.get(this.pictureUrl + '/pictureAuto/idAuto/' + idAuto);
  }

  public createPictureAuto(pictureAuto: any): any{
    return this.http.post(this.pictureUrl + '/pictureAuto', pictureAuto);
  }

  public updatePictureAuto(pictureAuto: any, idImage: any): any{
    return (pictureAuto != null )?(this.http.put(this.pictureUrl + '/pictureAuto/update/' + idImage, pictureAuto)):this.http.put(this.pictureUrl + '/update/' + idImage, null);
  }
}

//admin
