import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ImageAutoService} from "../_services/image-auto.sevice";
import {AutoJoin} from "../models/autojoin.model";
import {Imageauto} from "../models/imageauto.model";
import {AutoService} from "../_services/auto.service";

@Component({
  selector: 'app-page-auto',
  templateUrl: 'page-auto.component.html',
  styleUrls: ['page-auto.component.css']
})
export class PageAutoComponent implements OnInit {

  cars: AutoJoin = new AutoJoin();
  retrievedImage: any;
  imageauto: Imageauto = new Imageauto();
  isImage: boolean = true;

  constructor(private route: ActivatedRoute, private router: Router, private autoService: AutoService , private imageAutoService: ImageAutoService) {

  }

  ngOnInit(): void{
    this.getImage(Number(this.route.snapshot.params.id));
    this.getAutoById();
  }

  getImage(id: any): void {

      this.imageAutoService.getImageAutoByIdAuto(id)
        .subscribe(
          res => {
            this.imageauto = res;
            if(this.imageauto != null){
              console.log("raster: "+this.imageauto.raster);
              this.retrievedImage = "data:image/png;base64," + this.imageauto.raster;
            }else{
              this.isImage = false;
            }
          }
      );
  }

  getAutoById(): void{
    this.autoService.getAutoById(Number(this.route.snapshot.params.id))
      .subscribe( (data: any) => {
        this.cars = data;
      });
  }

  goBack(): void{
    this.router.navigate(['/auto']);
  }
}
