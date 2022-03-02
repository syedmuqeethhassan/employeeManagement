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
    console.log(this.editEmployeeFormData.id,'id of person logged')
        this.editEmployeeForm.patchValue(
          {
            username: this.editEmployeeFormData.username,
            name: this.editEmployeeFormData.name,
            age: this.editEmployeeFormData.age,
            gender: this.editEmployeeFormData.gender,
            phonenumber: this.editEmployeeFormData.phonenumber,
            role: this.editEmployeeFormData.role
          })
   
    this.FormArr = this.editEmployeeForm.get('role') as FormArray;
  }
  createForm() {
    this.editEmployeeForm = this.formbuilder.group({
      username: ['', [Validators.pattern(/^[0-9a-zA-Z]+$/)]],
      password: [''],
      phonenumber: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern("[0-9]*")]],
      name: ['', [Validators.required, Validators.pattern(/^[a-zA ]*$/)]],
      gender: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.maxLength(2), Validators.minLength(1), Validators.pattern("[0-9]*")]],
      role: ['',[Validators.required]]
    })
  }

  async onSubmit() {
    const updatedFormData = { ...this.editEmployeeForm.value }
    this.apicallservice.putEmployeeFormData(updatedFormData, this.editEmployeeFormData._id).subscribe(
      (data:any) => {
        console.log(data)
        // let newArr=this.dashboardcomponent.rows.filter(x=>x._id!=this.editEmployeeFormData._id)
        // this.dashboardcomponent.rows.length=0
        // newArr.push(data.data)
        // this.dashboardcomponent.rows=newArr
        Swal.fire(data.message)
        this.dashboardcomponent.loadData()
        this.dashboardcomponent.showEditEmployeeModal = false
      },
      error => {
        Swal.fire(error.message)
        this.dashboardcomponent.showEditEmployeeModal = false
      }
    );
    
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
