import {Component, Inject, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ModelGroup} from "../interface/ModelGroup";
import {AutoJoin} from "../models/autojoin.model";
import {AutoPicture} from "../models/autopicture.model";
import {ActivatedRoute, Router} from "@angular/router";
import {PictureAutoService} from "../_services/picture-auto.sevice";
import {AutoService} from "../_services/auto.service";
import {MyErrorStateMatcher} from "../editAuto/edit-auto.component";
import {CompareAutoService} from "../_services/compare-auto.service";
import {DOCUMENT} from "@angular/common";
import {TokenStorageService} from "../_services/token-storage.service";

@Component({
  selector: 'app-compare-auto',
  templateUrl: 'compare-auto.component.html',
  styleUrls: ['compare-auto.component.css']
})
export class CompareAutoComponent implements OnInit{

  autoArray: Array<AutoJoin>;
  auto: AutoJoin = new AutoJoin();
  private roles: string[];
  message: string;

  currentAutoJoin: any;
  currentIndex = -1;
  currentPage = 1;
  page = 1;
  count = 0;
  pageSize = 5;

  isImage: boolean = true;
  isResponse: boolean = true;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  isModerator: boolean = false;
  isUser: boolean = false;
  isListCompareAuto: boolean = true;

  constructor(private tokenStorageService: TokenStorageService,
              private route: ActivatedRoute,
              private router: Router,
              private compare: CompareAutoService,
              private autoService: AutoService,
              public fb: FormBuilder,
              @Inject(DOCUMENT) private _document: Document) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.isAdmin = this.roles.includes('ROLE_ADMIN');
      this.isModerator = this.roles.includes('ROLE_MODERATOR');
      this.isUser = this.roles.includes('ROLE_USER');
    }
    this.getAllAuto(this.page);
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
    this.getAllAuto(event);
  }

  setActiveTutorial(tutorial, index): void {
    console.log("setActiveTutorial()");
    this.currentAutoJoin = tutorial;
    this.currentIndex = index;
    console.log("this.currentAutoJoin : ", this.currentAutoJoin);
    console.log(" this.currentIndex : ",  this.currentIndex);
  }

  getAllAuto(page: any): void {
    console.log("getAllAuto()");
    const params = this.getRequestParams(page, this.pageSize);
    console.log("params: ", params);
    this.compare.getAllAutoToComparePage(params)
      .subscribe((response) => {
        console.log("response: ", response);
        if (response != null) {
          const {listAutoJoin, totalAutoJoin, currentPage} = response;
          this.autoArray = listAutoJoin;
          this.count = totalAutoJoin;
          this.currentPage = currentPage;
          console.log("this.autoArray: ", this.autoArray);
          console.log("this.count: ", this.count);
          console.log("this.currentPage : ", this.currentPage );

          this.isResponse = true;
          this.isListCompareAuto = true;
        } else {
          this.isResponse = false;
          this.isListCompareAuto = false;
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

  clearListCompareAuto(): void {
    console.log("clearListCompareAuto()");
    this.compare.clearListCompareAuto()
      .subscribe(data => {
      });
    console.log("List successfully cleared!");
    this.refreshPage();
  }

  deleteCompareAuto(id: any): void {
    console.log("deleteCompareAuto()");
    this.compare.deleteCompareAuto(id)
      .subscribe(data => {
      });
    console.log("Auto successfully deleted");
    this.refreshPage();
  }

  refreshPage(): void {
    this._document.defaultView.location.reload();
  }

  formatPrice(price: any): any {
    return String(price).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
  }
}
