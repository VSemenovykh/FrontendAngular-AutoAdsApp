import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { AutoJoin } from '../models/autojoin.model';
import {Observable} from 'rxjs';

@Injectable()
export class AutoService {

  constructor(private http: HttpClient) {}

  private autoUrl = 'http://localhost:8080/api';

  public getAllAuto(): Observable<any> {
    return this.http.get(this.autoUrl);
  }

  public getAutoById(id: number): Observable<any> {
    return this.http.get(this.autoUrl + '/' + id);
  }

  public getAutoJoinById(id: number): Observable<any> {
    return this.http.get(this.autoUrl + '/join/' + id);
  }

  public deleteAuto(car: AutoJoin): Observable<any> {
    return this.http.delete(this.autoUrl + '/' + car.id);
  }

  public updateAuto(data: any, idAuto: number, idImage: any): Observable<any> {
    return this.http.put(this.autoUrl + '/' + idAuto, data, {params: new HttpParams().set('idImage', idImage)});
  }

  public createAuto(auto: any, idImage: any): Observable<any>{
    return this.http.post(this.autoUrl + '/add', auto, {params: new HttpParams().set('idImage', idImage)});
  }
}
