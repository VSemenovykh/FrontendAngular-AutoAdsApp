import {Component, OnInit} from "@angular/core";
import {AuthService} from "../_services/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-not-verify',
  templateUrl: 'not-verify.component.html',
  styleUrls: ['not-verify.component.css']
})
export class NotVerifyComponent implements OnInit {

  message: string;

  constructor(private authService: AuthService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  reVerifacationEmail(): any{
    const email = String(this.route.snapshot.queryParams["email"]);
    console.log("email: ", email);
    if(email != 'undefined'){
      this.authService.requestSendVerifyUserEmail(email).subscribe(
        message => {
          this.message = message;
          console.log("this.message: ", this.message);
        }
      );
    }else{
      console.log("Error: email not define");
    }
  }
}
