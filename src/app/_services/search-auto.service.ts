import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable()
export class SearchAutoService {

  constructor(private http: HttpClient) {
  }

  private searchUrlAll = 'http://localhost:8080/api/all';

  public searchAutoPage(data: any, params: any): Observable<any> {
    return this.http.post(this.searchUrlAll + '/search/page', data, {params});
  }
}

