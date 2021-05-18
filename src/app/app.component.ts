import {Component, Inject, OnInit} from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import {CompareAutoAdsService} from "./_services/compare-auto-ads.service";
import {ResponsiveService} from './_services/responsive.service'
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent implements OnInit{
  private roles: string[];
  username: string;
  token: string;

  isLoggedIn: boolean = false;
  isAdmin: boolean =  false;
  isModerator: boolean = false;
  isUser: boolean = false;
  isListCompareAuto : boolean = false;

  constructor(private tokenStorageService: TokenStorageService,
              private compare: CompareAutoAdsService,
              private compareAutoService: CompareAutoAdsService,
              private responsiveService: ResponsiveService,
              @Inject(DOCUMENT) private _document: Document) { }

  ngOnInit(): void {
    this.responsiveService.getMobileStatus().subscribe( isMobile =>{
      if(isMobile){
        console.log('Mobile device detected')
      }
      else{
        console.log('Desktop detected')
      }
    });
    this.onResize();

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.token = this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.isAdmin = this.roles.includes('ROLE_ADMIN');
      this.isModerator = this.roles.includes('ROLE_MODERATOR');
      this.isUser = this.roles.includes('ROLE_USER');

      this.username = user.username;

      this.checkIsListCompareAuto();
    }

    this.compareAutoService.currentIsAddedCompare.subscribe(isListCompareAuto => this.isListCompareAuto = isListCompareAuto);

    if (this.isListCompareAuto) {
      this.refreshPage();
    }
  }

  onResize(){
    this.responsiveService.checkWidth();
  }

  logout(): void {
    const params = {"token": this.token};
    this.tokenStorageService.signOut(params);
    this.refreshPage();
  }

  checkIsListCompareAuto(): void {
    console.log("checkIsListCompareAuto():");
    if(this.tokenStorageService.getUser() != null){
      const params = {"page": 0, "size": 1, "idUser": this.tokenStorageService.getUser().id};
      this.compare.getAllAutoToComparePage(params)
        .subscribe(
          (response) => {
            if (response != null) {
              this.isListCompareAuto = true;
            } else {
              this.isListCompareAuto = false;
            }
          },
          error => {
            console.log(error);
          });
    }
  }

  refreshPage(): void {
    this._document.defaultView.location.reload();
  }
}
