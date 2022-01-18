import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { FeatureComponent } from './feature/feature.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { ApiCallsService } from '../api-calls.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MyProfileComponent } from './my-profile/my-profile.component';


// const routes: Routes = [
//   {path:'feature', component:FeatureComponent},
//   {path:'add-employee', component:AddEmployeeComponent},
//   {path:'dashboard',component:DashboardComponent}
// ];


@NgModule({
  declarations: [
    DashboardComponent,
    AddEmployeeComponent,
    FeatureComponent,
    HeaderComponent,
    SideNavComponent,
    EditEmployeeComponent,
    EmployeeComponent,
    ChangePasswordComponent,
    MyProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDatatableModule,
    EmployeeRoutingModule,
    FormsModule,
     RouterModule,
    // RouterModule.forChild(routes)
  ],
  exports: [],
  providers: [ApiCallsService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmployeeModule { }
