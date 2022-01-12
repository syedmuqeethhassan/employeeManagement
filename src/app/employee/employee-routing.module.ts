import { Component} from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeatureComponent } from './feature/feature.component';
import { LoginComponent } from '../login/login.component';

const routes: Routes = [
    {path:'add-employee', component:AddEmployeeComponent},
    {path:'dashboard',component:DashboardComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }