import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  isVerifyEnabled = false;
  isVerify = false;
  errorMessage = '';
  roles: string[] = [];
  username: string;
  email: string;
  message: string;
  isLogin: boolean = true;

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log("this.isVerifyEnabled: ", this.isVerifyEnabled);
    this.isVerifyEnabled = (String(this.route.snapshot.queryParams['verifyEnabled'])) == 'true';
    this.username = String(this.route.snapshot.queryParams['username']);

    console.log("isVerifyEnabled: ", this.isVerifyEnabled);
    if (this.isVerifyEnabled) {
      this.isVerify = true;
      this.form['username'] = this.username;

      if (this.tokenStorage.getToken()) {
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        const user = this.tokenStorage.getUser();

        this.email = user.email;
      }

      if(this.isLoggedIn){
        this.isVerifyEnabled = false;
      }

    } else {
      this.isVerify = false;
    }
  }

  onSubmit(): void {
    console.log("onSubmit()");
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;

        if(this.isLoggedIn){
          console.log("to /Home");
          this.authService.sendMessage(this.isLogin);
          this.goToHome();
        }
      },
      err => {
        this.errorMessage = err.error.message;
        console.log("ErrorMessage: ", this.errorMessage);
        this.isLoginFailed = true;
      }
    );
  }

  sendVerifyUserEmail(): void {
    this.isVerify = false;
    console.log("this.username: ", this.username);
    this.authService.requestSendVerifyUserEmail(this.email)
      .subscribe(
        message => {
          this.message = message;
          console.log("this.message: ", this.message);
        }
      );
  }

  reloadPage(): void {
    window.location.reload();
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }
}
