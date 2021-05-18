import {Component, Inject, OnInit} from "@angular/core";
import {FormBuilder, FormControl} from "@angular/forms";
import {AutoJoin} from "../models/autojoin.model";
import {SearchAutoAdsService} from '../_services/search-auto-ads.service';
import {TokenStorageService} from "../_services/token-storage.service";
import {Router} from "@angular/router";
import {DOCUMENT} from "@angular/common";
import {groupBy, GroupResult} from '@progress/kendo-data-query';
import {AutoAdsService} from "../_services/auto-ads.service";
import * as _ from 'lodash';
import {BrandModel} from "../models/brand.model";
import {MotorModel} from "../models/motor.model";

@Component({
  selector: 'app-multiple-search-auto',
  templateUrl: 'search-autoads.component.html',
  styleUrls: ['search-autoads.component.css']
})
export class SearchAutoadsComponent implements OnInit {

  nameBrandList: Array<string> = [];
  modelList: Array<any> = [];
  groupedModel: GroupResult[] = groupBy(this.modelList, [{field: 'subcategory'}]);
  colorList = [];
  driveList = [];
  transmissionList = [];
  bodyStyleList = [];
  motorTypeList = [];
  startYears = [];
  endYears = [];
  startVolumes = [];
  endVolumes = [];

  dataSearchAutoAds = {
    "id": null,
    "raster": null,
    "nameBrand": null,
    "nameModel": null,
    "startYear": null,
    "endYear": null,
    "color": null,
    "startPrice": null,
    "endPrice": null,
    "motorType": null,
    "startVolume": null,
    "endVolume": null,
    "driveType": null,
    "transmissionType": null,
    "bodyStyleType": null
  };

  auto: Array<AutoJoin>;
  brandList: Array<BrandModel>;
  motorList: Array<MotorModel>;
  autoList: Array<AutoJoin>;
  private roles: string[];
  brands: [] = null;
  colors: [] = null;
  startPrice: number = null;
  endPrice: number = null;
  motors: [] = null;
  drives: [] = null;
  transmissions: [] = null;
  bodyStyles: [] = null;

  currentAutoAds: any;
  currentIndex = -1;
  currentPage = 1;
  page = 1;
  count = 0;
  pageSize = 5;

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  isModerator: boolean = false;
  isUser: boolean = false;
  isImage: boolean = true;
  isResponse: boolean = true;

  constructor(private searchCarService: SearchAutoAdsService,
              private tokenStorageService: TokenStorageService,
              private autoAdsService: AutoAdsService,
              public fb: FormBuilder,
              private router: Router,
              @Inject(DOCUMENT) private _document: Document) {
  }

  searchForm = this.fb.group({
    startYear: 'all',
    endYear: 'all',
    startVolume: 'all',
    endVolume: 'all',
    model: null
  })

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.isAdmin = this.roles.includes('ROLE_ADMIN');
      this.isModerator = this.roles.includes('ROLE_MODERATOR');
      this.isUser = this.roles.includes('ROLE_USER');

