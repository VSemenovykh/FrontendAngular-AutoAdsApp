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
import {PictureAutoComponent} from "./auto/picture-auto.component";
import {PageAutoComponent} from "./page-auto/page-auto.component";

@NgModule({
  declarations: [
    AppComponent,
    AutoComponent,
    AddAutoComponent,
    EditAutoComponent,
    HomeComponent,
    SearchCarComponent,
    PictureAutoComponent,
    PageAutoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [AutoService, SearchAutoService, PictureAutoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
