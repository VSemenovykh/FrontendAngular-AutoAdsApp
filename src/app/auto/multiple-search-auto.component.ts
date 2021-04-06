import {AfterViewInit, Component, Inject, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, FormControl} from "@angular/forms";
import {AutoJoin} from "../models/autojoin.model";
import { SearchAutoService } from '../_services/search-auto.service';
import {TokenStorageService} from "../_services/token-storage.service";
import {Router} from "@angular/router";
import {DOCUMENT} from "@angular/common";
import { GroupResult, groupBy } from '@progress/kendo-data-query';

@Component({
  selector: 'app-multiple-search-auto',
  templateUrl: 'multiple-search-auto.component.html',
  styleUrls: ['multiple-search-auto.component.css']
})
export class MultipleSearchAutoComponent implements OnInit{
  @ViewChild('list') list;

  // tslint:disable-next-line:max-line-length
  brandList: Array<string> = ['BMW', 'Mercedes-Benz'];

  modelList: Array<any> = [
    { name: 'I8', category: 'Model', subcategory: 'BMW' },
    { name: 'M3', category: 'Model', subcategory: 'BMW' },
    { name: 'M5', category: 'Model', subcategory: 'BMW' },
    { name: 'M6', category: 'Model', subcategory: 'BMW' },
    { name: 'M8', category: 'Model', subcategory: 'BMW' },
    { name: 'X1', category: 'Model', subcategory: 'BMW' },
    { name: 'X2', category: 'Model', subcategory: 'BMW' },
    { name: 'X3', category: 'Model', subcategory: 'BMW' },
    { name: 'X4', category: 'Model', subcategory: 'BMW' },
    { name: 'X5', category: 'Model', subcategory: 'BMW' },
    { name: 'GLE AMG', category: 'Model', subcategory: 'Mercedes-Benz' }
  ];

  groupedModel: GroupResult[] = groupBy(this.modelList, [{field: 'subcategory'}]);

  colorList: Array<string> = ['White', 'Silver', 'Gray', 'Black', 'Red', 'Maroon', 'Navy', 'Yellow', 'Olive', 'Lime',
                              'Green', 'Aqua','Teal','Blue', 'Fuchsia', 'Purple'];

  driveList: Array<string> = ['awd', 'fwd', 'rwd'];

  transmissionList: Array<string> = ['hybrid', 'automatic', 'manual', 'cvt'];

  bodyStyleList: Array<string> = ['coupe', 'hatchback', 'minivan', 'suv', 'sedan', 'wagon'];

  motorList: Array<string> = ['diesel', 'electric', 'gasoline'];

  startYears = [
    {id: 0,  name: 'all'},
    {id: 1,  name: "2000"},
    {id: 2,  name: "2001"},
    {id: 3,  name: "2002"},
    {id: 4,  name: "2003"},
    {id: 5,  name: "2004"},
    {id: 6,  name: "2005"},
    {id: 7,  name: "2006"},
    {id: 8,  name: "2007"},
    {id: 9,  name: "2008"},
    {id: 10, name: "2009"},
    {id: 11, name: "2010"},
    {id: 12, name: "2011"},
    {id: 13, name: "2012"},
    {id: 14, name: "2013"},
    {id: 15, name: "2014"},
    {id: 16, name: "2015"},
    {id: 17, name: "2016"},
    {id: 18, name: "2017"},
    {id: 29, name: "2018"},
    {id: 20, name: "2019"},
    {id: 21, name: "2020"},
    {id: 22, name: "2021"}
  ];

  endYears = [
    {id: 0,  name: 'all'},
    {id: 1,  name: "2000"},
    {id: 2,  name: "2001"},
    {id: 3,  name: "2002"},
    {id: 4,  name: "2003"},
    {id: 5,  name: "2004"},
    {id: 6,  name: "2005"},
    {id: 7,  name: "2006"},
    {id: 8,  name: "2007"},
    {id: 9,  name: "2008"},
    {id: 10, name: "2009"},
    {id: 11, name: "2010"},
    {id: 12, name: "2011"},
    {id: 13, name: "2012"},
    {id: 14, name: "2013"},
    {id: 15, name: "2014"},
    {id: 16, name: "2015"},
    {id: 17, name: "2016"},
    {id: 18, name: "2017"},
    {id: 29, name: "2018"},
    {id: 20, name: "2019"},
    {id: 21, name: "2020"},
    {id: 22, name: "2021"}
  ];

  startVolumes = [
    {id: 0,  name: "all"},
    {id: 2,  name: "0.2"},
    {id: 3,  name: "0.4"},
    {id: 4,  name: "0.6"},
    {id: 5,  name: "0.8"},
    {id: 6,  name: "1.0"},
    {id: 7,  name: "1.2"},
    {id: 8,  name: "1.4"},
    {id: 9,  name: "1.6"},
    {id: 10, name: "1.8"},
    {id: 11, name: "2.0"},
    {id: 12, name: "2.2"},
    {id: 13, name: "2.4"},
    {id: 14, name: "2.6"},
    {id: 15, name: "2.7"},
    {id: 16, name: "2.8"},
    {id: 17, name: "3.0"},
    {id: 18, name: "3.2"},
    {id: 19, name: "4.0"},
    {id: 20, name: "5.0"},
    {id: 21, name: "5.5"},

  ];

