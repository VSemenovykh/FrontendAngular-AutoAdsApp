import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

const API_URL = 'http://localhost:8080/api/logout';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private http: HttpClient) {
  }

  signOut(params: any):  void {
    console.log("params: ", params);
    this.requestPostOnAddNotActiveToken(params)
      .subscribe((res)=>{
        console.log(res);
      },
        error => {
        console.log(error);
      });
    window.sessionStorage.clear();
  }

  requestPostOnAddNotActiveToken(params): Observable<any> {
    return this.http.post(API_URL, {},{params});
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  public userRoles(role: string): any {
    const user = JSON.parse(window.sessionStorage.getItem(USER_KEY));
    const userRoles = user.roles;
    const typeRole = userRoles.includes(role);

    return typeRole;
  }
}
