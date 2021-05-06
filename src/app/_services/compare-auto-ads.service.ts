import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class CompareAutoAdsService {

  private isAddedCompareSource = new BehaviorSubject<boolean>(false);
  currentIsAddedCompare = this.isAddedCompareSource.asObservable();

  constructor(private http: HttpClient) {
  }

  private compareAutoUrlAll = 'http://localhost:8080/api/all';

  public getAllAutoToComparePage(params): Observable<any> {
    return this.http.get(this.compareAutoUrlAll + '/search/list-compare-auto', {params});
  }

  public getCompareAutoByIdAuto(params): Observable<any> {
    return this.http.get(this.compareAutoUrlAll + '/search/compare-auto', {params});
  }

  public addAutoToCompare(compareAuto: any, params): Observable<any> {
    return this.http.post(this.compareAutoUrlAll + '/add-auto-to-compare', compareAuto, {params});
  }

  public deleteCompareAuto(idAuto: any, params): any {
    return this.http.delete(this.compareAutoUrlAll + '/search/list-compare-auto/' + idAuto, {params});
  }

  public clearListCompareAuto(params): any {
    return this.http.delete(this.compareAutoUrlAll + '/search/list-compare-auto/clear', {params});
  }

  public sendMessage(isAddedCompare: boolean) {
    this.isAddedCompareSource.next(isAddedCompare);
  }
}
