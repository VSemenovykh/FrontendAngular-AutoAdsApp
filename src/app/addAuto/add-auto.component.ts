import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AutoService} from '../_services/auto.service';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {PictureAutoService} from "../_services/picture-auto.sevice";
import {AutoJoin} from "../models/autojoin.model";
import {ModelGroup} from '../interface/ModelGroup';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-auto',
  templateUrl: 'add-auto.component.html',
  styleUrls: ['add-auto.component.css']
})

export class AddAutoComponent {

  brandControl = new FormControl('', Validators.required);
  brands = [
    {id: 1, name: "AUDI"},
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

  yearControl = new FormControl('', Validators.required);
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

  colorControl = new FormControl('', Validators.required);
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

  driveControl = new FormControl('', Validators.required);
  drives = [
    {id: 1, name: "AWD"},
    {id: 2, name: "FWD"},
    {id: 3, name: "RWD"}
  ];

  transmissionControl = new FormControl('', Validators.required);
  transmissions = [
    {id: 1, name: "HYBRID"},
    {id: 2, name: "AUTOMATIC"},
    {id: 3, name: "MANUAL"},
    {id: 4, name: "CVT"},
    {id: 4, name: "DSG"}
  ];

  bodyStyleControl = new FormControl('', Validators.required);
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

  motorControl = new FormControl('', Validators.required);
  motors = [
    {id: 1, name: "DIESEL"},
    {id: 2, name: "ELECTRIC"},
    {id: 3, name: "GASOLINE"}
  ];

  volumeControl = new FormControl('', Validators.required);
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
  selectedFile: File;
  matcher = new MyErrorStateMatcher();

  message: string;

  isPicture: boolean = true;
  trueData: boolean = true;
  validateFormatImage: boolean = true;
  validateSizeImage: boolean = true;
  trueImage: boolean = true;

  constructor(
              private router: Router,
              private autoService: AutoService,
              private imageAutoService: PictureAutoService,
              public fb: FormBuilder
             ){
  }

  createForm = this.fb.group({
    price: new FormControl('',[
      Validators.required,
      Validators.min(1),
      Validators.max(1000000000000)])
  })

  inputForm = new FormGroup({
    emailBrand: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    phone: new FormControl('',[
      Validators.required,
    Validators.pattern("^\\([0-9]{3}\\)+\\-[0-9]{3}\\-[0-9]{2}-[0-9]{2}$")])
  });

  onSubmit() {
    const auto = this.auto;

    const selectedBrand =  this.brandControl.value;
    if(selectedBrand != null){
      auto.nameBrand = selectedBrand['name'];
    }

    auto.nameModel = this.modelControl.value;

    const selectedYear =  this.yearControl.value;
    if(selectedYear != null){
      auto.year = selectedYear['name'];
    }
    auto.price = this.createForm.controls["price"].value;

    const selectedMotor =  this.motorControl.value;
    if(selectedMotor != null){
      auto.motorType = selectedMotor['name'];
    }

    const selectedVolume =  this.volumeControl.value;
    if(selectedVolume != null){
      auto.volume = selectedVolume['name'];
    }

    const selectedColor =  this.colorControl.value;
    if(selectedColor != null){
      auto.color = selectedColor['name'];
    }

    const selectedDrive =  this.driveControl.value;
    if(selectedDrive != null){
      auto.driveType = selectedDrive['name'];
    }
    const selectedTransmission =  this.transmissionControl.value;
    if(selectedTransmission != null){
      auto.transmissionType = selectedTransmission['name'];
    }

    const selectedBodyStyle =  this.bodyStyleControl.value;
    if(selectedBodyStyle != null){
      auto.bodyStyleType = selectedBodyStyle['name'];
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
      || (auto.driveType == null)
      || (auto.transmissionType == null)
      || (auto.bodyStyleType == null)) {

      this.trueData = false;

    } else {
      this.createPicture(this.auto);
    }
  }

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    const maxSizeImage = 10485760; //byte
    const formatFileJPG = this.selectedFile.name.endsWith(".JPG");
    const formatFilejpg = this.selectedFile.name.endsWith(".jpg");
    const formatFilePNG = this.selectedFile.name.endsWith(".PNG");
    const formatFilepng = this.selectedFile.name.endsWith(".png");

    if( formatFileJPG == false && formatFilejpg == false && formatFilePNG == false && formatFilepng == false){
      this.validateFormatImage = false;
    }else{
      this.validateFormatImage = true;
    }

    if(this.selectedFile.size > maxSizeImage){
      this.validateSizeImage = false;
    }else{
      this.validateSizeImage = true;
    }
  }

  createPicture(autoJoin): any {
    const uploadImageData = new FormData();
    if( this.selectedFile != null){
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

      if(this.validateSizeImage && this.validateFormatImage){
        this.imageAutoService.createPictureAuto(uploadImageData)
          .subscribe((id) => {
            (id != null) ? (this.create(autoJoin, id)) : (this.create(autoJoin, null));
          });
        this.trueImage = true;
      }else{
        this.trueImage = false;
      }
      this.isPicture = true;
    }else {
      this.isPicture = false;
    }
  }

  create(auto: any, idImage: any): void {
      if(this.trueImage){
        this.autoService.createAuto(auto, idImage)
          .subscribe(data => {
            this.router.navigate(['/auto']);
          });
        this.trueImage = true;
      }else {
        this.trueImage = false;
      }
  }

  get emailBrand(){
    return this.inputForm.get('emailBrand');
  }

  get phone(){
    return this.inputForm.get('emailBrand');
  }

  get price(){
    return this.createForm.get('price');
  }
}
