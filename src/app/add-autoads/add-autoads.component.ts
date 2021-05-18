import {Component, Pipe, PipeTransform} from '@angular/core';
import {Router} from '@angular/router';
import {AutoAdsService} from '../_services/auto-ads.service';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {PictureAutoService} from "../_services/picture-auto.sevice";
import {AutoJoin} from "../models/autojoin.model";
import {ModelGroup} from '../interfaces/ModelGroup';
import {ErrorStateMatcher} from '@angular/material/core';
import {TokenStorageService} from "../_services/token-storage.service";
import {BrandModel} from "../models/brand.model";
import {MotorModel} from "../models/motor.model";
import * as _ from 'lodash';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-auto',
  templateUrl: 'add-autoads.component.html',
  styleUrls: ['add-autoads.component.css']
})

export class AddAutoadsComponent implements PipeTransform {

  brandControl = new FormControl('', Validators.required);
  brands = [];

  modelControl = new FormControl();
  modelGroups: ModelGroup[] = [];

  yearControl = new FormControl('', Validators.required);
  years = [];

  colorControl = new FormControl('', Validators.required);
  colors = [];

  driveControl = new FormControl('', Validators.required);
  drives = [];

  transmissionControl = new FormControl('', Validators.required);
  transmissions = [];

  bodyStyleControl = new FormControl('', Validators.required);
  bodyStyles = [];

  motorControl = new FormControl('', Validators.required);
  motors = [];

  volumeControl = new FormControl('', Validators.required);
  volumes = [];


  auto: AutoJoin = new AutoJoin();
  brandList: BrandModel[];
  motorList: Array<MotorModel>;
  autoList: Array<AutoJoin>;
  selectedFile: File;
  matcher = new MyErrorStateMatcher();
  message: string;

  isPicture: boolean = true;
  isData: boolean = true;
  validateFormatImage: boolean = true;
  validateSizeImage: boolean = true;
  trueImage: boolean = true;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  isModerator: boolean = false;
  isUser: boolean = false;

  constructor(
    private router: Router,
    private autoAdsService: AutoAdsService,
    private imageAutoService: PictureAutoService,
    public fb: FormBuilder,
    private tokenStorageService: TokenStorageService
  ) {
  }

