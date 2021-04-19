import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class CompareAutoService {

  private isAddedCompareSource = new BehaviorSubject<boolean>(false);
  currentIsAddedCompare = this.isAddedCompareSource.asObservable();

  constructor(private http: HttpClient) {}

  private compareAutoUrl = 'http://localhost:8080/api/auth';

  public getAllAutoToComparePage(params): Observable<any> {
    return this.http.get(this.compareAutoUrl + '/search/list-compare-auto',{params});
  }

  public addAutoToCompare(compareAuto: any):  Observable<any>{
     return this.http.post(this.compareAutoUrl + '/add-auto-to-compare', compareAuto);
  }

  public deleteCompareAuto(idAuto: any): any{
    return this.http.delete(this.compareAutoUrl + '/search/list-compare-auto/'+ idAuto);
  }

  public clearListCompareAuto(): any{
    return this.http.delete(this.compareAutoUrl + '/search/list-compare-auto/clear');
  }

  public sendMessage(isAddedCompare: boolean) {
    this.isAddedCompareSource.next(isAddedCompare);
  }
}
