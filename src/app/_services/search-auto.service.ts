import {Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";


@Injectable()
export class SearchAutoService {

  constructor(private http: HttpClient) {}

  private searchUrl = 'http://localhost:8080/api/auth/search';

  public getSearchAuto(inData: any): Observable<any>{
    return this.http.post(this.searchUrl, inData);
  }
}

