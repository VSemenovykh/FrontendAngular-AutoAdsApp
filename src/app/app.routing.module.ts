import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AutoadsComponent} from './autoads/autoads.component';
import {AddAutoadsComponent} from './add-autoads/add-autoads.component';
import {EditAutoadsComponent} from './edit-autoads/edit-autoads.component';
import {HomeComponent} from './home/home.component';
import {PageAutoadsComponent} from "./page-autoads/page-autoads.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ProfileComponent} from "./profile/profile.component";
import {SearchAutoadsComponent} from "./search-autoads/search-autoads.component";
import {CompareAutoadsComponent} from "./compare-autoads/compare-autoads.component";
import {NotFoundComponent} from "./erros/not-found.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},

  {path: 'login', component: LoginComponent},

  {path: 'register', component: RegisterComponent},

  {path: 'profile', component: ProfileComponent},

  {
    path: 'auto-ads',
    component: AutoadsComponent, children: [{
      path: 'edit/:id',
      component: EditAutoadsComponent
    }]
  },

  {
    path: 'edit/:id',
    component: EditAutoadsComponent
  },

  {
    path: 'add',
    component: AddAutoadsComponent
  },

  {path: 'search-auto-ads', component: SearchAutoadsComponent},

  {path: 'compare-auto-ads', component: CompareAutoadsComponent},

  {path: 'page-auto-ads/:id', component: PageAutoadsComponent},

  {path: '404', component: NotFoundComponent},

  {path: '', redirectTo: 'home', pathMatch: 'full'},

  {path: '**', component: NotFoundComponent, pathMatch: 'full'}
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
export class AppRoutingModule {
}
