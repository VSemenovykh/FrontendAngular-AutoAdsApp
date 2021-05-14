import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class InfoModifyAutoAdsService {

  constructor(private http: HttpClient) {
  }

  private changeHistoryAutoAdsUrlAdmin = 'http://localhost:8080/api/moderator';

  public getAllChangeHistoryAutoAds(params): Observable<any> {
    console.log("params: ", params);
    return this.http.get(this.changeHistoryAutoAdsUrlAdmin + '/change-history-auto-ads', {params});
  }
}
