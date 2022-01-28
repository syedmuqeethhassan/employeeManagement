// import { Component} from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './employee.component';
import{ChangePasswordComponent} from './change-password/change-password.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { TaskModule } from 'src/app/employee/task/task.module';
// import { FeatureComponent } from './feature/feature.component';
// import { LoginComponent } from '../login/login.component';

// import { EmployeeComponent } from './employee.component';

const routes: Routes = [
    {
      path: '',
      component: EmployeeComponent,
      children: [
        {path:'dashboard',component:DashboardComponent},
        {path:'change-password',component:ChangePasswordComponent},
        {path:'tasks',loadChildren: () => import('src/app/employee/task/task.module').then(m => m.TaskModule)},
        {path:'my-profile',component:MyProfileComponent}
      ]
    }
    
  ];

@NgModule({
  imports: [RouterModule.forChild(routes), TaskModule],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }