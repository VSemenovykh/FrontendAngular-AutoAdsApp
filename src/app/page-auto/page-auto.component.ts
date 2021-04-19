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

  dataAuto = {"id": null,
          "idPicture": null,
          "raster": null,
          "email": null,
          "phone": null,
          "nameBrand": null,
          "nameModel": null,
          "year": null,
          "color": null,
          "price": null,
          "motorType": null,
          "volume": null,
          "driveType": null,
          "transmissionType": null,
          "bodyStyleType": null};

  neweAuto: AutoJoin = new AutoJoin();
  pictureAuto: AutoPicture = new AutoPicture();
  retrievedImage: any;
  private roles: string[];

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  isModerator: boolean = false;
  isUser: boolean = false;
  isPicture: boolean = true;
  isAddCompare: boolean = false;
  notNegativeId: boolean = true;

  constructor(
             private tokenStorageService: TokenStorageService,
             private route: ActivatedRoute,
             private router: Router,
             private autoService: AutoService,
             private imageAutoService: PictureAutoService,
             private compareAutoService: CompareAutoService,
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
      this.getImage(this.dataAuto.id);
      this.getAutoJoinById();

    } else {
      this.notNegativeId = false;
    }

    this.compareAutoService.currentIsAddedCompare.subscribe(isAddedCompare => this.isAddCompare = isAddedCompare);
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

  getAutoJoinById(): void {
    console.log("getAutoJoinById()");
    const idAuto = Number(this.route.snapshot.params.id);
    this.autoService.getAutoById(idAuto)
      .subscribe((data: any) => {
        this.dataAuto = data;
        console.log("Result: ", data);
        this.dataAuto.price = String(this.dataAuto.price).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
      });
  }

  goBack(): void {
    this.router.navigate(['/auto']);
  }

  compareAuto(idAuto: any) {
    console.log("compareAuto()");
    this.autoService.getAutoById(idAuto)
      .subscribe(
        res => {
          this.neweAuto = res;
          console.log("Result: ", res);
          this.compareAutoService.addAutoToCompare(this.neweAuto)
            .subscribe(
              data => {
              })
          console.log("Auto successfully added to the list compare");
          this.isAddCompare = true;
        });
    this.compareAutoService.sendMessage(this.isAddCompare);
  }

  goToCompare(): void {
    this.router.navigate(['/compare-auto']);
  }
}
