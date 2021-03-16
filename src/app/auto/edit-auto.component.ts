import { Component,  OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Auto } from '../models/auto.model';
import { AutoService } from '../_services/auto.service';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-edit-auto',
  templateUrl: 'edit-auto.component.html',
  styleUrls: ['edit-auto.component.css']
})
export class EditAutoComponent implements OnInit {

  auto: Auto = new Auto();

  colors = [
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
    { id: 16, name: "Purple" },
  ];

  drives = [
    {id: 1, name: "awd"},
    {id: 2, name: "fwd"},
    {id: 2, name: "rwd"},
  ];

  transmissions = [
    {id: 1, name: "hybrid"},
    {id: 2, name: "automatic"},
    {id: 3, name: "manual"},
    {id: 4, name: "cvt"},
  ];

  bodyStyles = [
    {id: 1, name: "coupe"},
    {id: 2, name: "hatchback"},
    {id: 3, name: "minivan"},
    {id: 4, name: "suv"},
    {id: 5, name: "sedan"},
    {id: 6, name: "wagon"},
  ];

  constructor(private route: ActivatedRoute, private router: Router, private autoService: AutoService, public fb: FormBuilder) {

  }

  updateForm = this.fb.group({
    color: [null],
    drive: [null],
    transmission: [null],
    bodyStyle: [null]
  })

  ngOnInit(): void{
    this.autoService.getAutoById(Number(this.route.snapshot.params.id))
      .subscribe( (data: Auto) => {
        this.auto = data;
      });
  }

  onSubmit(){
    this.auto.color = this.updateForm.controls["color"].value;
    this.auto.driveType = this.updateForm.controls["drive"].value;
    this.auto.transmissionType = this.updateForm.controls["transmission"].value;
    this.auto.bodyStyleType = this.updateForm.controls["bodyStyle"].value;

    this.updateAuto(this.auto);
  }

  updateAuto(auto: Auto): void {
    this.autoService.updateAuto(Number(this.auto.id), auto)
     .subscribe( data => {
       this.router.navigate(['/cars']);
     });
  }
}
