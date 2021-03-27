import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl} from "@angular/forms";
import {AutoJoin} from "../models/autojoin.model";
import { SearchAutoService } from '../_services/search-auto.service';
import {Autosearch} from "../models/autosearch.model";
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

  cars: Array<AutoJoin>;

  autoSearch: Autosearch = new Autosearch();

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
        {id: 3, name: 'M5'},
        {id: 4, name: 'M6'},
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

  startYears = [
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

  endYears = [
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

  startVolumes = [
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

  endVolumes = [
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

  constructor(private searchCarService: SearchAutoService, private route: ActivatedRoute, private router: Router,
              public fb: FormBuilder, public  autoService: AutoService) {
  }

  searchForm = this.fb.group({
    brandType: '---',
    startYear: '---',
    endYear: '---',
    color: '---',
    drive: '---',
    transmission: '---',
    bodyStyle: '---',
    motorType: '---',
    startVolume: '---',
    endVolume: '---'
  })


  ngOnInit(): void{
    this.onSubmit();
  }

  onSubmit(){
    const objAutoSearch = this.autoSearch;
    objAutoSearch.nameBrand = this.searchForm.controls["brandType"].value;
    if(objAutoSearch.nameBrand == "---"){
      objAutoSearch.nameBrand = null;
    }

    objAutoSearch.startYear = this.searchForm.controls["startYear"].value;
    if(objAutoSearch.startYear == "---"){
      objAutoSearch.startYear = null;
    }

    objAutoSearch.endYear = this.searchForm.controls["endYear"].value;
    if(objAutoSearch.endYear == "---"){
      objAutoSearch.endYear = null;
    }

    objAutoSearch.motorType = this.searchForm.controls["motorType"].value;
    if(objAutoSearch.motorType == "---"){
      objAutoSearch.motorType = null;
    }

    objAutoSearch.startVolume = this.searchForm.controls["startVolume"].value;
    if(objAutoSearch.startVolume == "---"){
      objAutoSearch.startVolume = null;
    }

    objAutoSearch.endVolume = this.searchForm.controls["endVolume"].value;
    if(objAutoSearch.endVolume == "---"){
      objAutoSearch.endVolume = null;
    }

    objAutoSearch.nameModel = this.modelControl.value;
    if( objAutoSearch.nameModel == "---"){
      objAutoSearch.nameModel = null;
    }

    objAutoSearch.color = this.searchForm.controls["color"].value;
    if( objAutoSearch.color == "---"){
      objAutoSearch.color = null;
    }

    objAutoSearch.driveType = this.searchForm.controls["drive"].value;
    if(objAutoSearch.driveType  == "---" ){
      objAutoSearch.driveType  = null;
    }

    objAutoSearch.transmissionType = this.searchForm.controls["transmission"].value;
    if( objAutoSearch.transmissionType == "---"){
      objAutoSearch.transmissionType = null;
    }

    objAutoSearch.bodyStyleType = this.searchForm.controls["bodyStyle"].value;
    if(objAutoSearch.bodyStyleType == "---"){
      objAutoSearch.bodyStyleType = null;
    }

    console.log(objAutoSearch);
    this.findCarByDiffCriteria(objAutoSearch);

  }

  findCarByDiffCriteria(data: any): void{
    this.searchCarService.getSearchAuto(data).
    subscribe(data =>{
      this.cars = data;
    });
  }
}
