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
  FormArr: FormArray
  roles: Array<any> = [
    { name: 'admin', value: 'Admin' },
    { name: 'manager', value: 'Manager' },
    { name: 'developer', value: 'Developer' }
  ];
  password:any
  editEmployeeForm: FormGroup;

  constructor(public formbuilder: FormBuilder, private router: Router, public http: HttpClient, public apicallservice: ApiCallsService, public dashboardcomponent: DashboardComponent) {
   
  }

  ngOnInit(): void {
    this.createForm()
    console.log(this.editEmployeeFormData,'edit employee form data')
    this.dashboardcomponent.loadData()
    console.log(this.editEmployeeFormData.id,'id of person logged')
    this.apicallservice.getLoggedData(this.editEmployeeFormData._id).subscribe(
      data => {
        console.log('logged user data recevived from api ', data);
        this.password=data.password
        console.log(this.password,'this is password')
        this.editEmployeeForm.patchValue(
          {
            username: this.editEmployeeFormData.username,
            password:this.password,
            id: this.editEmployeeFormData._id,
            name: this.editEmployeeFormData.name,
            age: this.editEmployeeFormData.age,
            gender: this.editEmployeeFormData.gender,
            phonenumber: this.editEmployeeFormData.phonenumber,
            role: this.editEmployeeFormData.role
          })
        
      },
      error => {
        console.log('logged users data not recevived from api ', error);
      }
    );
    this.FormArr = this.editEmployeeForm.get('role') as FormArray;
    console.log(this.FormArr)
    console.log(this.editEmployeeFormData,'form value')
    
    console.log('Form value after patch', this.editEmployeeForm.value)
   
    console.log(this.editEmployeeFormData.username)
    console.log(this.editEmployeeFormData.role?.includes('Developer'))
  }
  // this.apicallservice.getUser(id).subscribe(
  //     data => {
  //       console.log('getting user', data);
  //     },
  //     error => {
  //       console.log('Error', error);
  //     }
  //   )
  createForm() {
    this.editEmployeeForm = this.formbuilder.group({
      username: ['', [Validators.pattern(/^[0-9a-zA-Z]+$/)]],
      password: [''],
      phonenumber: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern("[0-9]*")]],
      name: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      gender: ['', [Validators.required]],
      id: [''],
      age: ['', [Validators.required, Validators.maxLength(2), Validators.minLength(1), Validators.pattern("[0-9]*")]],
      role: ['']
    })
  }

  async onSubmit() {
    const updatedFormData = { ...this.editEmployeeForm.value }
    await (this.apicallservice.putEmployeeFormData(updatedFormData, this.editEmployeeFormData._id).subscribe(
      data => {
        console.log('POST Request is successful ', data);
        Swal.fire('successful')
        this.dashboardcomponent.loadData()
      },
      error => {
        console.log('Error', error);
        Swal.fire('unsuccessful')
      }
    ));
    this.dashboardcomponent.loadData()
    this.dashboardcomponent.showEditEmployeeModal = false
  }

  onCheckboxChange(e) {
    const currentRoles: FormArray = this.editEmployeeForm.get('role') as FormArray;
    if (e.target.checked) {
      currentRoles.value.push(e.target.value);
    } else {
      // currentRoles: current selected roles
      // e.target.value: the value of the checkbox which we clicked on
      currentRoles.value.forEach((item: string, i: number) => {
        // item: the current element in the currentRoles array
        if (item == e.target.value) {
          // if the role we unchecked is present in the currentRoles, then remove it
          currentRoles.value.splice(i, 1);
          return;
        }
      })
    }
    // update the new roles value in the form
    this.editEmployeeForm.patchValue({
      role: currentRoles.value
    })
  }
}
