import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {AutoJoin} from "../models/autojoin.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SearchCarService {

  constructor(private http: HttpClient) {}

  private searchUrl = 'http://localhost:8080/api/search';

  public getSearchAuto(inData: any): Observable<any>{
    return this.http.post(this.searchUrl, inData);
  }
}
