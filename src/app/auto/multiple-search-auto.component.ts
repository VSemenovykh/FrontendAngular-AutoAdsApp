import {Component, Inject, OnInit, ViewChild} from "@angular/core";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {AutoJoin} from "../models/autojoin.model";
import { SearchAutoService } from '../_services/search-auto.service';
import {TokenStorageService} from "../_services/token-storage.service";
import {Router} from "@angular/router";
import {DOCUMENT} from "@angular/common";
import { GroupResult, groupBy } from '@progress/kendo-data-query';
import {AutoService} from "../_services/auto.service";
import {CompareAutoService} from "../_services/compare-auto.service";

@Component({
  selector: 'app-multiple-search-auto',
  templateUrl: 'multiple-search-auto.component.html',
  styleUrls: ['multiple-search-auto.component.css']
})
export class MultipleSearchAutoComponent implements OnInit{
  @ViewChild('list') list;

  // tslint:disable-next-line:max-line-length
  brandList: Array<string> = ['AUDI', 'FORD', 'HONDA', 'HYUNDAI', 'BMW', 'MERCEDES-BENZ', 'KIA'];

  modelList: Array<any> = [
    { name: 'A3', category: 'Model', subcategory: 'AUDI' },
    { name: 'A4', category: 'Model', subcategory: 'AUDI' },
    { name: 'A8', category: 'Model', subcategory: 'AUDI' },

    { name: 'FIESTA', category: 'Model', subcategory: 'FORD' },
    { name: 'FOCUS', category: 'Model', subcategory: 'FORD' },
    { name: 'MONDEO', category: 'Model', subcategory: 'FORD' },

    { name: 'ACCORD', category: 'Model', subcategory: 'HONDA' },
    { name: 'CROSSTOUR', category: 'Model', subcategory: 'HONDA' },
    { name: 'JAZZ', category: 'Model', subcategory: 'HONDA' },

    { name: 'SOLARIS', category: 'Model', subcategory: 'HYUNDAI' },
    { name: 'ELANTRA', category: 'Model', subcategory: 'HYUNDAI' },
    { name: 'SONATA', category: 'Model', subcategory: 'HYUNDAI' },

    { name: 'M5', category: 'Model', subcategory: 'BMW' },
    { name: 'M6', category: 'Model', subcategory: 'BMW' },
    { name: 'M8', category: 'Model', subcategory: 'BMW' },

    { name: 'GLE AMG', category: 'Model', subcategory: 'MERCEDES-BENZ' },
    { name: 'MAYBACH GLS', category: 'Model', subcategory: 'MERCEDES-BENZ' },
    { name: 'AMG GT', category: 'Model', subcategory: 'MERCEDES-BENZ' },

    { name: 'CERATO', category: 'Model', subcategory: 'KIA' },
    { name: 'K5', category: 'Model', subcategory: 'KIA' },
    { name: 'RIO X', category: 'Model', subcategory: 'KIA' }
  ];

  groupedModel: GroupResult[] = groupBy(this.modelList, [{field: 'subcategory'}]);

  colorList: Array<string> = ['WHITE', 'SILVER', 'GRAY', 'BLACK', 'RED', 'MAROON', 'NAVY', 'YELLOW', 'OLIVE', 'LIME',
                              'GREEN', 'AQUA','TEAL','BLUE', 'FUCHSIA', 'PURPLE', 'BROWN'];

  driveList: Array<string> = ['AWD', 'FWD', 'RWD'];

  transmissionList: Array<string> = ['HYBRID', 'AUTOMATIC', 'MANUAL', 'CVT', 'DSG'];

  bodyStyleList: Array<string> = ['COUPE', 'HATCHBACK', 'MINIVAN', 'SUV', 'SEDAN', 'STATION WAGON'];

  motorList: Array<string> = ['DIESEL', 'ELECTRIC', 'GASOLINE'];

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

