import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AutoService} from '../_services/auto.service';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {PictureAutoService} from "../_services/picture-auto.sevice";
import {AutoJoin} from "../models/autojoin.model";
import {ModelGroup} from '../interface/modelgroup';

@Component({
  selector: 'app-add-auto',
  templateUrl: 'add-auto.component.html',
  styleUrls: ['add-auto.component.css']
})

export class AddAutoComponent {

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

  auto: AutoJoin = new AutoJoin();
  selectedFile: File;

  message: string;
  idPicture: number

  isPicture: boolean = true;
  isData: boolean = true;

  constructor(
              private router: Router,
              private autoService: AutoService,
              private imageAutoService: PictureAutoService,
              public fb: FormBuilder
             ){
  }

  createForm = this.fb.group({
    brand: [null],
    year: [null],
    motorType: [null],
    volume: [null],
    color: [null],
    drive: [null],
    transmission: [null],
    bodyStyle: [null]
  })

  phoneForm = this.fb.group({
    mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
  })

  get f(){
    return this.phoneForm.controls;
  }

  onSubmit() {
    const auto = this.auto;
    auto.nameBrand = this.createForm.controls["brand"].value;
    auto.nameModel = this.modelControl.value;
    auto.year = this.createForm.controls["year"].value;
    auto.motorType = this.createForm.controls["motorType"].value;
    auto.volume = this.createForm.controls["volume"].value;
    auto.color = this.createForm.controls["color"].value;
    auto.driveType = this.createForm.controls["drive"].value;
    auto.transmissionType = this.createForm.controls["transmission"].value;
    auto.bodyStyleType = this.createForm.controls["bodyStyle"].value;

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

      this.isData = false;

    } else {

      this.createPicture(this.auto);
    }
  }

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  createPicture(autoJoin): any {
    const uploadImageData = new FormData();
    if( this.selectedFile != null){
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
      this.imageAutoService.createPictureAuto(uploadImageData)
        .subscribe((id) => {
          (id != null)? (this.create(autoJoin, id)):(   this.create(autoJoin, null));
        });

    }else {
      this.isPicture = false;
    }
  }

  create(auto: any, idImage: any): void {
    this.autoService.createAuto(auto, idImage)
      .subscribe(data => {
        this.router.navigate(['/auto']);
      });
  }
}
