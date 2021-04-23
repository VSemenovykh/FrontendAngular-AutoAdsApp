import {Component, Inject, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ModelGroup} from '../interface/ModelGroup';
import {AutoService} from '../_services/auto.service';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {PictureAutoService} from "../_services/picture-auto.sevice";
import {AutoJoin} from "../models/autojoin.model";
import {AutoPicture} from "../models/autopicture.model";
import {ErrorStateMatcher} from "@angular/material/core";
import {DOCUMENT} from "@angular/common";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-auto',
  templateUrl: 'edit-auto.component.html',
  styleUrls: ['edit-auto.component.css']
})
export class EditAutoComponent implements OnInit {

  brandControl = new FormControl('');
  brands = [
    {id: 1, name: "Audi"},
    {id: 2, name: "FORD"},
    {id: 3, name: "HONDA"},
    {id: 4, name: "HYUNDAI"},
    {id: 5, name: "BMW"},
    {id: 6, name: "MERCEDES-BENZ"},
    {id: 7, name: "KIA"}
  ];

  modelControl = new FormControl();
  modelGroups: ModelGroup[] = [
    {
      name: 'AUDI',
      model: [
        {id: 1, name: 'A3'},
        {id: 2, name: 'A4'},
        {id: 3, name: 'A8'}
      ]
    },
    {
      name: 'FORD',
      model: [
        {id: 1, name: 'FIESTA'},
        {id: 2, name: 'FOCUS'},
        {id: 3, name: 'MONDEO'}
      ]
    },
    {
      name: 'HONDA',
      model: [
        {id: 1, name: 'ACCORD'},
        {id: 2, name: 'CROSSTOUR'},
        {id: 3, name: 'JAZZ'}
      ]
    },
    {
      name: 'HYUNDAI',
      model: [
        {id: 1, name: 'SOLARIS'},
        {id: 2, name: 'ELANTRA'},
        {id: 3, name: 'SONATA'}
      ]
    },
    {
      name: 'BMW',
      model: [
        {id: 1, name: 'M8'},
        {id: 2, name: 'M6'},
        {id: 3, name: 'M5'}
      ]
    },
    {
      name: 'MERCEDES-BENZ',
      model: [
        {id: 1, name: 'GLE AMG'},
        {id: 2, name: 'MAYBACH GLS'},
        {id: 3, name: 'AMG GT'}
      ]
    },
    {
      name: 'KIA',
      model: [
        {id: 1, name: 'CERATO'},
        {id: 2, name: 'K5'},
        {id: 3, name: 'RIO X'}
      ]
    }
  ];

  yearControl = new FormControl('');
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

  colorControl = new FormControl('');
  colors = [
    {id: 1, name: "WHITE"},
    {id: 2, name: "SILVER"},
    {id: 3, name: "GRAY"},
    {id: 4, name: "BLACK"},
    {id: 5, name: "BROWN"},
    {id: 6, name: "RED"},
    {id: 7, name: "MAROON"},
    {id: 8, name: "NAVY"},
    {id: 9, name: "YELLOW"},
    {id: 10, name: "OLIVE"},
    {id: 11, name: "LIME"},
    {id: 12, name: "GREEN"},
    {id: 13, name: "AQUA"},
    {id: 14, name: "TEAL"},
    {id: 15, name: "BLUE"},
    {id: 16, name: "FUCHSIA"},
    {id: 17, name: "PURPLE"},
    {id: 18, name: "BROWN"}
  ];

  driveControl = new FormControl('');
  drives = [
    {id: 1, name: "AWD"},
    {id: 2, name: "FWD"},
    {id: 3, name: "RWD"}
  ];

  transmissionControl = new FormControl('');
  transmissions = [
    {id: 1, name: "HYBRID"},
    {id: 2, name: "AUTOMATIC"},
    {id: 3, name: "MANUAL"},
    {id: 4, name: "CVT"},
    {id: 4, name: "DSG"}
  ];

