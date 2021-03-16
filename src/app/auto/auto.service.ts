import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AutoJoin } from '../models/autojoin.model';
import { Auto } from '../models/auto.model';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AutoService {

  constructor(private http: HttpClient) {}

  private autoUrl = 'http://localhost:8080/app';
  private autoUrl = 'http://localhost:8080/auto-all';

  public getAllAuto(): Observable<any> {
    return this.http.get(this.autoUrl);
  }

  public getAutoById(id: number): Observable<any> {
    return this.http.get(this.autoUrl + '/' + id);
  }

  public deleteAuto(car: AutoJoin): Observable<any> {
    return this.http.delete(this.autoUrl + '/' + car.id);
  }

  public updateAuto(id: number, data: Auto): Observable<any> {
    return this.http.put(this.autoUrl + '/' + id, data);
  }

  public createAuto(auto: Auto): Observable<any>{
    return this.http.post(this.autoUrl + '/add', auto);
  }
}
