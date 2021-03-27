import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { AutoJoin  } from '../models/autojoin.model';
import { AutoService } from '../_services/auto.service';

@Component({
  selector: 'app-auto',
  templateUrl: 'auto.component.html',
  styleUrls: ['auto.component.css']
})
export class AutoComponent implements OnInit {

  cars:  Array<AutoJoin>;

  constructor(private router: Router, private autoService: AutoService, @Inject(DOCUMENT) private _document: Document) {
    this.cars = new Array<AutoJoin>();
  }

  ngOnInit(): void{
     this.loadAuto();
  }

  private loadAuto() {
    this.autoService.getAllAuto()
      .subscribe( (data: AutoJoin[]) => {
        this.cars = data;
      });
  }

  refreshPage() {
    this._document.defaultView.location.reload();
  }

  deleteAuto(car: AutoJoin): void {
    this.autoService.deleteAuto(car)
      .subscribe( data => {
    });
    this.refreshPage();
  }

  goToUpdate(id: number): void{
    this.router.navigate(['/update', id]);
  }
}
