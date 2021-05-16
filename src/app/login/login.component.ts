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

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log("this.isVerifyEnabled: ", this.isVerifyEnabled);
    this.isVerifyEnabled = Boolean(String(this.route.snapshot.params.isVerifyEnabled));
    console.log("this.isVerifyEnabled: ", this.isVerifyEnabled);

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      const user = this.tokenStorage.getUser();

      this.username = user.username;
      console.log("user: ", user);
      this.email = user.email;

      if(this.isVerifyEnabled){
        this.isVerify = true;
      }else{
        this.isVerify = false;
      }
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

        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        console.log("ErrorMessage: ", this.errorMessage);
        this.isLoginFailed = true;
      }
    );
  }

  sendVerifyUserEmail(): void{
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
