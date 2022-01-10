import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path:'employee',loadChildren: () => import('src/app/employee/employee.module').then(m => m.EmployeeModule)},
  {path:'',component : LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'edit-employee',component:EditEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
