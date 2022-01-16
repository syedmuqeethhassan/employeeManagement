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
  editEmployeeForm: FormGroup;

  constructor(public formbuilder: FormBuilder, private router: Router, public http: HttpClient, public apicallservice: ApiCallsService, public dashboardcomponent: DashboardComponent) {
    this.createForm()
  }

  ngOnInit(): void {
    this.FormArr = this.editEmployeeForm.get('role') as FormArray;
    console.log(this.FormArr)

    this.editEmployeeForm.patchValue(
      {
        username: this.editEmployeeFormData.username,
        id: this.editEmployeeFormData.id,
        name: this.editEmployeeFormData.name,
        age: this.editEmployeeFormData.age,
        gender: this.editEmployeeFormData.gender,
        phonenumber: this.editEmployeeFormData.phonenumber,
        role: this.editEmployeeFormData.role
      })
    console.log('Form value after patch', this.editEmployeeForm.value)
    console.log(this.editEmployeeFormData.password)
    console.log(this.editEmployeeFormData.username)
    console.log(this.editEmployeeFormData.role?.includes('Developer'))
  }
  createForm() {
    this.editEmployeeForm = this.formbuilder.group({
      username: ['', [Validators.required, Validators.pattern(/^[0-9a-zA-Z]+$/)]],
      password: ['', [Validators.required]],
      phonenumber: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern("[0-9]*")]],
      name: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      gender: ['', [Validators.required]],
      id: ['', [Validators.required, Validators.maxLength(2), Validators.minLength(1), Validators.pattern("[0-9]*")]],
      age: ['', [Validators.required, Validators.maxLength(2), Validators.minLength(1), Validators.pattern("[0-9]*")]],
      role: [[], Validators.required]
    })
  }

  async onSubmit() {

    console.log("Edit EMPLOYEE WORKING")
    const updatedFormData = { ...this.editEmployeeForm.value }
    console.log(updatedFormData)
    await (this.apicallservice.putEmployeeFormData(updatedFormData, updatedFormData.id).subscribe(
      data => {
        console.log('POST Request is successful ', data);
        Swal.fire('successful')
        this.dashboardcomponent.loadData
      },
      error => {
        console.log('Error', error);
        Swal.fire('unsuccessful')
      }
    ));
    this.dashboardcomponent.loadData()
    this.dashboardcomponent.showEditEmployeeModal = false
    Swal.fire('Employee Edited')
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
