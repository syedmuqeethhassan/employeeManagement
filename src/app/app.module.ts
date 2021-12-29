import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeModule } from './employee/employee.module';

import { ApiCallsService } from './api-calls.service';
import { DashboardComponent } from './employee/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
     RouterModule,
     HttpClientModule,EmployeeModule,
    
  ],
  providers: [ApiCallsService,DashboardComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
