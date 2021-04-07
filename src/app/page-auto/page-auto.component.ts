import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PictureAutoService} from "../_services/picture-auto.sevice";
import {AutoPicture} from "../models/autopicture.model";
import {AutoService} from "../_services/auto.service";

@Component({
  selector: 'app-page-auto',
  templateUrl: 'page-auto.component.html',
  styleUrls: ['page-auto.component.css']
})
export class PageAutoComponent implements OnInit {

  auto = {"id": null,
          "idPicture": null,
          "raster": null,
          "email": null,
          "phone": null,
          "nameBrand": null,
          "nameModel": null,
          "year": null,
          "color": null,
          "price": null,
          "motorType": null,
          "volume": null,
          "driveType": null,
          "transmissionType": null,
          "bodyStyleType": null};

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
