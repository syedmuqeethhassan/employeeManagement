import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeComponent } from './employee/employee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { ApiCallsService } from '../api-calls.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

const routes: Routes = [
  {path:'', component:EmployeeComponent},
  {path:'add-employee', component:AddEmployeeComponent},
  {path:'dashboard',component:DashboardComponent}
];


@NgModule({
  declarations: [
    DashboardComponent,
    AddEmployeeComponent,
    EmployeeComponent,
    EditEmployeeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule,
    NgxDatatableModule
  ],
  exports: [AddEmployeeComponent,DashboardComponent],
  providers: [ApiCallsService]

})
export class EmployeeModule { }
