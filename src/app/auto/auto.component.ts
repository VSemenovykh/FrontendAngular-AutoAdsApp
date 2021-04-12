import {Component, OnInit, Inject, ViewChild, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {Auto} from '../models/auto.model';
import {AutoService} from '../_services/auto.service';
import {PictureAutoService} from "../_services/picture-auto.sevice";
import {TokenStorageService} from "../_services/token-storage.service";
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-auto',
  templateUrl: 'auto.component.html',
  styleUrls: ['auto.component.css']
})
export class AutoComponent implements OnInit {

  cars: Array<Auto>;
  private roles: string[];
  currentPage = 1;
  page = 0;
  sizeCars: any;
  pageSize = 5;

  isAdmin: boolean = false;
  isModerator: boolean = false;
  isUser: boolean = false;
  isImage: boolean = true;
  isLoggedIn: boolean = false;

  columns: string[];
  dataSource: Array<Auto>;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  constructor(
              private router: Router,
              private autoService: AutoService,
              private tokenStorageService: TokenStorageService,
              private imageAutoService: PictureAutoService,
              @Inject(DOCUMENT) private _document: Document
             ){
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

    if(this.isAdmin){
      this.columns = ['photo', 'brand', 'model', 'year', 'price', 'update', 'delete'];
    }else if(this.isModerator){
      this.columns  = ['photo', 'brand', 'model', 'year', 'price', 'update'];
    }else{
      this.columns  = ['photo', 'brand', 'model', 'year', 'price'];
    }

    if(this.page != 1){
      this.getIndexPage(this.page);
    }else{
      this.loadAutoByPage();
    }
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

  getIndexPage(index: any): void{
    this.page = index;
    this.loadAutoByPage();
  }

  private loadAutoByPage(): void {
    const params = this.getRequestParams(this.page, this.pageSize);
    this.autoService.getAllAutoPage(params).subscribe((response) =>{
      const { listAutoJoin, totalAutoJoin, currentPage } = response;
      this.cars = listAutoJoin;
      this.currentPage = currentPage;
      this.sizeCars = totalAutoJoin;
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

  deleteAuto(car: Auto): void {
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
