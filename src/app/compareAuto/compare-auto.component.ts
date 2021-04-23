import {Component, Inject, OnInit} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import {AutoJoin} from "../models/autojoin.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AutoService} from "../_services/auto.service";
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

  idUser: number;
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
      this.idUser = user.id;
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
  }

  getAllAuto(page: any): void {
    console.log("getAllAuto()");
    const params = this.getRequestParams(page, this.pageSize);
    params['idUser'] = this.tokenStorageService.getUser().id;
    console.log("params: ", params);
    this.compare.getAllAutoToComparePage(params)
      .subscribe(
        (response) => {
          if (response != null) {
            const {listAutoJoin, totalAutoJoin, currentPage} = response;
            this.autoArray = listAutoJoin;
            this.count = totalAutoJoin;
            this.currentPage = currentPage;

            this.isResponse = true;
            this.isListCompareAuto = true;
          } else {
            this.isResponse = false;
            this.isListCompareAuto = false;
          }
        },
        error => {
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
    const params = {"idUser": this.idUser};
    this.compare.clearListCompareAuto(params)
      .subscribe(data => {
        },
        error => {
          console.log("error: ", error);
        }
      );

    console.log("List successfully cleared!");
    this.refreshPage();
  }

  deleteCompareAuto(id: any): void {
    console.log("deleteCompareAuto()");
    const params = {"idUser": this.idUser};
    console.log("params: ", params);
    this.compare.deleteCompareAuto(id, params)
      .subscribe(
        data => {
        },
        error => {
          console.log("error: ", error);
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