      this.getAllListBrand();
      this.getAllListMotor();
      this.getAllListAuto();
    }
  }

  onSubmit() {
    console.log("onSubmit()");
    this.formSelectCriteriaAuto();

    if (this.page != 1) {
      this.handlePageChange(this.currentPage);

    } else {
      /*default */
      this.findAutoAdsByDiffCriteria(this.dataSearchAutoAds);
    }
  }

  /*Display form select criteria auto*/
  formSelectCriteriaAuto(): void {
    this.dataSearchAutoAds['nameBrand'] = this.brands;

    const selectedModels = this.searchForm.controls["model"].value;
    if (selectedModels != null) {
      this.dataSearchAutoAds['nameModel'] = selectedModels.map(model => model.name);
    }

    this.dataSearchAutoAds['startYear'] = this.startYears;
    this.dataSearchAutoAds['endYear'] = this.endYears;
    this.dataSearchAutoAds['color'] = this.colors;
    this.dataSearchAutoAds['startPrice'] = this.startPrice;
    this.dataSearchAutoAds['endPrice'] = this.endPrice;
    this.dataSearchAutoAds['motorType'] = this.motors;
    this.dataSearchAutoAds['startVolume'] = this.startVolumes;
    this.dataSearchAutoAds['endVolume'] = this.endVolumes;
    this.dataSearchAutoAds['driveType'] = this.drives;
    this.dataSearchAutoAds['transmissionType'] = this.transmissions;
    this.dataSearchAutoAds['bodyStyleType'] = this.bodyStyles;

    this.dataSearchAutoAds['startYear'] = this.searchForm.controls["startYear"].value;
    if (this.dataSearchAutoAds['startYear'] == "all") {
      this.dataSearchAutoAds['startYear'] = null;
    }

    this.dataSearchAutoAds['endYear'] = this.searchForm.controls["endYear"].value;
    if (this.dataSearchAutoAds['endYear'] == "all") {
      this.dataSearchAutoAds['endYear'] = null;
    }

    this.dataSearchAutoAds['startVolume'] = this.searchForm.controls["startVolume"].value;
    if (this.dataSearchAutoAds['startVolume'] == "all") {
      this.dataSearchAutoAds['startVolume'] = null;
    }

    this.dataSearchAutoAds['endVolume'] = this.searchForm.controls["endVolume"].value;
    if (this.dataSearchAutoAds['endVolume'] == "all") {
      this.dataSearchAutoAds['endVolume'] = null;
    }
  }

  getRequestParams(page, pageSize): any {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  handlePageChange(event): void {
    this.page = event;
    this.findAutoAdsByDiffCriteria(this.dataSearchAutoAds);
  }

  setActiveTutorial(tutorial, index): void {
    this.currentAutoAds = tutorial;
    this.currentIndex = index;
  }

  /*Search auto ads by difference criteria auto */
  findAutoAdsByDiffCriteria(data: any): void {
    console.log("findAutoAdsByDiffCriteria()");
    const params = this.getRequestParams(this.page, this.pageSize);
    if (data != null) {
      this.searchCarService.searchAutoPage(data, params)
        .subscribe(
          (response) => {
            if (response != null) {
              const {listAutoAds, totalAutoAds, currentPage} = response;
              this.auto = listAutoAds;
              this.count = totalAutoAds;
              this.currentPage = currentPage;

              this.isResponse = true;
            } else {
              this.isResponse = false;
              this.count = 0;
            }

          },
          error => {
            console.log(error);
          });
    }
  }

  /*Get picture auto by idAuto*/
  getImageAuto(raster: any): string {
    if (this.isImage) {
      return "data:image/png;base64," + raster;
    } else {
      this.isImage = false;
    }
  }

  /*Get list brand*/
  getAllListBrand(): void {
    this.autoAdsService.getAllBrand()
      .subscribe(
        (res) => {
          this.brandList = res;
          this.nameBrandList = this.transform(res, "nameBrand").map(name => name.nameBrand).sort((a, b) => a - b);

          this.startYears = this.transform(res, "year").map(name => name.year)
          this.endYears = this.transform(res, "year").map(name => name.year)

          const brands = this.nameBrandList;
          const brandsFromModels = this.transform(res, "nameModel").map(name => name.nameBrand);
          const models = this.transform(res, "nameModel").map(name => name.nameModel);

          console.log("modelList initial length", this.modelList.length);
          for (let i = 0; i < brands.length; i++) {
            for (let j = 0; j < brandsFromModels.length; j++) {
              if (brands[i] == brandsFromModels[j]) {
                this.modelList.push({name: models[j], category: 'Model', subcategory: brands[i]});
              }
            }
          }

          this.groupedModel = groupBy(this.modelList, [{field: 'subcategory'}]);
          console.log("Out from cycle  this.modelGroups", this.groupedModel);
        });
  }

  /*Get list model*/
  getAllListMotor(): void {
    this.autoAdsService.getAllMotor()
      .subscribe(
        (res) => {
          this.motorList = res;
          this.motorTypeList = this.transform(res, "motorType").map(name => name.motorType);
          this.startVolumes = this.transformForNumberValues(res, "volume").map(name => name.volume).sort();
          this.endVolumes = this.transformForNumberValues(res, "volume").map(name => name.volume).sort();
        });
  }

  /*Get list auto*/
  getAllListAuto(): void {
    this.autoAdsService.getAllAuto()
      .subscribe(
        (res) => {
          this.autoList = res;
          this.colorList = this.transform(res, "color").map(name => name.color)
          this.driveList = this.transform(res, "driveType").map(name => name.driveType)
          this.transmissionList = this.transform(res, "transmissionType").map(name => name.transmissionType)
          this.bodyStyleList = this.transform(res, "bodyStyleType").map(name => name.bodyStyleType)
        });
  }

  /*Get unique values from array string values*/
  transform(value: any[], nameColum: string): any {
    if (value !== undefined && value !== null) {
      value.sort((a, b) => a[nameColum].toLowerCase() !== b[nameColum].toLowerCase() ? a[nameColum].toLowerCase() < b[nameColum].toLowerCase() ? -1 : 1 : 0);
      return _.uniqBy(value, nameColum);

    }
    return value;
  }

  /*Get unique values from array number values*/
  transformForNumberValues(value: any[], nameColum: string): any {
    if (value !== undefined && value !== null) {
      return _.uniqBy(value, nameColum);

    }
    return value;
  }

  goToPageAutoAds(idAuto: any): void {
    this.router.navigate(['/page-auto-ads', idAuto]);
  }

  reset(): void {
    this._document.defaultView.location.reload();
  }

  /*Format price. Ex: 7 000 000 Р*/
  formatPrice(price: any): any {
    return String(price).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
  }
}
