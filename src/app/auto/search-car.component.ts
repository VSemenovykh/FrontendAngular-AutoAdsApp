import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl} from "@angular/forms";
import {AutoJoin} from "../models/autojoin.model";
import { SearchCarService } from '../_services/search-car.service';
import {Auto} from "../models/auto.model";
import { AutoService } from '../_services/auto.service';

interface Model {
  id: number;
  name: string;
}

interface ModelGroup {
  disabled?: boolean;
  name: string;
  model: Model[];
}

@Component({
  selector: 'app-search-car',
  templateUrl: 'search-car.component.html',
  styleUrls: ['search-car.component.css']
})
export class SearchCarComponent implements OnInit{

  cars:  Array<AutoJoin>;

  auto: Auto = new Auto;

  autoJoin: AutoJoin = new AutoJoin();

  foundCars: AutoJoin[] = new Array();

  brands = [
    {id: 0, name: '---'},
    {id: 1, name: "BMW"},
    {id: 2, name: "Mercedes-Benz"}
  ];

  modelControl = new FormControl();
  modelGroups: ModelGroup[] = [
    {
      name: 'BMW',
      model: [
        {id: 0, name: '---'},
        {id: 1, name: 'I8'},
        {id: 2, name: 'M3'},
        {id: 3, name: 'M6'},
        {id: 4, name: 'M5'},
        {id: 5, name: 'M8'},
        {id: 6, name: 'X1'},
        {id: 7, name: 'X2'},
        {id: 8, name: 'X3'},
        {id: 9, name: 'X4'},
        {id: 10, name: 'X5'}
      ]
    },
  {
    name: 'Mercedes-Benz',
    model: [
    {id: 0, name: '---'},
    {id: 1, name: 'GLE AMG'}
    ]
  }
  ];

  years = [
    {id: 0,  name: '---'},
    {id: 1,  name: "2000"},
    {id: 2,  name: "2001"},
    {id: 3,  name: "2002"},
    {id: 4,  name: "2003"},
    {id: 5,  name: "2004"},
    {id: 6,  name: "2005"},
    {id: 7,  name: "2006"},
    {id: 8,  name: "2007"},
    {id: 9,  name: "2008"},
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

  colors = [
    {id: 0,   name: '---'},
    { id: 1,  name: "White" },
    { id: 2,  name: "Silver" },
    { id: 3,  name: "Gray" },
    { id: 4,  name: "Black" },
    { id: 5,  name: "Red" },
    { id: 6,  name: "Maroon" },
    { id: 7,  name: "Navy" },
    { id: 8,  name: "Yellow" },
    { id: 9,  name: "Olive" },
    { id: 10, name: "Lime" },
    { id: 11, name: "Green" },
    { id: 12, name: "Aqua" },
    { id: 13, name: "Teal" },
    { id: 14, name: "Blue" },
    { id: 15, name: "Fuchsia" },
    { id: 16, name: "Purple" }
  ];

  drives = [
    {id: 0, name: '---'},
    {id: 1, name: "awd"},
    {id: 2, name: "fwd"},
    {id: 2, name: "rwd"}
  ];

  transmissions = [
    {id: 0, name: '---'},
    {id: 1, name: "hybrid"},
    {id: 2, name: "automatic"},
    {id: 3, name: "manual"},
    {id: 4, name: "cvt"}
    ];

  bodyStyles = [
    {id: 0, name: '---'},
    {id: 1, name: "coupe"},
    {id: 2, name: "hatchback"},
    {id: 3, name: "minivan"},
    {id: 4, name: "suv"},
    {id: 5, name: "sedan"},
    {id: 6, name: "wagon"}
  ];

  motorTypes = [
    {id: 0, name: '---'},
    {id: 1, name: "diesel"},
    {id: 2, name: "electric"},
    {id: 3, name: "gasoline"}
  ];

  volumes = [
    {id: 0,  name: "---"},
    {id: 2,  name: "0.2"},
    {id: 3,  name: "0.4"},
    {id: 4,  name: "0.6"},
    {id: 5,  name: "0.8"},
    {id: 6,  name: "1.0"},
    {id: 7,  name: "1.2"},
    {id: 8,  name: "1.4"},
    {id: 9,  name: "1.6"},
    {id: 10, name: "1.8"},
    {id: 11, name: "2.0"},
    {id: 12, name: "2.2"},
    {id: 13, name: "2.4"},
    {id: 14, name: "2.6"},
    {id: 15, name: "2.7"},
    {id: 16, name: "2.8"},
    {id: 17, name: "3.0"},
    {id: 18, name: "3.2"},
    {id: 19, name: "4.0"},
    {id: 20, name: "5.0"},
    {id: 21, name: "5.5"},

  ];

  constructor(private searchCarService: SearchCarService, private route: ActivatedRoute, private router: Router,
              public fb: FormBuilder, public  autoService: AutoService) {
  }

  searchForm = this.fb.group({
    brandType: '---',
    year: '---',
    color: '---',
    drive: '---',
    transmission: '---',
    bodyStyle: '---',
    motorType: '---',
    volume: '---'
  })


  ngOnInit(): void{
    this.onSubmit();
  }

  onSubmit(){
    console.log(this.modelControl.value);
    this.autoJoin.nameBrand = this.searchForm.controls["brandType"].value;
    if(this.autoJoin.nameBrand == "---"){
      this.autoJoin.nameBrand = null;
    }

    this.autoJoin.year = this.searchForm.controls["year"].value;
    if(this.autoJoin.year == "---"){
      this.autoJoin.year = null;
    }

    this.autoJoin.motorType = this.searchForm.controls["motorType"].value;
    if(this.autoJoin.motorType == "---"){
      this.autoJoin.motorType = null;
    }

    this.autoJoin.volume = this.searchForm.controls["volume"].value;
    if(this.autoJoin.volume == "---"){
      this.autoJoin.volume = null;
    }

    this.autoJoin.nameModel = this.modelControl.value;
    if(this.autoJoin.nameModel == "---"){
      this.autoJoin.nameModel = null;
    }

    this.autoJoin.color = this.searchForm.controls["color"].value;
    if(this.autoJoin.color == "---"){
      this.autoJoin.color = null;
    }

    this.autoJoin.driveType = this.searchForm.controls["drive"].value;
    if(this.autoJoin.driveType == "---" ){
      this.autoJoin.driveType = null;
    }

    this.autoJoin.transmissionType = this.searchForm.controls["transmission"].value;
    if(this.autoJoin.transmissionType == "---"){
      this.autoJoin.transmissionType = null;
    }

    this.autoJoin.bodyStyleType = this.searchForm.controls["bodyStyle"].value;
    if(this.autoJoin.bodyStyleType == "---"){
      this.autoJoin.bodyStyleType = null;
    }

    this.findCarByDiffCriteria(this.autoJoin);

  }

  getAllAuto(): void{
    this.autoService.getAllAuto().subscribe( (data: AutoJoin[]) => {
      this.cars = data;
    });
  }

  findCarByDiffCriteria(cars: AutoJoin): void{
    this.searchCarService.getSearchAuto(cars).
    subscribe(data =>{
      this.cars = data;
    });
  }
}
