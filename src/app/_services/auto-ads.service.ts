import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AutoJoin} from '../models/autojoin.model';
import {Observable} from 'rxjs';

@Injectable()
export class AutoAdsService {

  constructor(private http: HttpClient) {
  }

  private autoUrlAll = 'http://localhost:8080/api/all';

  private autoUrlAdmin = 'http://localhost:8080/api/admin';

  public getAllAutoPage(params): Observable<any> {
    return this.http.get(this.autoUrlAll, {params});
  }

  public getAutoAdsById(id: number): Observable<any> {
    return this.http.get(this.autoUrlAll + '/autoads/join/' + id);
  }

  public deleteAutoAds(car: AutoJoin): Observable<any> {
    return this.http.delete(this.autoUrlAdmin + '/' + car.id);
  }

  public editAutoAds(data: any, idAuto: number, idImage: any): Observable<any> {
    return this.http.put(this.autoUrlAll + '/' + idAuto, data, {params: new HttpParams().set('idImage', idImage)});
  }

  public addAutoAds(auto: any, idImage: any): Observable<any> {
    return this.http.post(this.autoUrlAll + '/add', auto, {params: new HttpParams().set('idImage', idImage)});
  }
}