  bodyStyleControl = new FormControl('');
  bodyStyles = [
    {id: 1, name: "COUPE"},
    {id: 2, name: "HATCHBACK"},
    {id: 3, name: "MINIVAN"},
    {id: 4, name: "SUV"},
    {id: 5, name: "SEDAN"},
    {id: 6, name: "STATION WAGON"},
    {id: 7, name: "LIFTBACK"},
    {id: 8, name: "LANDAU"},
    {id: 9, name: "PICKUP TRUCK"},
    {id: 10, name: "PICKUP"},
    {id: 11, name: "SPORTS CAR"},
    {id: 12, name: "CABRIOLET"},
    {id: 13, name: "CONVERTIBLE"},
    {id: 14, name: "TWO-DOOR SEDAN"},
    {id: 15, name: "LIMOUSINE"},
    {id: 16, name: "CROSSOVER"}
  ];

  motorControl = new FormControl('');
  motors = [
    {id: 1, name: "DIESEL"},
    {id: 2, name: "ELECTRIC"},
    {id: 3, name: "GASOLINE"}
  ];

  volumeControl = new FormControl('');
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

  auto: AutoJoin = new AutoJoin();

  autoPicture: AutoPicture = new AutoPicture();
  matcher = new MyErrorStateMatcher();
  selectedFile: File;
  message: string;
  retrievedImage: any;
  isPicture: boolean = true;
  notNegativeId: boolean = true;
  validateFormatImage: boolean = true;
  validateSizeImage: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private imageAutoService: PictureAutoService,
    private autoService: AutoService,
    public fb: FormBuilder,
    @Inject(DOCUMENT) private _document: Document
  ) {
  }

  inputForm = new FormGroup({
    emailBrand: new FormControl('', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    phone: new FormControl('', [Validators.pattern("^\\([0-9]{3}\\)+\\-[0-9]{3}\\-[0-9]{2}-[0-9]{2}$")])
  });

  updateForm = this.fb.group({
    price: new FormControl('', [Validators.min(1), Validators.max(1000000000000)]),
    numberImage: [null]
  });


  ngOnInit(): void {
    this.auto.id = Number(this.route.snapshot.params.id);
    if (this.auto.id > -1) {
      this.getAuto();
    } else {
      this.router.navigate(['/404']);
    }
  }

  onSubmit() {
    console.log("onSubmit()");
    this.getAuto();
    const auto = this.auto;

    const selectedBrand = this.brandControl.value;
    if (selectedBrand['name'] != auto.nameBrand && selectedBrand['name'] != undefined) {
      auto.nameBrand = selectedBrand['name'];
    }

    auto.nameModel = this.modelControl.value;

    const selectedYear = this.yearControl.value;
    if (selectedYear['name'] != auto.year && selectedYear['name'] != undefined) {
      auto.year = selectedYear['name'];
    }

    auto.price = this.updateForm.controls["price"].value;

    const selecteMotor = this.motorControl.value;
    if (selecteMotor['name'] != auto.motorType && selecteMotor['name'] != undefined) {
      auto.motorType = selecteMotor['name'];
    }

    const selecteVolune = this.volumeControl.value;
    if (selecteVolune['name'] != auto.volume && selecteVolune['name'] != undefined) {
      auto.volume = selecteVolune['name'];
    }

    const selecteColor = this.colorControl.value;
    if (selecteColor['name'] != auto.color && selecteColor['name'] != undefined) {
      auto.color = selecteColor['name'];
    }

    const selecteDrive = this.driveControl.value;
    if (selecteDrive['name'] != auto.driveType && selecteDrive['name'] != undefined) {
      auto.driveType = selecteDrive['name'];
    }

    const selecteTransmission = this.transmissionControl.value;
    if (selecteTransmission['name'] != auto.transmissionType && selecteTransmission['name'] != undefined) {
      auto.transmissionType = selecteTransmission['name'];
    }

    const selecteBodyStyle = this.bodyStyleControl.value;
    if (selecteBodyStyle['name'] != auto.bodyStyleType && selecteBodyStyle['name'] != undefined) {
      auto.bodyStyleType = selecteBodyStyle['name'];
    }

    if (this.inputForm.controls["emailBrand"].value != '') {
      auto.email = this.inputForm.controls["emailBrand"].value;
    }

    if (this.inputForm.controls["phone"].value != '') {
      auto.phone = this.inputForm.controls["phone"].value;
    }

    this.loadPictureAuto();
    this.editAuto(auto, this.auto.idPicture);
  }

  getAuto(): void {
    console.log("getAuto()");
    const idAuto = Number(this.route.snapshot.params.id);
    this.autoService.getAutoById(idAuto)
      .subscribe(
        (data: AutoJoin) => {
          this.auto = data;
          this.brandControl.setValue(data.nameBrand);
          this.modelControl.setValue(data.nameModel);
          this.yearControl.setValue(data.year);
          this.colorControl.setValue(data.color);
          this.updateForm.controls["price"].setValue(data.price);
          this.motorControl.setValue(data.motorType);
          this.volumeControl.setValue(data.volume);
          this.driveControl.setValue(data.driveType);
          this.transmissionControl.setValue(data.transmissionType);
          this.bodyStyleControl.setValue(data.bodyStyleType);
          this.getPictureAuto(data.idPicture);
        },
        error => {
          console.log("error: ", error);
        });
  }

  getPictureAuto(id: any): void {
    this.imageAutoService.getPictureAutoByIdAuto(id)
      .subscribe(
        res => {
          this.autoPicture = res;
          (this.autoPicture != null) ? (this.retrievedImage = "data:image/png;base64," + this.autoPicture.raster) : (this.isPicture = false);
        },
        error => {
          console.log("error: ", error);
        }
      );
  }

  public onFileChanged(event) {
    console.log("onFileChanged()");

    this.selectedFile = event.target.files[0];
    console.log("this.selectedFile: ", this.selectedFile);
    console.log("this.selectedFile.name: ", this.selectedFile.name);

    const maxSizeImage = 10485760; //byte
    console.log("maxSizeImage: ", maxSizeImage);

    const formatFileJPG = this.selectedFile.name.endsWith(".JPG");
    const formatFilejpg = this.selectedFile.name.endsWith(".jpg");
    const formatFilePNG = this.selectedFile.name.endsWith(".PNG");
    const formatFilepng = this.selectedFile.name.endsWith(".png");

    const conditionOnFormatImage = (formatFileJPG == false && formatFilejpg == false && formatFilePNG == false && formatFilepng == false);
    const conditionOnMaxSizeImage = this.selectedFile.size > maxSizeImage;

    (conditionOnFormatImage) ? (this.validateFormatImage = false) : this.validateFormatImage = true;
    (conditionOnMaxSizeImage) ? this.validateSizeImage = false : this.validateSizeImage = true;
  }

  loadPictureAuto(): void {
    console.log("loadPictureAuto()");
    if (this.selectedFile != null) {
      const uploadImageData = new FormData();
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

      this.editPictureAuto(uploadImageData, this.auto.idPicture);
    } else {
      this.editPictureAuto(null, this.auto.idPicture);
    }
  }

  editPictureAuto(file: any, id: any): any {
    console.log("editPictureAuto");
    if (file != null) {
      if (this.validateSizeImage && this.validateFormatImage) {
        this.imageAutoService.editPictureAuto(file, id)
          .subscribe(data => {});
        console.log("Image successfully added!");
      } else {
        this.refreshPage();
      }
    }
  }

  editAuto(auto: any, idImage: any): void {
    console.log("editAuto()");
    this.autoService.editAuto(auto, auto.id, idImage)
      .subscribe(
        data => {
          console.log("Auto ads successfully edited!");
          this.router.navigate(['/page-auto', auto.id]);
        },
        error => {
          console.log("error: ", error);
        });
  }

  get emailBrand() {
    return this.inputForm.get('emailBrand');
  }

  get phone() {
    return this.inputForm.get('emailBrand');
  }

  get price() {
    return this.updateForm.get('price');
  }

  refreshPage(): void {
    this._document.defaultView.location.reload();
  }
}
