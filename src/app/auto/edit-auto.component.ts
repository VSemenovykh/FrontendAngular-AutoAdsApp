import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ModelGroup} from '../interface/modelgroup';
import {AutoService} from '../_services/auto.service';
import {FormBuilder, FormControl} from "@angular/forms";
import {PictureAutoService} from "../_services/picture-auto.sevice";
import {AutoJoin} from "../models/autojoin.model";
import {AutoPicture} from "../models/autopicture.model";
import {TokenStorageService} from "../_services/token-storage.service";

@Component({
  selector: 'app-edit-auto',
  templateUrl: 'edit-auto.component.html',
  styleUrls: ['edit-auto.component.css']
})
export class EditAutoComponent implements OnInit {

  brands = [
    {id: 1, name: "BMW"},
    {id: 2, name: "Mercedes-Benz"},
  ];

  modelControl = new FormControl();
  modelGroups: ModelGroup[] = [
    {
      name: 'BMW',
      model: [
        {id: 1, name: 'M8'},
        {id: 2, name: 'M6'},
        {id: 3, name: 'M5'},
      ]
    },
    {
      name: 'Mercedes-Benz',
      model: [
        {id: 1, name: 'GLE AMG'}
      ]
    }
  ];

  years = [
    {id: 1, name: "2000"},
    {id: 2, name: "2001"},
    {id: 3, name: "2002"},
    {id: 4, name: "2003"},
    {id: 5, name: "2004"},
    {id: 6, name: "2005"},
    {id: 7, name: "2006"},
    {id: 8, name: "2007"},
    {id: 9, name: "2008"},
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

  motors = [
    {id: 1, name: "id:1 BMW M8 2015"},
    {id: 2, name: "id:2 BMW M5 2014"},
    {id: 3, name: "id:3 BMW M6 2016"}
  ];

  colors = [
    {id: 1, name: "White"},
    {id: 2, name: "Silver"},
    {id: 3, name: "Gray"},
    {id: 4, name: "Black"},
    {id: 5, name: "Red"},
    {id: 6, name: "Maroon"},
    {id: 7, name: "Navy"},
    {id: 8, name: "Yellow"},
    {id: 9, name: "Olive"},
    {id: 10, name: "Lime"},
    {id: 11, name: "Green"},
    {id: 12, name: "Aqua"},
    {id: 13, name: "Teal"},
    {id: 14, name: "Blue"},
    {id: 15, name: "Fuchsia"},
    {id: 16, name: "Purple"}
  ];

  drives = [
    {id: 1, name: "awd"},
    {id: 2, name: "fwd"},
    {id: 3, name: "rwd"}
  ];

  transmissions = [
    {id: 1, name: "hybrid"},
    {id: 2, name: "automatic"},
    {id: 3, name: "manual"},
    {id: 4, name: "cvt"}
  ];

  bodyStyles = [
    {id: 1, name: "coupe"},
    {id: 2, name: "hatchback"},
    {id: 3, name: "minivan"},
    {id: 4, name: "suv"},
    {id: 5, name: "sedan"},
    {id: 6, name: "wagon"}
  ];

  motorTypes = [
    {id: 1, name: "diesel"},
    {id: 2, name: "electric"},
    {id: 3, name: "gasoline"}
  ];

  volumes = [
    {id: 1, name: "0.2"},
    {id: 2, name: "0.4"},
    {id: 3, name: "0.6"},
    {id: 4, name: "0.8"},
    {id: 5, name: "1.0"},
    {id: 6, name: "1.2"},
    {id: 7, name: "1.4"},
    {id: 8, name: "1.6"},
    {id: 9, name: "1.8"},
    {id: 10, name: "2.0"},
    {id: 11, name: "2.2"},
    {id: 12, name: "2.4"},
    {id: 13, name: "2.6"},
    {id: 14, name: "2.7"},
    {id: 15, name: "2.8"},
    {id: 16, name: "3.0"},
    {id: 17, name: "3.2"},
    {id: 18, name: "4.0"},
    {id: 19, name: "5.0"},
    {id: 20, name: "5.5"}
  ];

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

  autoPicture: AutoPicture = new AutoPicture();
  selectedFile: File;
  message: string;
  retrievedImage: any;
  isPicture: boolean = true;
  isData: boolean = true;

  constructor(
              private route: ActivatedRoute,
              private router: Router,
              private imageAutoService: PictureAutoService,
              private autoService: AutoService,
              public fb: FormBuilder
            ){
  }

  ngOnInit(): void {
    this.autoService.getAutoJoinById(Number(this.route.snapshot.params.id))
      .subscribe((data: AutoJoin) => {
        this.auto = data;
        this.updateForm.controls["brand"].setValue(this.auto.nameBrand);
        this.updateForm.controls["year"].setValue(this.auto.year);
        this.updateForm.controls["color"].setValue(this.auto.color);
        this.updateForm.controls["motorType"].setValue(this.auto.motorType);
        this.updateForm.controls["volume"].setValue(this.auto.volume);
        this.updateForm.controls["drive"].setValue(this.auto.driveType);
        this.updateForm.controls["transmission"].setValue(this.auto.transmissionType);
        this.updateForm.controls["bodyStyle"].setValue(this.auto.bodyStyleType);

        this.getPictureAuto(this.auto.idPicture);
      });
  }

  updateForm = this.fb.group({
    brand: [null],
    year: [null],
    color: [null],
    motorType: [null],
    volume: [null],
    drive: [null],
    transmission: [null],
    bodyStyle: [null],
    numberImage: [null]
  })

  onSubmit() {
    const auto = this.auto;
    const form = this.updateForm;

    auto.nameBrand = form.controls["brand"].value;

    (this.modelGroups.values() == null)?(auto.nameModel = this.modelControl.value):(auto.nameModel = this.auto.nameModel);

    auto.year = form.controls["year"].value;
    auto.motorType = form.controls["motorType"].value;
    auto.volume = form.controls["volume"].value;
    auto.color = form.controls["color"].value;
    auto.driveType = form.controls["drive"].value;
    auto.transmissionType = form.controls["transmission"].value;
    auto.bodyStyleType = form.controls["bodyStyle"].value;

    if ((auto.nameBrand == null) ||
        (auto.nameModel == null) ||
        (auto.year == null) ||
        (auto.motorType == null) ||
        (auto.volume == null) ||
        (auto.color == null) ||
        (auto.price == null) || (auto.driveType == null) ||
        (auto.volume == null) ||
        (auto.transmissionType == null) ||
        (auto.bodyStyleType == null)) {

      this.isData = false;

    } else {
      this.uploadPictureAuto();
      this.updateAuto(this.auto, this.auto.idPicture);
    }
  }

  getPictureAuto(id: any): void {
    this.imageAutoService.getPictureAutoByIdAuto(id)
      .subscribe(
        res => {
          this.autoPicture = res;
          (this.autoPicture != null)?( this.retrievedImage = "data:image/png;base64," + this.autoPicture.raster):( this.isPicture = false);
        }
      );
  }

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  uploadPictureAuto(): void {
    if (this.selectedFile != null) {
      const uploadImageData = new FormData();
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
      this.updatePictureAuto(uploadImageData, this.auto.idPicture);
    } else {
      this.updatePictureAuto(null, this.auto.idPicture);
    }
  }

  updatePictureAuto(file: any, id: any): any {
    if (file != null) {
      this.imageAutoService.updatePictureAuto(file, id)
        .subscribe(data => { });
     }
  }

  updateAuto(auto: any, idImage: any): void {
    this.autoService.updateAuto(auto, Number(this.route.snapshot.params.id), idImage)
      .subscribe(data => {
        this.router.navigate(['/auto']);
        if (data == null) {
          this.isData = false;
        }
      });
  }
}
