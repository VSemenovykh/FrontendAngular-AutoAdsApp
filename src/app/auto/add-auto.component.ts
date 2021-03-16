import { Component,  OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { Auto } from '../models/auto.model';
import { AutoService } from './auto.service';

@Component({
  selector: 'app-add-auto',
   templateUrl: 'add-auto.component.html',
   styleUrls: ['auto.component.css']
})
export class AddAutoComponent {

  auto: Auto = new Auto();

  constructor(private router: Router, private autoService: AutoService) {
  }

  createAuto(): void {
      this.autoService.createAuto(this.auto)
       .subscribe( data => {
         alert('Auto created successfully.');
     });
  }
}
