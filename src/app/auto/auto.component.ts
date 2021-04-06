import {Component, AfterViewInit, ViewChild, OnInit, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {AutoJoin} from '../models/autojoin.model';
import {AutoService} from '../_services/auto.service';
import {PictureAutoService} from "../_services/picture-auto.sevice";
import {TokenStorageService} from "../_services/token-storage.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-auto',
  templateUrl: 'auto.component.html',
  styleUrls: ['auto.component.css']
})
export class AutoComponent implements OnInit {

  cars: Array<AutoJoin>;
  private roles: string[];
  currentAutoJoin = null;
  currentIndex = -1;
  currentPage = 1;
  page = 1;
  count = 0;
  pageSize = 3;

  isAdmin: boolean = false;
  isModerator: boolean = false;
  isUser: boolean = false;
  isImage: boolean = true;
  isLoggedIn: boolean = false;

  displayedColumns: string[] = ['photo', 'brand', 'model', 'year', 'color', 'price','motor','volume','drive','transmission','body style'];

  constructor(
              private router: Router,
              private autoService: AutoService,
              private tokenStorageService: TokenStorageService,
              private imageAutoService: PictureAutoService,
              @Inject(DOCUMENT) private _document: Document
             ){
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  // ngAfterViewInit() {
  //   this.cars.paginator = this.paginator;
  // }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.isAdmin = this.roles.includes('ROLE_ADMIN');
      this.isModerator = this.roles.includes('ROLE_MODERATOR');
      this.isUser = this.roles.includes('ROLE_USER');

    }

    if(this.page != 1){
      this.handlePageChange(this.currentPage);
    }else{
      this.loadAutoByPage();
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
    console.log("event: " + event);
    this.page = event;
    this.loadAutoByPage();
  }

  setActiveTutorial(tutorial, index): void {
    this.currentAutoJoin = tutorial;
    this.currentIndex = index;
  }

  private loadAutoByPage(): void {
    const params = this.getRequestParams(this.page, this.pageSize);
    console.log("params: ", params);
    this.autoService.getAllAutoPage(params).subscribe((response) =>{
      const { listAutoJoin, totalAutoJoin, currentPage } = response;
      this.cars = listAutoJoin;
      this.count = totalAutoJoin;
      this.currentPage = currentPage;
    }, error => {
      console.log(error);
    });
  }

  refreshPage(): void {
    this._document.defaultView.location.reload();
  }

  getImageAuto(raster: any): string {
    if (this.isImage) {
      return "data:image/png;base64," + raster;
    } else {
      this.isImage = false;
    }
  }

  deleteAuto(car: AutoJoin): void {
    this.autoService.deleteAuto(car)
      .subscribe(data => {
      });
    this.refreshPage();
  }

  goToUpdate(id: number): void {
    this.router.navigate(['/update', id]);
  }

  goToSelectAuto(idAuto: any): void {
    this.router.navigate(['/page-auto', idAuto]);
  }
}