  dataSearch = {"id": null,
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
  neweAuto: AutoJoin = new AutoJoin();
  listSelectIdAuto = [];  //???
  listAutoForCompare = [];

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
  pageSize = 5;

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
              @Inject(DOCUMENT) private _document: Document,
              private autoService: AutoService,
              private compareAutoService: CompareAutoService){
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

  }

  onSubmit(){
    this.dataSearch['nameBrand'] = this.brands;

    const selectedModels = this.searchForm.controls["model"].value;
    if(selectedModels != null){
      const selectedModelNames = selectedModels.map(model => model.name);
      this.dataSearch['nameModel'] = selectedModelNames;
    }

    this.dataSearch['startYear'] = this.startYears;
    this.dataSearch['endYear'] = this.endYears;
    this.dataSearch['color'] = this.colors;
    this.dataSearch['startPrice'] = this.startPrice;
    this.dataSearch['endPrice'] = this.endPrice;
    this.dataSearch['motorType'] = this.motors;
    this.dataSearch['startVolume'] = this.startVolumes;
    this.dataSearch['endVolume'] = this.endVolumes;
    this.dataSearch['driveType'] = this.drives;
    this.dataSearch['transmissionType'] = this.transmissions;
    this.dataSearch['bodyStyleType'] = this.bodyStyles;

    this.dataSearch['startYear'] = this.searchForm.controls["startYear"].value;
    if(this.dataSearch['startYear'] == "all"){
      this.dataSearch['startYear'] = null;
    }

    this.dataSearch['endYear'] = this.searchForm.controls["endYear"].value;
    if( this.dataSearch['endYear'] == "all"){
      this.dataSearch['endYear'] = null;
    }

    this.dataSearch['startVolume'] = this.searchForm.controls["startVolume"].value;
    if(this.dataSearch['startVolume'] == "all"){
      this.dataSearch['startVolume'] = null;
    }

    this.dataSearch['endVolume'] = this.searchForm.controls["endVolume"].value;
    if( this.dataSearch['endVolume']  == "all"){
      this.dataSearch['endVolume']  = null;
    }

    console.log("this.dataMultipleSearch: ", this.dataSearch);
    if(this.page != 1){
      this.handlePageChange(this.currentPage);
    }else{
      this.findCarByDiffCriteriaPage(this.dataSearch);
    }

    // console.log("onChange: ", this.listSelectAutoAds); //???
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
    this.findCarByDiffCriteriaPage(this.dataSearch);
  }

  setActiveTutorial(tutorial, index): void {
    this.currentAutoJoin = tutorial;
    this.currentIndex = index;
  }

  findCarByDiffCriteriaPage(data: any): void{
    const params = this.getRequestParams(this.page, this.pageSize);
    this.searchCarService.searchAutoPage(data, params)
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


  onChange(idAuto: any, isChecked: boolean) {
    if (isChecked) {
      this.listSelectIdAuto.push(idAuto);
    } else {
      for(let value of this.listSelectIdAuto) {
        if(value === idAuto){
          this.listSelectIdAuto.pop();
        }
      }
    }
    // console.log(" this.listSelectAutoAds.indexOf(idAuto): ", this.listSelectIdAuto.indexOf(idAuto));
    // console.log("idAuto: ", idAuto);
  }

  //??
  compareAuto(){
    this.listSelectIdAuto.forEach(idAuto => console.log("idAuto",
      this.autoService.getAutoById(idAuto)
        .subscribe(
          res => {
            this.neweAuto = res;
            this.listAutoForCompare.push(this.neweAuto)
            console.log(" neweAuto",  this.neweAuto);
            this.compareAutoService.addAutoToCompare(this.neweAuto)
             .subscribe(
               data => {
                console.log(" data",  data);
              }
            )
          }
        )
    ));
    console.log(" this.listAutoForCompare",  this.listAutoForCompare);

      // .subscribe(res =>{
      //
      // });
    this.router.navigate(['/compare-auto']);
  }
}
