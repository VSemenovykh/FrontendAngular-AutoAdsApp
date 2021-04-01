import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AutoComponent } from './auto/auto.component';
import {AddAutoComponent} from './auto/add-auto.component';
import {EditAutoComponent} from './auto/edit-auto.component';
import { HomeComponent } from './home/home.component';
import {SearchCarComponent} from "./auto/search-car.component";
import {PictureAutoComponent} from "./auto/picture-auto.component";
import {PageAutoComponent} from "./page-auto/page-auto.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {BoardAdminComponent} from "./board-admin/board-admin.component";
import {BoardModeratorComponent} from "./board-moderator/board-moderator.component";
import {BoardUserComponent} from "./board-user/board-user.component";
import {ProfileComponent} from "./profile/profile.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },

  { path: 'auto',
    component: AutoComponent,	children: [{path: 'update/:id',
                                          component: EditAutoComponent}] },

  { path: 'update/:id',
    component: EditAutoComponent },

  { path: 'add',
    component: AddAutoComponent },

  { path: 'search-auto', component: SearchCarComponent },

  { path: 'image-auto', component: PictureAutoComponent },

  { path: 'page-auto/:id', component: PageAutoComponent },
  { path: 'home', component: HomeComponent },

  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },

  { path: 'profile', component: ProfileComponent },

  { path: 'user', component: BoardUserComponent },

  { path: 'mod', component: BoardModeratorComponent },

  { path: 'admin', component: BoardAdminComponent },

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
