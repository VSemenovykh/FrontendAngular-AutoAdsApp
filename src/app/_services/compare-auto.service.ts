import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { AutoJoin } from '../models/autojoin.model';
import {Observable} from 'rxjs';

@Injectable()
export class CompareAutoService {

  constructor(private http: HttpClient) {}

  private compareAutoUrl = 'http://localhost:8080/api/auth';

  public getAllAutoToComparePage(params): Observable<any> {
    console.log("getAllAutoToComparePage -> params: ", params);
    return this.http.get(this.compareAutoUrl + '/search/compare-auto',{params});
  }

  public addAutoToCompare(compareAuto: any):  Observable<any>{
    console.log("compareAuto: ", compareAuto);
     return this.http.post(this.compareAutoUrl + '/add-compare-auto', compareAuto);
  }

  public deleteCompareAuto(idAuto: any): any{
    console.log("id auto: ", idAuto);
    return this.http.delete(this.compareAutoUrl + '/search/compare-auto/'+ idAuto);
  }

  public clearListCompareAuto(): any{
    console.log("clear");
    return this.http.delete(this.compareAutoUrl + '/search/compare-auto/clear');
  }
}
