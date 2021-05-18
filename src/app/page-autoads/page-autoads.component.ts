import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PictureAutoService} from "../_services/picture-auto.sevice";
import {AutoPicture} from "../models/autopicture.model";
import {AutoAdsService} from "../_services/auto-ads.service";
import {AutoJoin} from "../models/autojoin.model";
import {CompareAutoAdsService} from "../_services/compare-auto-ads.service";
import {DOCUMENT} from "@angular/common";
import {TokenStorageService} from "../_services/token-storage.service";
import {InfoModifyAutoAdsService} from "../_services/info-modify-auto-ads.service";
import {ChangeHistoryAutoAdsModel} from "../models/change.history.auto.ads.model";

@Component({
  selector: 'app-page-auto',
  templateUrl: 'page-autoads.component.html',
  styleUrls: ['page-autoads.component.css']
})
export class PageAutoadsComponent implements OnInit {

  dataAuto: AutoJoin = new AutoJoin();
  dataAutoToCompare: AutoJoin = new AutoJoin();
  pictureAuto: AutoPicture = new AutoPicture();
  changeHistoryAutoAds: ChangeHistoryAutoAdsModel = new ChangeHistoryAutoAdsModel();
  retrievedImage: any;
  price: string;
  private roles: string[];

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  isModerator: boolean = false;
  isUser: boolean = false;
  isPicture: boolean = true;
  isAddCompare: boolean = false;
  isDelete: boolean = false;
  isInfoModify: boolean = false;
  notNegativeId: boolean = true;

  constructor(
             private tokenStorageService: TokenStorageService,
             private route: ActivatedRoute,
             private router: Router,
             private autoAdsService: AutoAdsService,
             private imageAutoService: PictureAutoService,
             private compareAutoService: CompareAutoAdsService,
             private token: TokenStorageService,
             private changeHistoryAutoAdsService: InfoModifyAutoAdsService,
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
      this.getAutoAdsById();
      this.getImage(this.dataAuto.id);
      this.getInfoModifyAutoAdsByIdAuto(this.dataAuto.id);

      if (!this.isAddCompare) {
        this.checkIsAddedCompareAutoAds();
      }

    } else {
      this.router.navigate(['/404']);
    }

    this.compareAutoService.currentIsAddedCompare.subscribe(isAddedCompare => this.isAddCompare = isAddedCompare);
  }

  /*Get auto ads by id*/
  getAutoAdsById(): void {
    console.log("getAutoAdsById()");
    const idAuto = Number(this.route.snapshot.params.id);
    this.autoAdsService.getAutoAdsById(idAuto)
      .subscribe((data: any) => {
        this.dataAuto = data;
        this.price = String(this.dataAuto.price).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
      });
  }

  /*Get picture auto by idAuto*/
  getImage(id: any): void {
    this.imageAutoService.getImageAutoByIdAuto(id)
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

  /*Add select auto ads to list compare auto ads*/
  addAutoAdsToListCompare(idAuto: any) {
    console.log("addAutoAdsToListCompare()");
    const params = {"idUser": this.tokenStorageService.getUser().id};
    this.autoAdsService.getAutoAdsById(idAuto)
      .subscribe(
        res => {
          this.dataAutoToCompare = res;
          console.log("this.dataAutoToCompare: ", this.dataAutoToCompare);
          this.compareAutoService.addAutoAdsToListCompare(this.dataAutoToCompare, params)
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

  /*Check exist added auto ads */
  checkIsAddedCompareAutoAds(): void {
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
    this.router.navigate(['/compare-auto-ads']);
  }

  /*Delete auto ads from list auto ads*/
  deleteAutoAds(car: AutoJoin): void {
    console.log("deleteAutoAds()");
    this.autoAdsService.deleteAutoAds(car)
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

  /*Get modify date auto ads*/
  getInfoModifyAutoAdsByIdAuto(idAuto: number): void{
    const params = {"idAuto": idAuto};
    console.log("getAllChangeHistoryAutoAdsByIdAuto()");
    console.log("params: ", params);
    this.changeHistoryAutoAdsService.getAllChangeHistoryAutoAds(params).subscribe(
      (response) => {
        if(response != null){
          this.changeHistoryAutoAds = response;
          this.isInfoModify = true;
        }else{
          this.isInfoModify = false;
        }
      },
      error => {
        console.log("Error: ",error);
      });
  }

  goToListAutoAds(): void {
    this.router.navigate(['/auto-ads']);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  goToListChangeHistoryAutoAds(idAuto: number): void{
    this.router.navigate(['/change-history-auto-ads', idAuto]);
  }
}
