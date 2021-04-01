import {Component, OnInit, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {AutoJoin} from '../models/autojoin.model';
import {AutoService} from '../_services/auto.service';
import {PictureAutoService} from "../_services/picture-auto.sevice";
import {TokenStorageService} from "../_services/token-storage.service";

@Component({
  selector: 'app-auto',
  templateUrl: 'auto.component.html',
  styleUrls: ['auto.component.css']
})
export class AutoComponent implements OnInit {

  cars: Array<AutoJoin>;
  private roles: string[];
  isAdmin: boolean = false;
  isModerator: boolean = false;
  isUser: boolean = false;
  isImage: boolean = true;
  isLoggedIn: boolean = false;

  constructor(
              private router: Router,
              private autoService: AutoService,
              private tokenStorageService: TokenStorageService,
              private imageAutoService: PictureAutoService,
              @Inject(DOCUMENT) private _document: Document
             ){

    this.cars = new Array<AutoJoin>();
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.isAdmin = this.roles.includes('ROLE_ADMIN');
      this.isModerator = this.roles.includes('ROLE_MODERATOR');
      this.isUser = this.roles.includes('ROLE_USER');

    }
    this.loadAuto();
  }

  private loadAuto() {
    this.autoService.getAllAuto()
      .subscribe((data: AutoJoin[]) => {
        this.cars = data;
      });
  }

  refreshPage() {
    this._document.defaultView.location.reload();
  }

  getImageAuto(raster: any): string {
    if (this.isImage) {
      return "data:image/png;base64," + raster;
    } else {
      this.isImage = false;
    }
  }

  deleteAuto(car: AutoJoin): void {
    this.autoService.deleteAuto(car)
      .subscribe(data => {
      });
    this.refreshPage();
  }

  goToUpdate(id: number): void {
    this.router.navigate(['/update', id]);
  }

  goToSelectAuto(idAuto: any): void {
    this.router.navigate(['/page-auto', idAuto]);
  }
}
