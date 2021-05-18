import {Component, OnInit, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {AutoJoin} from '../models/autojoin.model';
import {AutoAdsService} from '../_services/auto-ads.service';
import {PictureAutoService} from "../_services/picture-auto.sevice";
import {TokenStorageService} from "../_services/token-storage.service";
import {ResponsiveService} from "../_services/responsive.service";

@Component({
  selector: 'app-auto',
  templateUrl: 'autoads.component.html',
  styleUrls: ['autoads.component.css']
})

export class AutoadsComponent implements OnInit {

  cars: Array<AutoJoin>;
  private roles: string[];
  columns: string[];

  currentPage = 1;
  page = 0;
  dataLength: number;
  pageSize = 5;

  isAdmin: boolean = false;
  isModerator: boolean = false;
  isUser: boolean = false;
  isImage: boolean = true;
  isLoggedIn: boolean = false;
  isMobile: boolean;

  constructor(
              private router: Router,
              private autoAdsService: AutoAdsService,
              private tokenStorageService: TokenStorageService,
              private imageAutoService: PictureAutoService,
              private responsiveService: ResponsiveService,
              @Inject(DOCUMENT) private _document: Document
             ){
  }

  ngOnInit(): void {
    this.onResize();
    this.responsiveService.checkWidth();

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.isAdmin = this.roles.includes('ROLE_ADMIN');
      this.isModerator = this.roles.includes('ROLE_MODERATOR');
      this.isUser = this.roles.includes('ROLE_USER');

      this.columns = ['photo', 'brand', 'model', 'year', 'price', 'body style',  'author', 'addingDate'];

      if(this.page != 1){
        this.getIndexPage(this.page, this.pageSize);
      }else{
        this.loadAutoByPage();
      }
    }
  }

  onResize() {
    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  getRequestParams(page, pageSize): any {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (page) {
      params[`page`] = page;// - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  getIndexPage(index: any, sizePage: any): void{
    console.log("getIndexPage()");
    this.pageSize = sizePage;
    this.page = index;
    this.loadAutoByPage();
  }

  /*Load list auto ads from server*/
  private loadAutoByPage(): void {
    console.log("loadAutoByPage()");
    const params = this.getRequestParams(this.page, this.pageSize);
    console.log("params: ", params);
    this.autoAdsService.getAllAutoPage(params)
      .subscribe(
        (response) => {
          const {listAutoJoin, totalAutoJoin, currentPage} = response;
          this.cars = listAutoJoin;
          this.currentPage = currentPage;
          this.dataLength = totalAutoJoin;
        },
        error => {
          console.log("Error: ",error);
        });
  }

  /*Get picture auto by idAuto*/
  getImageAuto(raster: any): string {
    if (this.isImage) {
      return "data:image/png;base64," + raster;
    } else {
      this.isImage = false;
    }
  }

  goToSelectAuto(idAuto: any): void {
    this.router.navigate(['/page-auto-ads', idAuto]);
  }

  /*format price. Ex.: 7 000 000 Р*/
  formatPrice(price: any): any {
    return String(price).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
  }
}
