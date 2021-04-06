import {Component, Inject, OnInit} from "@angular/core";
import {FormBuilder, FormControl} from "@angular/forms";
import {AutoJoin} from "../models/autojoin.model";
import { SearchAutoService } from '../_services/search-auto.service';
import { ModelGroup } from '../interface/modelgroup';
import {TokenStorageService} from "../_services/token-storage.service";
import {Router} from "@angular/router";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-search-car',
  templateUrl: 'search-car.component.html',
  styleUrls: ['search-car.component.css']
})
export class SearchCarComponent implements OnInit{

  brands = [
    {id: 0, name: 'all'},
    {id: 1, name: "BMW"},
    {id: 2, name: "Mercedes-Benz"}
  ];

  modelControl = new FormControl();
  modelGroups: ModelGroup[] = [
    {
      name: 'BMW',
      model: [
        {id: 0, name: 'all'},
        {id: 1, name: 'I8'},
        {id: 2, name: 'M3'},
        {id: 3, name: 'M5'},
        {id: 4, name: 'M6'},
        {id: 5, name: 'M8'},
        {id: 6, name: 'X1'},
        {id: 7, name: 'X2'},
        {id: 8, name: 'X3'},
        {id: 9, name: 'X4'},
        {id: 10, name: 'X5'}
      ]
    },
    {
      name: 'Mercedes-Benz',
      model: [
        {id: 0, name: 'all'},
        {id: 1, name: 'GLE AMG'}
      ]
    }
  ];

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

  colors = [
    {id: 0,   name: 'all'},
    { id: 1,  name: "White" },
    { id: 2,  name: "Silver" },
    { id: 3,  name: "Gray" },
    { id: 4,  name: "Black" },
    { id: 5,  name: "Red" },
    { id: 6,  name: "Maroon" },
    { id: 7,  name: "Navy" },
    { id: 8,  name: "Yellow" },
    { id: 9,  name: "Olive" },
    { id: 10, name: "Lime" },
    { id: 11, name: "Green" },
    { id: 12, name: "Aqua" },
    { id: 13, name: "Teal" },
    { id: 14, name: "Blue" },
    { id: 15, name: "Fuchsia" },
    { id: 16, name: "Purple" }
  ];

  drives = [
    {id: 0, name: 'all'},
    {id: 1, name: "awd"},
    {id: 2, name: "fwd"},
    {id: 2, name: "rwd"}
  ];

  transmissions = [
    {id: 0, name: 'all'},
    {id: 1, name: "hybrid"},
    {id: 2, name: "automatic"},
    {id: 3, name: "manual"},
    {id: 4, name: "cvt"}
  ];

  bodyStyles = [
    {id: 0, name: 'all'},
    {id: 1, name: "coupe"},
    {id: 2, name: "hatchback"},
    {id: 3, name: "minivan"},
    {id: 4, name: "suv"},
    {id: 5, name: "sedan"},
    {id: 6, name: "wagon"}
  ];

  motorTypes = [
    {id: 0, name: 'all'},
    {id: 1, name: "diesel"},
    {id: 2, name: "electric"},
    {id: 3, name: "gasoline"}
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

  auto: Array<AutoJoin>;
  autoSearch = {"id": null,
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
                    "transmissionType": null,
                    "driveType": null,
                    "bodyStyleType": null};

  private roles: string[];
  currentAutoJoin: any;
  currentIndex = -1;
  currentPage = 1;
  page = 1;
  count = 0;
  pageSize = 3;

  isLoggedIn = false;
  isAdmin = false;
  isModerator = false;
  isUser = false;
  isImage: boolean = true;
  isResponse: boolean = true;

  constructor(private searchCarService: SearchAutoService,
              private tokenStorageService: TokenStorageService,
              public fb: FormBuilder,
              private router: Router,
              @Inject(DOCUMENT) private _document: Document){
  }

  searchForm = this.fb.group({
    brandType: 'all',
    startYear: 'all',
    endYear: 'all',
    color: 'all',
    drive: 'all',
    transmission: 'all',
    bodyStyle: 'all',
    motorType: 'all',
    startVolume: 'all',
    endVolume: 'all'
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
    const dataSearch = this.autoSearch;
    dataSearch["nameBrand"] = this.searchForm.controls["brandType"].value;
    if(dataSearch["nameBrand"]== "all"){
      dataSearch["nameBrand"] = null;
    }

    dataSearch["nameModel"]  = this.modelControl.value;
    if( dataSearch["nameModel"]== "all"){
      dataSearch["nameModel"] = null;
    }

    dataSearch["startYear"] = this.searchForm.controls["startYear"].value;
    if(dataSearch["startYear"] == "all"){
      dataSearch["startYear"] = null;
    }

    dataSearch["endYear"] = this.searchForm.controls["endYear"].value;
    if(dataSearch["endYear"] == "all"){
      dataSearch["endYear"] = null;
    }

    dataSearch["motorType"] = this.searchForm.controls["motorType"].value;
    if(dataSearch["motorType"] == "all"){
      dataSearch["motorType"] = null;
    }

    dataSearch["startVolume"] = this.searchForm.controls["startVolume"].value;
    if(dataSearch["startVolume"] == "all"){
      dataSearch["startVolume"] = null;
    }

    dataSearch["endVolume"] = this.searchForm.controls["endVolume"].value;
    if( dataSearch["endVolume"]  == "all"){
      dataSearch["endVolume"] = null;
    }

    dataSearch["color"] = this.searchForm.controls["color"].value;
    if( dataSearch["color"] == "all"){
      dataSearch["color"] = null;
    }

    dataSearch["driveType"] = this.searchForm.controls["drive"].value;
    if(dataSearch["driveType"]  == "all" ){
      dataSearch["driveType"]  = null;
    }

    dataSearch["transmissionType"]  = this.searchForm.controls["transmission"].value;
    if(   dataSearch["transmissionType"]  == "all"){
      dataSearch["transmissionType"]  = null;
    }

    dataSearch["bodyStyleType"]  = this.searchForm.controls["bodyStyle"].value;
    if(dataSearch["bodyStyleType"] == "all"){
      dataSearch["bodyStyleType"] = null;
    }

    if(this.page != 1){
      this.handlePageChange(this.currentPage);
    }else{
      this.findCarByDiffCriteriaPage(this.autoSearch);
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
    this.findCarByDiffCriteriaPage(this.autoSearch);
  }

  setActiveTutorial(tutorial, index): void {
    this.currentAutoJoin = tutorial;
    this.currentIndex = index;
  }

  findCarByDiffCriteriaPage(data: any): void{
    const params = this.getRequestParams(this.page, this.pageSize);
    console.log("params: ", params);
    this.searchCarService.getSearchAutoPage(data, params)
      .subscribe((response) =>{
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
    this.autoSearch = null;
    this._document.defaultView.location.reload();
  }
}
