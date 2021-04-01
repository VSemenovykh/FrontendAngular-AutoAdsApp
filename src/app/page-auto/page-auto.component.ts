import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PictureAutoService} from "../_services/picture-auto.sevice";
import {AutoJoin} from "../models/autojoin.model";
import {AutoPicture} from "../models/autopicture.model";
import {AutoService} from "../_services/auto.service";

@Component({
  selector: 'app-page-auto',
  templateUrl: 'page-auto.component.html',
  styleUrls: ['page-auto.component.css']
})
export class PageAutoComponent implements OnInit {

  auto: AutoJoin;
  retrievedImage: any;
  pictureAuto: AutoPicture = new AutoPicture();
  isPicture: boolean = true;

  constructor(
             private route: ActivatedRoute,
             private router: Router,
             private autoService: AutoService,
             private imageAutoService: PictureAutoService
            ) {
  }

  ngOnInit(): void{
    this.getImage(Number(this.route.snapshot.params.id));
    this.getAutoJoinById();
  }

  getImage(id: any): void {
      this.imageAutoService.getPictureAutoByIdAuto(id)
        .subscribe(
          res => {
            this.pictureAuto = res;
            (this.pictureAuto != null)?(this.retrievedImage = "data:image/png;base64," + this.pictureAuto.raster):( this.isPicture = false);
          }
      );
  }

  getAutoJoinById(): void{
    this.autoService.getAutoJoinById(Number(this.route.snapshot.params.id))
      .subscribe( (data: any) => {
        this.auto = data;
      });
  }

  goBack(): void{
    this.router.navigate(['/auto']);
  }
}
