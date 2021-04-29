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

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log("onSubmit()");
    this.authService.register(this.form)
      .subscribe(
        data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          if(data == null){
            this.isSuccessful = false;
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
}
