import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PictureAutoService} from "../_services/picture-auto.sevice";
import {AutoPicture} from "../models/autopicture.model";
import {AutoService} from "../_services/auto.service";
import {AutoJoin} from "../models/autojoin.model";
import {CompareAutoService} from "../_services/compare-auto.service";
import {DOCUMENT} from "@angular/common";
import {TokenStorageService} from "../_services/token-storage.service";

@Component({
  selector: 'app-page-auto',
  templateUrl: 'page-auto.component.html',
  styleUrls: ['page-auto.component.css']
})
export class PageAutoComponent implements OnInit {

  dataAuto: AutoJoin = new AutoJoin();
  dataAutoToCompare: AutoJoin = new AutoJoin();
  pictureAuto: AutoPicture = new AutoPicture();
  retrievedImage: any;
  private roles: string[];

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  isModerator: boolean = false;
  isUser: boolean = false;
  isPicture: boolean = true;
  isAddCompare: boolean = false;
  isDelete: boolean = false;
  notNegativeId: boolean = true;

  constructor(
             private tokenStorageService: TokenStorageService,
             private route: ActivatedRoute,
             private router: Router,
             private autoService: AutoService,
             private imageAutoService: PictureAutoService,
             private compareAutoService: CompareAutoService,
             private token: TokenStorageService,
             @Inject(DOCUMENT) private _document: Document
            ) {
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

    this.dataAuto.id = Number(this.route.snapshot.params.id);
    if (this.dataAuto.id > -1) {
      this.getAutoJoinById();
      this.getImage(this.dataAuto.id);

      if (!this.isAddCompare) {
        this.checkIsAddedCompareAuto();
      }

    } else {
      this.router.navigate(['/404']);
    }

    this.compareAutoService.currentIsAddedCompare.subscribe(isAddedCompare => this.isAddCompare = isAddedCompare);
  }

  getAutoJoinById(): void {
    console.log("getAutoJoinById()");
    const idAuto = Number(this.route.snapshot.params.id);
    this.autoService.getAutoById(idAuto)
      .subscribe((data: any) => {
        this.dataAuto = data;
        this.dataAuto.price = String(this.dataAuto.price).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
      });
  }

  getImage(id: any): void {
    this.imageAutoService.getPictureAutoByIdAuto(id)
      .subscribe(
        res => {
          this.pictureAuto = res;
          (this.pictureAuto != null) ? (this.retrievedImage = "data:image/png;base64," + this.pictureAuto.raster) : (this.isPicture = false);
        }
      );
  }

  goBack(): void {
    this.router.navigate(['/auto']);
  }

  compareAuto(idAuto: any) {
    console.log("compareAuto()");
    const params = {"idUser": this.tokenStorageService.getUser().id};
    this.autoService.getAutoById(idAuto)
      .subscribe(
        res => {
          this.dataAutoToCompare = res;
          this.compareAutoService.addAutoToCompare(this.dataAutoToCompare, params)
            .subscribe(
              data => {
                console.log("Auto successfully added to the list compare");
                this.isAddCompare = true;
              },
              error => {
                console.log("error 403: ", error);
              }
            );
          this.compareAutoService.sendMessage(this.isAddCompare);
        })
  }

  checkIsAddedCompareAuto(): void {
    const params = {"idAuto": this.dataAuto.id, "idUser": this.tokenStorageService.getUser().id};
    this.compareAutoService.getCompareAutoByIdAuto(params)
      .subscribe(
        res => {
          if (res != null) {
            this.isAddCompare = true;
          }
        },
        error => {
          this.isAddCompare = false;
          console.log("error 404: ", error);
        });
  }

  goToCompare(): void {
    this.router.navigate(['/compare-auto']);
  }

  deleteAuto(car: AutoJoin): void {
    console.log("deleteAuto()");
    this.autoService.deleteAuto(car)
      .subscribe(
        data => {
        },
        error => {
          console.log("error: ", error);
        });
    console.log("Deleted auto from list");

    this.isDelete = true;
    this.goToListAutoAds();
  }

  goToListAutoAds(): void {
    this.router.navigate(['/auto']);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/update', id]);
  }
}
