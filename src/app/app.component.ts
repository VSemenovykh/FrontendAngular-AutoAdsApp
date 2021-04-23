import {Component, Inject, OnInit} from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import {CompareAutoService} from "./_services/compare-auto.service";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent implements OnInit{
  private roles: string[];
  username: string;

  isLoggedIn: boolean = false;
  isAdmin: boolean =  false;
  isModerator: boolean = false;
  isUser: boolean = false;
  isListCompareAuto : boolean = false;

  constructor(private tokenStorageService: TokenStorageService,
              private compare: CompareAutoService,
              private compareAutoService: CompareAutoService,
              @Inject(DOCUMENT) private _document: Document) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

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

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  checkIsListCompareAuto(): void {
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

  refreshPage(): void {
    this._document.defaultView.location.reload();
  }
}
