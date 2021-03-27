import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable()
export class ImageAutoService {

  constructor(private http: HttpClient) {}

  private imagehUrl = 'http://localhost:8080/api/imageAuto';

  public getImageAutoByNameImage(nameImage: any): Observable<any>{
    console.log(nameImage);
    return this.http.get(this.imagehUrl + '/' + nameImage);
  }

  public getImageAutoByIdAuto(idAuto: any): Observable<any>{
    console.log(idAuto);
    return this.http.get(this.imagehUrl + '/idAuto/' + idAuto);
  }
}

