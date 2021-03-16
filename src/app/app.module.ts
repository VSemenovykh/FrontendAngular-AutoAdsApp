import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { AutoComponent } from './auto/auto.component';
import { AppRoutingModule } from './app.routing.module';
import {AutoService} from './auto/auto.service';
import {HttpClientModule} from '@angular/common/http';
import {AddAutoComponent} from './auto/add-auto.component';
import {EditAutoComponent} from './auto/edit-auto.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    AutoComponent,
    AddAutoComponent,
    EditAutoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AutoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
