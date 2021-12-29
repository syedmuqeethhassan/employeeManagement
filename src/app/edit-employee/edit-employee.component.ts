import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiCallsService } from '../api-calls.service';
import { DashboardComponent } from '../employee/dashboard/dashboard.component';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  @Input() editEmployeeFormData: any
  roles=['admin','manager','developer']
  editEmployeeForm: FormGroup;
  // userName:string
  // password:string
  constructor(public formbuilder:FormBuilder, private router: Router,public http:HttpClient,public apicallservice:ApiCallsService,public dashboardcomponent:DashboardComponent) {

    this.editEmployeeForm = this.formbuilder.group({
      userName: ['', [Validators.required, Validators.pattern(/^[0-9a-zA-Z]+$/)]],
      password:  ['', [Validators.required]],
      phoneNumber:['',[Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern("[0-9]*")]],
      name: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      gender:['',[Validators.required]],
      id: ['',[Validators.required,Validators.maxLength(2),Validators.minLength(1),Validators.pattern("[0-9]*")]],
      age: ['',[Validators.required,Validators.maxLength(2),Validators.minLength(1),Validators.pattern("[0-9]*")]],
      role:['',[Validators.required]]
    })


   }

  ngOnInit(): void {
    this.editEmployeeForm.patchValue(
      {
        id:this.editEmployeeFormData.id,
        name:this.editEmployeeFormData.name,
        age:this.editEmployeeFormData.age,
        gender:this.editEmployeeFormData.gender,
        password: this.editEmployeeFormData.userName,
        phoneNumber: this.editEmployeeFormData.phoneNumber,
        role:this.editEmployeeFormData.role,
        userName: this.editEmployeeFormData.userName,

    })
  
    this.editEmployeeForm.controls['userName'].disable();

  }
onSubmit(){
  console.log("Edit EMPLOYEE OWRKING")
  this.editEmployeeFormData = {...this.editEmployeeForm.value}
  console.log(this.editEmployeeFormData)
  this.apicallservice.putEmployeeFormData(this.editEmployeeFormData,this.editEmployeeFormData.id)
  this.dashboardcomponent.showEditEmployeeModal=false
  Swal.fire('Employee Edited')
}
assigndata(employeeobject){
  this.editEmployeeForm.controls['name']=employeeobject.name
  console.log("data assignment in edit is working")

}

}