  /*Form for create auto ads*/
  createForm = this.fb.group({
    price: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(1000000000)])
  })


  inputForm = new FormGroup({
    emailBrand: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]
    ),

    phone: new FormControl('', [
      Validators.required,
      Validators.pattern("^\\([0-9]{3}\\)+\\-[0-9]{3}\\-[0-9]{2}-[0-9]{2}$")])
  });

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.auto.username = user.username;

      this.getAllListBrand();
      this.getAllListMotor();
      this.getAllListAuto();
    }
  }

  onSubmit() {
    console.log("onSubmit()");
    const auto = this.auto;

    const selectedBrand = this.brandControl.value;
    if (selectedBrand != null) {
      console.log("name brand: ", selectedBrand);
      auto.nameBrand = selectedBrand;
    }

    auto.nameModel = this.modelControl.value;

    const selectedYear = this.yearControl.value;
    if (selectedYear != null) {
      auto.year = selectedYear;
    }
    auto.price = this.createForm.controls["price"].value;

    const selectedMotor = this.motorControl.value;
    if (selectedMotor != null) {
      auto.motorType = selectedMotor;
    }

    const selectedVolume = this.volumeControl.value;
    if (selectedVolume != null) {
      auto.volume = selectedVolume;
    }

    const selectedColor = this.colorControl.value;
    if (selectedColor != null) {
      auto.color = selectedColor;
    }

    const selectedDrive = this.driveControl.value;
    if (selectedDrive != null) {
      auto.driveType = selectedDrive;
    }
    const selectedTransmission = this.transmissionControl.value;
    if (selectedTransmission != null) {
      auto.transmissionType = selectedTransmission;
    }

    const selectedBodyStyle = this.bodyStyleControl.value;
    if (selectedBodyStyle != null) {
      auto.bodyStyleType = selectedBodyStyle;
    }

    auto.email = this.inputForm.controls["emailBrand"].value;
    auto.phone = "+7" + this.inputForm.controls["phone"].value;

    if ((auto.nameBrand == null)
      || (auto.nameModel == null)
      || (auto.year == null)
      || (auto.motorType == null)
      || (auto.volume == null)
      || (auto.color == null)
      || (auto.price == null)
      || (auto.driveType == null)
      || (auto.transmissionType == null)
      || (auto.bodyStyleType == null)) {
      console.log("auto.nameBrand: ", auto.nameBrand);

      this.isData = false;
    } else {
      this.addImageAuto(this.auto);
    }
  }

  /*Load picture auto from client API*/
  public onFileChanged(event) {
    console.log("onFileChanged()");

    this.selectedFile = event.target.files[0];
    console.log("selectedFile: ", this.selectedFile);
    console.log("this.selectedFile.name: ", this.selectedFile.name);

    const maxSizeImage = 10485760; //byte
    console.log("MaxSizeImage: ", maxSizeImage);

    const formatFileJPG = this.selectedFile.name.endsWith(".JPG");
    const formatFilejpg = this.selectedFile.name.endsWith(".jpg");
    const formatFilePNG = this.selectedFile.name.endsWith(".PNG");
    const formatFilepng = this.selectedFile.name.endsWith(".png");

    const conditionOnFormatImage = (formatFileJPG == false && formatFilejpg == false && formatFilePNG == false && formatFilepng == false);
    const conditionOnMaxSizeImage = this.selectedFile.size > maxSizeImage;

    (conditionOnFormatImage) ? (this.validateFormatImage = false) : this.validateFormatImage = true;
    (conditionOnMaxSizeImage) ? this.validateSizeImage = false : this.validateSizeImage = true;
  }

  /*Add new picture auto*/
  addImageAuto(autoJoin): any {
    console.log("createPicture()");
    const uploadImageData = new FormData();
    if (this.selectedFile != null) {
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

      if (this.validateSizeImage && this.validateFormatImage) {
        this.imageAutoService.addImageAuto(uploadImageData)
          .subscribe(
            (id) => {
              (id != null) ? (this.addAutoAds(autoJoin, id)) : (this.addAutoAds(autoJoin, null));
            },
            error => {
              console.log("error: ", error);
            }
          );

        this.trueImage = true;
      } else {
        this.trueImage = false;
      }

      this.isPicture = true;
    } else {
      this.isPicture = false;
    }

    console.log("Added image auto to list");
  }

  /*Add new auto ads to list auto ads*/
  addAutoAds(auto: any, idImage: any): void {
    console.log("createAuto()");
    console.log("Auto: ", auto);
    auto.idPicture = idImage;
    console.log("trueImage: ", this.trueImage);
    if (this.trueImage) {
      this.autoAdsService.addAutoAds(auto, idImage)
        .subscribe(
          data => {
            this.router.navigate(['/auto-ads']);
          },
          error => {
            console.log("error: ", error);
          });

      this.trueImage = true;
    } else {
      this.trueImage = false;
    }

    console.log("Auto ads successfully to the list");
  }

  /*Get list brand*/
  getAllListBrand(): void {
    this.autoAdsService.getAllBrand()
      .subscribe(
        (res) => {
          this.brandList = res;
          this.brands = this.transform(res, "nameBrand").map(name => name.nameBrand);
          this.years = this.transform(res, "year").map(name => name.year);

          const brands = this.brands;
          const brandsFromListModels = this.transform(res, "nameModel").map(name => name.nameBrand);
          const models = this.transform(res, "nameModel").map(name => name.nameModel);

          let massiv = [];

          for (let i = 0; i < brands.length; i++) {
            let newModelGroup: ModelGroup = {name: '', model: []};
            // newModelGroup.name = brands[i];
            for (let j = 0; j < brandsFromListModels.length; j++) {
              if (brands[i] === brandsFromListModels[j]) {
                massiv.push(models[j]);
              }
            }

            // newModelGroup.model = massiv;
            this.modelGroups.push({name: brands[i], model: massiv});

            massiv = [];
            // newModelGroup = null;
          }
          console.log("out cycle this.modelGroups: ", this.modelGroups);
        });
  }

  /*Get list model*/
  getAllListMotor(): void {
    this.autoAdsService.getAllMotor()
      .subscribe(
        (res) => {
          this.motorList = res;
          this.motors = this.transform(res, "motorType").map(name => name.motorType);
          this.volumes = this.transformForNumberValues(res, "volume").map(name => name.volume).sort();
        });
  }

  /*Get list auto*/
  getAllListAuto(): void {
    this.autoAdsService.getAllAuto()
      .subscribe(
        (res) => {
          this.autoList = res;
          const listColor = this.transform(res, "color");
          this.colors = listColor.map(name => name.color);
          const listDrive = this.transform(res, "driveType");
          this.drives = listDrive.map(name => name.driveType);
          const listTransmission = this.transform(res, "transmissionType");
          this.transmissions =  listTransmission.map(name => name.transmissionType);
          console.log("this.transmissions: ", this.transmissions);
          this.bodyStyles =  this.transform(res, "bodyStyleType").map(name => name.bodyStyleType);
        });
  }

  /*Get unique values from array string values*/
  transform(value: any[], nameColum: string): any {
    if (value !== undefined && value !== null) {
      value.sort((a, b) => a[nameColum].toLowerCase() !== b[nameColum].toLowerCase() ? a[nameColum].toLowerCase() < b[nameColum].toLowerCase() ? -1 : 1 : 0);
      return _.uniqBy(value, nameColum);
    }
    return value;
  }

  /*Get unique values from array number values*/
  transformForNumberValues(value: any[], nameColum: string): any {
    if (value !== undefined && value !== null) {
      return _.uniqBy(value, nameColum);
    }
    return value;
  }

  get emailBrand() {
    return this.inputForm.get('emailBrand');
  }

  get phone() {
    return this.inputForm.get('emailBrand');
  }

  get price() {
    return this.createForm.get('price');
  }
}
