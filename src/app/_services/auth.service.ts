import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';
const SEND_VERIFY_USER_EMAIL = 'http://localhost:8080/api/send-verify-user-email';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLogin= new BehaviorSubject<boolean>(false);
  currentIsLogIn = this.isLogin.asObservable();

  constructor(private http: HttpClient) {
  }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user: any, stringCode: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password,
      verificationCode: stringCode,
      verifyEnabled: false
    }, httpOptions);
  }

  requestSendVerifyUserEmail(email: string): any{
    const params = {"email": email};
    console.log("params: ", params);
    return this.http.get(SEND_VERIFY_USER_EMAIL, {params});
  }

  public sendMessage(isLogin: boolean) {
    this.isLogin.next(isLogin);
  }

}
