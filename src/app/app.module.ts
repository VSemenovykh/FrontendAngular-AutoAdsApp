import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { AutoComponent } from './auto/auto.component';
import { AppRoutingModule } from './app.routing.module';
import {AutoService} from './_services/auto.service';
import {HttpClientModule} from '@angular/common/http';
import {AddAutoComponent} from './auto/add-auto.component';
import {EditAutoComponent} from './auto/edit-auto.component';

import { HomeComponent } from './home/home.component';
import {SearchCarComponent} from './auto/search-car.component'
import {SearchAutoService} from './_services/search-auto.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {PictureAutoService} from "./_services/picture-auto.sevice";
import {PageAutoComponent} from "./page-auto/page-auto.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {authInterceptorProviders} from "./_helpers/auth.interceptor";
import {ProfileComponent} from "./profile/profile.component";
import {NgxPaginationModule} from 'ngx-pagination';
import {MultipleSearchAutoComponent} from "./auto/multiple-search-auto.component";
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { LabelModule } from '@progress/kendo-angular-label';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";



@NgModule({
  declarations: [
    AppComponent,
    AutoComponent,
    AddAutoComponent,
    EditAutoComponent,
    HomeComponent,
    SearchCarComponent,
    MultipleSearchAutoComponent,
    PageAutoComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    NgxPaginationModule,
    DropDownsModule,
    LabelModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [AutoService, SearchAutoService, PictureAutoService, authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
