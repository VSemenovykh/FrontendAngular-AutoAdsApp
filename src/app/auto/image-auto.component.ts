import { HttpClient} from '@angular/common/http';
import { Component } from '@angular/core';
import {ImageAutoService} from "../_services/image-auto.sevice";
import {Imageauto} from "../models/imageauto.model";

@Component({

  selector: 'app-image-auto',
  templateUrl: './image-auto.component.ts.html',
  styleUrls: ['./image-auto.component.ts.css'],
})

export class ImageAutoComponent {

  retrievedImage: any;
  imageName: string;
  imageauto: Imageauto = new Imageauto();

  constructor(private httpClient: HttpClient, private imageAutoService: ImageAutoService) { }

  getImage() {
    this.imageAutoService.getImageAutoByNameImage(this.imageName)
      .subscribe(
        res => {
          this.imageauto = res;
          this.retrievedImage = "data:image/png;base64," + this.imageauto.raster;
        }
      );
  }
}
