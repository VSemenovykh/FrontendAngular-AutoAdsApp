import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AutoComponent } from './auto/auto.component';
import {AddAutoComponent} from './auto/add-auto.component';
import {EditAutoComponent} from './auto/edit-auto.component';
import { HomeComponent } from './home/home.component';
import {SearchCarComponent} from "./auto/search-car.component";
import {ImageAutoComponent} from "./auto/image-auto.component";
import {PageAutoComponent} from "./page-auto/page-auto.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },

  { path: 'auto',
    component: AutoComponent,	children: [{path: 'update/:id',
                                          component: EditAutoComponent}] },

  { path: 'update/:id',
    component: EditAutoComponent },

  { path: 'add',
    component: AddAutoComponent },

  { path: 'search-car', component: SearchCarComponent },

  { path: 'image-auto', component: ImageAutoComponent },

  { path: 'page-auto/:id', component: PageAutoComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
