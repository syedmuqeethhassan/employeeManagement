import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector: 'app-emmployee',
  templateUrl: './employee.component.html',
})
export class EmployeeComponent implements OnInit {
userLogged:any
  constructor(public dashboard:DashboardComponent) { 

  }

  ngOnInit(): void {
    console.log('inside inde compo')
    this.userLogged=this.dashboard?.loggedPerson?.userName
  }
  dropdownEvent(event){
    if(event==true){
      
    }
  }

  onRouteChange() {

  }

}
