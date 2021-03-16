import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AutoComponent } from './auto/auto.component';
import {AddAutoComponent} from './auto/add-auto.component';
import {EditAutoComponent} from './auto/edit-auto.component';

const routes: Routes = [
  { path: 'cars',
    component: AutoComponent,	children: [{path: 'update/:id',
                                          component: EditAutoComponent}] },
  { path: 'add',
    component: AddAutoComponent },
  { path: 'update/:id',
    component: EditAutoComponent },
  { path: '**',
    redirectTo: '/cars' }
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
