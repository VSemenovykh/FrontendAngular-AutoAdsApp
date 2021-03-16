import { Component,  OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Auto } from '../models/auto.model';
import { AutoService } from './auto.service';
import {AutoJoin} from '../models/autojoin.model';

@Component({
  selector: 'app-edit-auto',
  templateUrl: 'edit-auto.component.html',
  styleUrls: ['auto.component.css']
})
export class EditAutoComponent implements OnInit {

  auto: Auto;

  constructor(private route: ActivatedRoute, private autoService: AutoService) {

  }

  ngOnInit(): void{
    this.autoService.getAutoById(Number(this.route.snapshot.params.id))
      .subscribe( (data: Auto) => {
        this.auto = data;
      });
  }

  updateAuto(auto: Auto): void {
    this.autoService.updateAuto(Number(this.auto.id), auto)
     .subscribe( data => {
       alert('Auto updated successfully.');
     });
  }
}
