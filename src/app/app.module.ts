import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {AutoadsComponent} from './autoads/autoads.component';
import {AppRoutingModule} from './app.routing.module';
import {AutoAdsService} from './_services/auto-ads.service';
import {CompareAutoAdsService} from './_services/compare-auto-ads.service';
import {HttpClientModule} from '@angular/common/http';
import {AddAutoadsComponent} from './add-autoads/add-autoads.component';
import {EditAutoadsComponent} from './edit-autoads/edit-autoads.component';
import {HomeComponent} from './home/home.component';
import {SearchAutoAdsService} from './_services/search-auto-ads.service';
import {CompareAutoadsComponent} from './compare-autoads/compare-autoads.component'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {PictureAutoService} from "./_services/picture-auto.sevice";
import {PageAutoadsComponent} from "./page-autoads/page-autoads.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {authInterceptorProviders} from "./_helpers/auth.interceptor";
import {ProfileComponent} from "./profile/profile.component";
import {NgxPaginationModule} from 'ngx-pagination';
import {SearchAutoadsComponent} from "./search-autoads/search-autoads.component";
import {DropDownsModule} from '@progress/kendo-angular-dropdowns';
import {LabelModule} from '@progress/kendo-angular-label';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {NotFoundComponent} from "./erros/not-found.component"

@NgModule({
  declarations: [
    AppComponent,
    AutoadsComponent,
    AddAutoadsComponent,
    EditAutoadsComponent,
    HomeComponent,
    SearchAutoadsComponent,
    PageAutoadsComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    CompareAutoadsComponent,
    NotFoundComponent
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
    MatPaginatorModule,
    DragDropModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  providers: [AutoAdsService, SearchAutoAdsService, PictureAutoService, authInterceptorProviders, CompareAutoAdsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
