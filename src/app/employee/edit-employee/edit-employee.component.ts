import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiCallsService } from '../../api-calls.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  @Input() editEmployeeFormData: any
  roles: Array<any> = [
    { name: 'admin', value: 'Admin' },
    { name: 'manager', value: 'Manager' },
    { name: 'developer', value: 'Developer' }
  ];
  editEmployeeForm: FormGroup;
  constructor(public formbuilder:FormBuilder, private router: Router,public http:HttpClient,public apicallservice:ApiCallsService,public dashboardcomponent:DashboardComponent) {
    this.createForm()
   }
  ngOnInit(): void {
    this.editEmployeeForm.patchValue(
      {
        userName: this.editEmployeeFormData.userName,
         id:this.editEmployeeFormData.id,
        name:this.editEmployeeFormData.name,
        age:this.editEmployeeFormData.age,
        gender:this.editEmployeeFormData.gender,
        phoneNumber: this.editEmployeeFormData.phoneNumber,
    })
  }
  createForm(){
    this.editEmployeeForm = this.formbuilder.group({
      userName: ['', [Validators.required, Validators.pattern(/^[0-9a-zA-Z]+$/)]],
      password:  ['', [Validators.required]],
      phoneNumber:['',[Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern("[0-9]*")]],
      name: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      gender:['',[Validators.required]],
      id: ['',[Validators.required,Validators.maxLength(2),Validators.minLength(1),Validators.pattern("[0-9]*")]],
      age: ['',[Validators.required,Validators.maxLength(2),Validators.minLength(1),Validators.pattern("[0-9]*")]],
      rolesArray: this.formbuilder.array([])
    })
  }
onSubmit(){
  console.log("Edit EMPLOYEE OWRKING")
  this.editEmployeeFormData = {...this.editEmployeeForm.value}
  console.log(this.editEmployeeFormData)
  this.apicallservice.putEmployeeFormData(this.editEmployeeFormData,this.editEmployeeFormData.id)
  this.dashboardcomponent.showEditEmployeeModal=false
  Swal.fire('Employee Edited')
}
onCheckboxChange(e) {
  const rolesArray: FormArray = this.editEmployeeForm.get('rolesArray') as FormArray;

  if (e.target.checked) {
    rolesArray.push(new FormControl(e.target.value));
  } else {
    let i: number = 0;
    rolesArray.controls.forEach((item: FormControl) => {
      if (item.value == e.target.value) {
        rolesArray.removeAt(i);
        return;
      }
      i++;
    });
  }
}
}
