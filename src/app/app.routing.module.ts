import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoComponent } from './auto/auto.component';
import {AddAutoComponent} from './auto/add-auto.component';
import {EditAutoComponent} from './auto/edit-auto.component';
import { HomeComponent } from './home/home.component';
import {PageAutoComponent} from "./page-auto/page-auto.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ProfileComponent} from "./profile/profile.component";
import {MultipleSearchAutoComponent} from "./auto/multiple-search-auto.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },

  { path: 'auto',
    component: AutoComponent,	children: [{path: 'update/:id',
                                          component: EditAutoComponent}] },

  { path: 'update/:id',
    component: EditAutoComponent },

  { path: 'add',
    component: AddAutoComponent },

  { path: 'multiple-search-auto', component: MultipleSearchAutoComponent },

  { path: 'page-auto/:id', component: PageAutoComponent },

  { path: 'home', component: HomeComponent },

  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },

  { path: 'profile', component: ProfileComponent },

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
