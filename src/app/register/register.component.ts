import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  message: string;
  stringCode: string;
  isVerify: boolean;
  existUser: boolean;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log("onSubmit()");
    this.stringCode = this.getRandomString(64);
    this.authService.register(this.form, this.stringCode)
      .subscribe(
        (res) => {
          const {existUser, message} = res;
          this.existUser = existUser;

          if (this.existUser != false) {
            this.isSuccessful = true;
            this.isSignUpFailed = false;
            this.isVerify = true;

          } else {
            this.isSuccessful = false;
            this.isSignUpFailed = true;
            this.isVerify = false;
          }
        },
        err => {
          this.isSuccessful = false;
          this.isSignUpFailed = true;
          this.errorMessage = err.error.message;
          console.log("errorMessage: ", this.errorMessage);
        }
      );
  }

  /*Send request verification email*/
  sendVerifyUserEmail(): void {
    this.isVerify = false;
    this.authService.requestSendVerifyUserEmail(this.form['email'])
      .subscribe(
        message => {
          this.message = message;
          console.log("this.message: ", this.message);
        }
      );
  }

  /*Generation string code for verification email*/
  getRandomString(length: number): any {
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * length));
    }
    return result;
  }
}
