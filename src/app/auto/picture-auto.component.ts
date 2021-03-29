import { HttpClient} from '@angular/common/http';
import { Component } from '@angular/core';
import {PictureAutoService} from "../_services/picture-auto.sevice";
import {AutoPicture} from "../models/autopicture.model";

@Component({

  selector: 'app-image-auto',
  templateUrl: './picture-auto.component.ts.html',
  styleUrls: ['./picture-auto.component.ts.css'],
})

export class PictureAutoComponent {

  retrievedImage: any;
  namePicture: string;
  selectedFile: File;
  pictureAuto: AutoPicture = new AutoPicture();
  message: string;
  isPicture: boolean = true;

  constructor(private httpClient: HttpClient, private imageAutoService: PictureAutoService) { }

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  getImage() {
    this.imageAutoService.getPictureAutoByNamePicture(this.namePicture)
      .subscribe(
        res => {
          this.pictureAuto = res;
          if(this.pictureAuto != null){
            this.retrievedImage = "data:image/png;base64," + this.pictureAuto.raster;
          }else {
            this.isPicture = false;
          }
        }
      );
  }
}