  endVolumes = [
    {id: 0,  name: "all"},
    {id: 2,  name: "0.2"},
    {id: 3,  name: "0.4"},
    {id: 4,  name: "0.6"},
    {id: 5,  name: "0.8"},
    {id: 6,  name: "1.0"},
    {id: 7,  name: "1.2"},
    {id: 8,  name: "1.4"},
    {id: 9,  name: "1.6"},
    {id: 10, name: "1.8"},
    {id: 11, name: "2.0"},
    {id: 12, name: "2.2"},
    {id: 13, name: "2.4"},
    {id: 14, name: "2.6"},
    {id: 15, name: "2.7"},
    {id: 16, name: "2.8"},
    {id: 17, name: "3.0"},
    {id: 18, name: "3.2"},
    {id: 19, name: "4.0"},
    {id: 20, name: "5.0"},
    {id: 21, name: "5.5"},
  ];

  dataMultipleSearch = {"id": null,
                        "raster": null,
                        "nameBrand": null,
                        "nameModel": null,
                        "startYear": null,
                        "endYear": null,
                        "color":null,
                        "startPrice": null,
                        "endPrice": null,
                        "motorType": null,
                        "startVolume": null,
                        "endVolume": null,
                        "driveType": null,
                        "transmissionType": null,
                        "bodyStyleType": null};

  auto: Array<AutoJoin>;
  private roles: string[];

  brands: [] = null;
  colors: [] = null;
  startPrice: any = null;
  endPrice: any = null;
  motors: [] = null;
  drives: [] = null;
  transmissions: [] = null;
  bodyStyles: [] = null;

  currentAutoJoin: any;
  currentIndex = -1;
  currentPage = 1;
  page = 1;
  count = 0;
  pageSize = 3;

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  isModerator: boolean = false;
  isUser: boolean = false;
  isImage: boolean = true;
  isResponse: boolean = true;

  constructor(private searchCarService: SearchAutoService,
              private tokenStorageService: TokenStorageService,
              public fb: FormBuilder,
              private router: Router,
              @Inject(DOCUMENT) private _document: Document){
  }

  searchForm = this.fb.group({
    startYear: 'all',
    endYear: 'all',
    startVolume: 'all',
    endVolume: 'all',
    model: null
  })

  ngOnInit(): void{

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.isAdmin = this.roles.includes('ROLE_ADMIN');
      this.isModerator = this.roles.includes('ROLE_MODERATOR');
      this.isUser = this.roles.includes('ROLE_USER');
    }

    this.onSubmit();
  }

  onSubmit(){
    console.log("multiple-search-auto.component: onSubmit()");

    this.dataMultipleSearch['id'] = null;
    this.dataMultipleSearch['raster'] = null;
    this.dataMultipleSearch['nameBrand'] = this.brands;

    console.log("model: ", this.searchForm.controls["model"].value);
    this.dataMultipleSearch['nameModel'] = null;  // this.searchForm.controls["model"].value ????

    this.dataMultipleSearch['startYear'] = this.startYears;
    this.dataMultipleSearch['endYear'] = this.endYears;
    this.dataMultipleSearch['color'] = this.colors;
    this.dataMultipleSearch['startPrice'] = this.startPrice;
    this.dataMultipleSearch['endPrice'] = this.endPrice;
    this.dataMultipleSearch['motorType'] = this.motors;
    this.dataMultipleSearch['startVolume'] = this.startVolumes;
    this.dataMultipleSearch['endVolume'] = this.endVolumes;
    this.dataMultipleSearch['driveType'] = this.drives;
    this.dataMultipleSearch['transmissionType'] = this.transmissions;
    this.dataMultipleSearch['bodyStyleType'] = this.bodyStyles;

    this.dataMultipleSearch['startYear'] = this.searchForm.controls["startYear"].value;
    if(this.dataMultipleSearch['startYear'] == "all"){
      this.dataMultipleSearch['startYear'] = null;
    }

    this.dataMultipleSearch['endYear'] = this.searchForm.controls["endYear"].value;
    if( this.dataMultipleSearch['endYear'] == "all"){
      this.dataMultipleSearch['endYear'] = null;
    }

    this.dataMultipleSearch['startVolume'] = this.searchForm.controls["startVolume"].value;
    if(this.dataMultipleSearch['startVolume'] == "all"){
      this.dataMultipleSearch['startVolume'] = null;
    }

    this.dataMultipleSearch['endVolume'] = this.searchForm.controls["endVolume"].value;
    if( this.dataMultipleSearch['endVolume']  == "all"){
      this.dataMultipleSearch['endVolume']  = null;
    }

    console.log("this.dataMultipleSearch: ", this.dataMultipleSearch);
    if(this.page != 1){
      this.handlePageChange(this.currentPage);
    }else{
      this.findCarByDiffCriteriaPage(this.dataMultipleSearch);
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
    this.findCarByDiffCriteriaPage(this.dataMultipleSearch);
  }

  setActiveTutorial(tutorial, index): void {
    this.currentAutoJoin = tutorial;
    this.currentIndex = index;
  }

  findCarByDiffCriteriaPage(data: any): void{
    console.log("multiple-search-auto.component: findCarByDiffCriteriaPage(data: any)");
    const params = this.getRequestParams(this.page, this.pageSize);
    this.searchCarService.getMultipleSearchAutoPage(data, params)
      .subscribe((response) =>{
        console.log("response", response);
        if(response != null){
          const {listAutoJoin, totalAutoJoin, currentPage} = response;
          this.auto = listAutoJoin;
          this.count = totalAutoJoin;
          this.currentPage = currentPage;
          this.isResponse = true;
        }else{
          this.isResponse = false;
        }
      }, error => {
        console.log(error);
      });
  }

  getImageAuto(raster: any): string {
    if (this.isImage) {
      return "data:image/png;base64," + raster;
    } else {
      this.isImage = false;
    }
  }

  goToSelectAuto(idAuto: any): void {
    this.router.navigate(['/page-auto', idAuto]);
  }

  reset():void{
    this._document.defaultView.location.reload();
  }
}
