import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AutoJoin  } from '../models/autojoin.model';
import { AutoService } from './auto.service';
import {Auto} from '../models/auto.model';

@Component({
  selector: 'app-auto',
  templateUrl: 'auto.component.html',
  styleUrls: ['auto.component.css']
})
export class AutoComponent implements OnInit {

  constructor(private router: Router, private autoService: AutoService) {
  }
  cars: AutoJoin[];

  ngOnInit(): void{
    this.autoService.getAllAuto()
      .subscribe( (data: any[]) => {
        this.cars = data;
      });
  }

  deleteAuto(car: AutoJoin): void {
    this.autoService.deleteAuto(car)
      .subscribe( data => {
      alert('Auto deleted successfully.');
    });
  }

  goToUpdate(id: number): void{
    this.router.navigate(['/update', id]);
  }
}
