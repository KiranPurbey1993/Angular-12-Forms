import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';

import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'reactive-form', component:ReactiveFormComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'**', component:LoginComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
